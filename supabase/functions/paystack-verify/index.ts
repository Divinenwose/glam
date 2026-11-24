// POST /functions/v1/paystack-verify  { reference }
// Called by the /payment/callback page after Paystack redirects the customer back.
// Re-checks the transaction with Paystack and returns the result.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders, json } from '../_shared/cors.ts'
import { finalizeTransaction } from '../_shared/paystack.ts'

const REF_RE = /^[A-Za-z0-9_-]{6,64}$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(req) })
  if (req.method !== 'POST') return json(req, { error: 'Method not allowed' }, 405)

  const secret = Deno.env.get('PAYSTACK_SECRET_KEY')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!secret || !supabaseUrl || !anonKey || !serviceKey) {
    return json(req, { error: 'Payments are not configured yet.' }, 500)
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } },
  })
  const { data: userData } = await userClient.auth.getUser()
  const user = userData?.user
  if (!user) return json(req, { error: 'Please sign in.' }, 401)

  let reference = ''
  try {
    reference = String((await req.json()).reference ?? '')
  } catch { /* handled below */ }
  if (!REF_RE.test(reference)) return json(req, { error: 'Invalid reference.' }, 400)

  const admin = createClient(supabaseUrl, serviceKey)

  // A customer may only look at their own payment
  const { data: own } = await admin.from('payments').select('user_id').eq('reference', reference).maybeSingle()
  if (!own || own.user_id !== user.id) return json(req, { error: 'Payment not found.' }, 404)

  const result = await finalizeTransaction(admin, reference, secret)
  if (result.state === 'error') {
    console.error('paystack-verify:', result.message)
    return json(req, { error: 'Could not confirm the payment right now.' }, 500)
  }
  if (result.state === 'not_found') return json(req, { error: 'Payment not found.' }, 404)

  const p = result.payment as Record<string, any>
  const booking = p.metadata?.booking ?? {}
  return json(req, {
    state: result.state, // completed | failed | pending
    reference,
    amount: p.amount,
    currency: p.currency,
    paid_at: p.paid_at ?? null,
    channel: p.gateway_channel ?? null,
    booking: {
      service_name: booking.service_name,
      date: booking.date,
      time: booking.time,
      service_type: booking.service_type,
    },
    ...(result.state === 'pending' ? { gateway_status: result.gatewayStatus } : {}),
  })
})
