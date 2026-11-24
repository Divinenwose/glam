/**
 * Bookable services and the platform fee, in Naira (NGN).
 *
 * IMPORTANT: the server never trusts a price sent from the browser. The
 * Edge Function `paystack-init` keeps its own copy of this catalogue in
 * supabase/functions/_shared/catalog.ts. Keep the two in sync, or (better)
 * move services into the `services` table and have the function read them
 * from there.
 */
export const PLATFORM_FEE = 1500

export const BOOKABLE_SERVICES = [
  { id: 1, name: 'Box Braids', price: 45000, duration_minutes: 240 },
  { id: 2, name: 'Knotless Braids', price: 54000, duration_minutes: 270 },
  { id: 3, name: 'Cornrows', price: 25500, duration_minutes: 120 },
]

export const BOOKING_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]
