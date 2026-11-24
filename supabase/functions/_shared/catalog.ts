// Server-side price catalogue (Naira). Mirrors src/constants/pricing.js.
// The browser only sends a service id; the amount charged is ALWAYS computed here.
export const PLATFORM_FEE = 1500

export const SERVICES: Record<number, { name: string; price: number; duration_minutes: number }> = {
  1: { name: 'Box Braids', price: 45000, duration_minutes: 240 },
  2: { name: 'Knotless Braids', price: 54000, duration_minutes: 270 },
  3: { name: 'Cornrows', price: 25500, duration_minutes: 120 },
}

export const TIME_SLOTS = new Set([
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
])
