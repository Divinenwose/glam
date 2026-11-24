// Run:  deno test supabase/functions/_tests/paystack_test.ts
// Tiny local assert so the tests need no network/JSR access.
function assertEquals(actual: unknown, expected: unknown) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`)
  }
}
import {
  finalizeTransaction,
  hmacSha512Hex,
  isValidWebhookSignature,
  mapChannel,
  timingSafeEqual,
} from '../_shared/paystack.ts'

const SECRET = 'sk_test_fake_secret_for_unit_tests'

// ---- minimal in-memory stand-in for the supabase-js query builder ----
function fakeAdmin(rows: Record<string, any>[]) {
  const updates: Record<string, any>[] = []
  const builder = (table: string) => {
    let filters: [string, string, unknown][] = []
    let patch: Record<string, any> | null = null
    const match = () =>
      rows.filter((r) => filters.every(([op, k, v]) => (op === 'eq' ? r[k] === v : r[k] !== v)))
    const api: any = {
      select: () => api,
      update: (p: Record<string, any>) => { patch = p; return api },
      eq: (k: string, v: unknown) => { filters.push(['eq', k, v]); return api },
      neq: (k: string, v: unknown) => { filters.push(['neq', k, v]); return api },
      maybeSingle: () => {
        const found = match()
        if (patch) {
          found.forEach((r) => Object.assign(r, patch))
          updates.push(patch)
        }
        return Promise.resolve({ data: found[0] ?? null, error: null })
      },
      then: (resolve: (v: unknown) => void) => {
        const found = match()
        if (patch) { found.forEach((r) => Object.assign(r, patch)); updates.push(patch) }
        resolve({ data: found, error: null })
      },
    }
    return table === 'payments' ? api : api
  }
  return { from: builder, updates }
}

const row = (over: Record<string, any> = {}): Record<string, any> => ({
  reference: 'GB-TEST1234567890',
  user_id: 'u1',
  amount: 46500,
  currency: 'NGN',
  status: 'pending',
  metadata: { booking: { service_name: 'Box Braids' } },
  ...over,
})

const paystackReply = (data: Record<string, any>, ok = true): typeof fetch =>
  (() => Promise.resolve(new Response(JSON.stringify({ status: ok, data }), { status: ok ? 200 : 404 }))) as typeof fetch

Deno.test('success with matching amount completes the payment', async () => {
  const r = row()
  const admin = fakeAdmin([r])
  const res = await finalizeTransaction(admin, r.reference, SECRET, paystackReply({
    status: 'success', amount: 4650000, currency: 'NGN', channel: 'card', id: 99, paid_at: '2026-11-24T10:00:00Z',
  }))
  assertEquals(res.state, 'completed')
  assertEquals(r.status, 'completed')
  assertEquals(r.payment_method, 'card')
  assertEquals((r.metadata as any).paystack.id, 99)
})

Deno.test('underpayment (amount mismatch) is NOT completed and is flagged', async () => {
  const r = row()
  const res = await finalizeTransaction(fakeAdmin([r]), r.reference, SECRET, paystackReply({
    status: 'success', amount: 100, currency: 'NGN', channel: 'card',
  }))
  assertEquals(res.state, 'failed')
  assertEquals(r.status, 'failed')
  assertEquals((r.metadata as any).flagged, 'amount_or_currency_mismatch')
})

Deno.test('wrong currency is NOT completed', async () => {
  const r = row()
  const res = await finalizeTransaction(fakeAdmin([r]), r.reference, SECRET, paystackReply({
    status: 'success', amount: 4650000, currency: 'USD', channel: 'card',
  }))
  assertEquals(res.state, 'failed')
  assertEquals(r.status, 'failed')
})

Deno.test('already completed payment is returned without calling Paystack', async () => {
  const r = row({ status: 'completed' })
  let called = false
  const res = await finalizeTransaction(fakeAdmin([r]), r.reference, SECRET, (() => { called = true; return Promise.resolve(new Response('{}')) }) as typeof fetch)
  assertEquals(res.state, 'completed')
  assertEquals(called, false)
})

Deno.test('abandoned checkout stays pending (customer can retry)', async () => {
  const r = row()
  const res = await finalizeTransaction(fakeAdmin([r]), r.reference, SECRET, paystackReply({ status: 'abandoned', amount: 4650000, currency: 'NGN' }))
  assertEquals(res.state, 'pending')
  assertEquals(r.status, 'pending')
})

Deno.test('failed charge marks the payment failed', async () => {
  const r = row()
  const res = await finalizeTransaction(fakeAdmin([r]), r.reference, SECRET, paystackReply({ status: 'failed', gateway_response: 'Declined' }))
  assertEquals(res.state, 'failed')
  assertEquals(r.status, 'failed')
})

Deno.test('unknown reference -> not_found; Paystack unaware -> pending', async () => {
  assertEquals((await finalizeTransaction(fakeAdmin([]), 'GB-NOPE', SECRET, paystackReply({}))).state, 'not_found')
  const r = row()
  assertEquals((await finalizeTransaction(fakeAdmin([r]), r.reference, SECRET, paystackReply({}, false))).state, 'pending')
})

Deno.test('webhook signature: valid accepted, tampered/missing rejected', async () => {
  const body = JSON.stringify({ event: 'charge.success', data: { reference: 'GB-TEST1234567890' } })
  const sig = await hmacSha512Hex(SECRET, body)
  assertEquals(sig.length, 128)
  assertEquals(await isValidWebhookSignature(SECRET, body, sig), true)
  assertEquals(await isValidWebhookSignature(SECRET, body + ' ', sig), false)
  assertEquals(await isValidWebhookSignature('other_secret', body, sig), false)
  assertEquals(await isValidWebhookSignature(SECRET, body, null), false)
  assertEquals(await isValidWebhookSignature(SECRET, body, 'abc'), false)
})

Deno.test('hmac matches a known SHA-512 HMAC vector (RFC 4231 case 2)', async () => {
  const out = await hmacSha512Hex('Jefe', 'what do ya want for nothing?')
  assertEquals(out.startsWith('164b7a7bfcf819e2e395fbe73b56e0a3'), true)
})

Deno.test('helpers', () => {
  assertEquals(timingSafeEqual('abc', 'abc'), true)
  assertEquals(timingSafeEqual('abc', 'abd'), false)
  assertEquals(mapChannel('ussd'), 'ussd')
  assertEquals(mapChannel('bank'), 'bank_transfer')
  assertEquals(mapChannel(undefined), 'bank_transfer')
})
