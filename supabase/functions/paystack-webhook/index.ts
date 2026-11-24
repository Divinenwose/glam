// POST /functions/v1/paystack-webhook   (deploy with --no-verify-jwt)
// Paystack calls this when a payment succeeds, even if the customer closed the
// browser before returning to the site. The request is authenticated by the
// x-paystack-signature header (HMAC-SHA512 of the raw body with the secret key).
import { createClient } from 'npm:@supabase/supabase-js@2'
import { finalizeTransaction, isValidWebhookSignature } from '../_shared/paystack.ts'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const secret = Deno.env.get('PAYSTACK_SECRET_KEY')
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!secret || !supabaseUrl || !serviceKey) return new Response('Not configured', { status: 500 })

  const raw = await req.text()
  const valid = await isValidWebhookSignature(secret, raw, req.headers.get('x-paystack-signature'))
  if (!valid) return new Response('Invalid signature', { status: 401 })

  let event: { event?: string; data?: { reference?: string } }
  try {
    event = JSON.parse(raw)
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  // We only act on successful charges, and we re-verify with Paystack instead of
  // trusting the payload.
  if (event.event === 'charge.success' && event.data?.reference) {
    const admin = createClient(supabaseUrl, serviceKey)
    const result = await finalizeTransaction(admin, event.data.reference, secret)
    if (result.state === 'error') {
      console.error('paystack-webhook:', result.message)
      return new Response('Temporary error', { status: 500 }) // Paystack will retry
    }
  }

  return new Response('ok', { status: 200 })
})
