import { supabase } from './supabase'

/** Turn a Supabase Functions error into a friendly message. */
async function friendlyError(error, fallback) {
  try {
    const body = await error?.context?.json?.()
    if (body?.error) return body.error
  } catch { /* ignore */ }
  if (error?.name === 'FunctionsFetchError') {
    return 'Could not reach the payment service. Check your connection and try again.'
  }
  return fallback
}

/**
 * Ask the server to create a Paystack transaction for a booking.
 * The browser sends only the booking choices; the server decides the price.
 * Returns { authorization_url, reference, amount }.
 */
export async function createPayment(details) {
  const { data, error } = await supabase.functions.invoke('paystack-init', { body: details })
  if (error) throw new Error(await friendlyError(error, 'Could not start the payment. Please try again.'))
  if (!data?.authorization_url) throw new Error('Could not start the payment. Please try again.')
  return data
}

/** Ask the server to confirm a payment with Paystack. Returns { state, amount, booking, ... }. */
export async function verifyPayment(reference) {
  const { data, error } = await supabase.functions.invoke('paystack-verify', { body: { reference } })
  if (error) throw new Error(await friendlyError(error, 'Could not confirm the payment right now.'))
  return data
}

/** Local calendar date as YYYY-MM-DD (avoids the UTC shift of toISOString). */
export function toLocalISODate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
