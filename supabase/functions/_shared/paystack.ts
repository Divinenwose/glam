// Shared Paystack helpers. The secret key is read from the environment
// (Supabase secret PAYSTACK_SECRET_KEY) and is never sent to the browser.

const PAYSTACK_API = 'https://api.paystack.co'

export type FetchLike = typeof fetch

// deno-lint-ignore no-explicit-any
export type AdminClient = any // supabase-js client created with the service role key

export async function paystackRequest(
  path: string,
  secret: string,
  init: RequestInit = {},
  fetchImpl: FetchLike = fetch,
) {
  const res = await fetchImpl(`${PAYSTACK_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  })
  const body = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, body }
}

/** Paystack signs the raw webhook body with HMAC-SHA512 using the secret key. */
export async function hmacSha512Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function isValidWebhookSignature(
  secret: string,
  rawBody: string,
  signature: string | null,
): Promise<boolean> {
  if (!signature) return false
  const expected = await hmacSha512Hex(secret, rawBody)
  return timingSafeEqual(expected, signature.toLowerCase())
}

export function mapChannel(channel: string | null | undefined): string {
  switch (channel) {
    case 'card':
      return 'card'
    case 'ussd':
      return 'ussd'
    case 'mobile_money':
      return 'mobile_money'
    default:
      return 'bank_transfer' // bank, bank_transfer, qr, eft ...
  }
}

export type FinalizeResult =
  | { state: 'not_found' }
  | { state: 'completed'; payment: Record<string, unknown>; alreadyCompleted: boolean }
  | { state: 'failed'; payment: Record<string, unknown>; reason: string }
  | { state: 'pending'; payment: Record<string, unknown>; gatewayStatus: string }
  | { state: 'error'; message: string }

/**
 * Confirms a transaction with Paystack and updates our `payments` row.
 *
 * - Never trusts the browser or the webhook payload: it always re-queries
 *   Paystack's verify endpoint.
 * - Only marks a payment completed if Paystack says "success" AND the amount
 *   and currency match what we stored when the payment was created.
 * - Idempotent: calling it again for a completed payment changes nothing.
 */
export async function finalizeTransaction(
  admin: AdminClient,
  reference: string,
  secret: string,
  fetchImpl: FetchLike = fetch,
): Promise<FinalizeResult> {
  const { data: row, error } = await admin
    .from('payments')
    .select('*')
    .eq('reference', reference)
    .maybeSingle()

  if (error) return { state: 'error', message: error.message }
  if (!row) return { state: 'not_found' }
  if (row.status === 'completed') return { state: 'completed', payment: row, alreadyCompleted: true }

  const verify = await paystackRequest(
    `/transaction/verify/${encodeURIComponent(reference)}`,
    secret,
    { method: 'GET' },
    fetchImpl,
  )
  const tx = verify.body?.data
  if (!verify.ok || !tx) {
    // Paystack doesn't know the reference yet (customer hasn't opened the checkout)
    return { state: 'pending', payment: row, gatewayStatus: 'unknown' }
  }

  if (tx.status === 'success') {
    const expectedKobo = Math.round(Number(row.amount) * 100)
    if (tx.currency !== row.currency || Number(tx.amount) !== expectedKobo) {
      await admin
        .from('payments')
        .update({
          status: 'failed',
          updated_at: new Date().toISOString(),
          metadata: {
            ...(row.metadata ?? {}),
            flagged: 'amount_or_currency_mismatch',
            paystack_amount: tx.amount,
            paystack_currency: tx.currency,
          },
        })
        .eq('reference', reference)
        .neq('status', 'completed')
      return { state: 'failed', payment: row, reason: 'amount_mismatch' }
    }

    const { data: updated, error: updErr } = await admin
      .from('payments')
      .update({
        status: 'completed',
        paid_at: tx.paid_at ?? new Date().toISOString(),
        gateway_channel: tx.channel ?? null,
        payment_method: mapChannel(tx.channel),
        updated_at: new Date().toISOString(),
        metadata: {
          ...(row.metadata ?? {}),
          paystack: {
            id: tx.id,
            channel: tx.channel,
            gateway_response: tx.gateway_response,
            paid_at: tx.paid_at,
          },
        },
      })
      .eq('reference', reference)
      .neq('status', 'completed')
      .select()
      .maybeSingle()
    if (updErr) return { state: 'error', message: updErr.message }
    return { state: 'completed', payment: updated ?? { ...row, status: 'completed' }, alreadyCompleted: false }
  }

  if (tx.status === 'failed' || tx.status === 'reversed') {
    await admin
      .from('payments')
      .update({ status: 'failed', updated_at: new Date().toISOString() })
      .eq('reference', reference)
      .eq('status', 'pending')
    return { state: 'failed', payment: row, reason: String(tx.gateway_response ?? tx.status) }
  }

  // 'abandoned', 'ongoing', 'pending', 'processing', 'queued' -> still waiting
  return { state: 'pending', payment: row, gatewayStatus: String(tx.status) }
}
