// POST /functions/v1/paystack-init
// Creates a pending payment row and a Paystack transaction, returns the checkout URL.
// The amount is computed HERE from the server-side catalogue, never taken from the browser.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { allowedOrigins, corsHeaders, json } from '../_shared/cors.ts'
import { PLATFORM_FEE, SERVICES, TIME_SLOTS } from '../_shared/catalog.ts'
import { paystackRequest } from '../_shared/paystack.ts'

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(req) })
  if (req.method !== 'POST') return json(req, { error: 'Method not allowed' }, 405)

  const secret = Deno.env.get('PAYSTACK_SECRET_KEY')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!secret || !supabaseUrl || !anonKey || !serviceKey) {
    console.error('paystack-init: missing environment configuration')
    return json(req, { error: 'Payments are not configured yet.' }, 500)
  }

  // 1. Who is paying? (verifies the caller's Supabase session)
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
  })
  const { data: userData } = await userClient.auth.getUser()
  const user = userData?.user
  if (!user || !user.email) return json(req, { error: 'Please sign in to pay.' }, 401)

  // 2. Validate input
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json(req, { error: 'Invalid request.' }, 400)
  }
  const service = SERVICES[Number(body.serviceId)]
  const serviceType = body.serviceType
  const date = String(body.date ?? '')
  const time = String(body.time ?? '')
  const address = String(body.address ?? '').trim().slice(0, 300)
  const notes = String(body.notes ?? '').trim().slice(0, 500)
  const stylistId = String(body.stylistId ?? '').slice(0, 64)

  if (!service) return json(req, { error: 'Unknown service.' }, 400)
  if (serviceType !== 'salon' && serviceType !== 'home') return json(req, { error: 'Invalid service type.' }, 400)
  if (!DATE_RE.test(date) || Number.isNaN(Date.parse(date))) return json(req, { error: 'Invalid date.' }, 400)
  if (date < new Date(Date.now() - 24 * 3600 * 1000).toISOString().slice(0, 10)) {
    return json(req, { error: 'Please choose a date in the future.' }, 400)
  }
  if (!TIME_SLOTS.has(time)) return json(req, { error: 'Invalid time slot.' }, 400)
  if (serviceType === 'home' && !address) return json(req, { error: 'Please add your address for a home service.' }, 400)
  if (!stylistId) return json(req, { error: 'Missing stylist.' }, 400)

  // 3. Amount is decided by the server
  const subtotal = service.price
  const total = subtotal + PLATFORM_FEE
  const amountKobo = total * 100
  const reference = `GB-${crypto.randomUUID().replace(/-/g, '').slice(0, 20).toUpperCase()}`

  // Where Paystack sends the customer back to (must be an allowed origin)
  const origins = allowedOrigins()
  const reqOrigin = (req.headers.get('origin') ?? '').replace(/\/$/, '')
  const base = origins.includes(reqOrigin) ? reqOrigin : origins[0]
  if (!base) {
    console.error('paystack-init: ALLOWED_ORIGINS is not set')
    return json(req, { error: 'Payments are not configured yet.' }, 500)
  }

  const admin = createClient(supabaseUrl, serviceKey)
  const booking = {
    stylist_id: stylistId,
    service_id: Number(body.serviceId),
    service_name: service.name,
    service_type: serviceType,
    date,
    time,
    duration_minutes: service.duration_minutes,
    address: address || null,
    notes: notes || null,
    subtotal,
    platform_fee: PLATFORM_FEE,
  }

  // 4. Record the pending payment first, then call Paystack
  const { error: insertError } = await admin.from('payments').insert({
    user_id: user.id,
    amount: total,
    currency: 'NGN',
    type: 'booking_payment',
    status: 'pending',
    gateway: 'paystack',
    reference,
    metadata: { booking },
  })
  if (insertError) {
    console.error('paystack-init: insert failed', insertError.message)
    return json(req, { error: 'Could not start the payment. Please try again.' }, 500)
  }

  const init = await paystackRequest('/transaction/initialize', secret, {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      amount: amountKobo,
      currency: 'NGN',
      reference,
      callback_url: `${base}/payment/callback`,
      channels: ['card', 'bank', 'ussd', 'bank_transfer'],
      metadata: {
        user_id: user.id,
        service: service.name,
        booking_date: date,
        booking_time: time,
        custom_fields: [
          { display_name: 'Service', variable_name: 'service', value: service.name },
          { display_name: 'Appointment', variable_name: 'appointment', value: `${date} ${time}` },
        ],
      },
    }),
  })

  if (!init.ok || !init.body?.status || !init.body?.data?.authorization_url) {
    console.error('paystack-init: initialize failed', init.status, init.body?.message)
    await admin.from('payments').update({ status: 'failed', updated_at: new Date().toISOString() }).eq('reference', reference)
    return json(req, { error: 'The payment provider could not start the payment. Please try again.' }, 502)
  }

  return json(req, {
    reference,
    authorization_url: init.body.data.authorization_url,
    access_code: init.body.data.access_code,
    amount: total,
    currency: 'NGN',
  })
})
