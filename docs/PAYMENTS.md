# Paystack payments (Naira)

Customers pay the **full amount up front** at the last step of booking. They are sent to
Paystack's secure checkout (card, bank transfer, USSD) and returned to `/payment/callback`.

## How it works

```
Browser                    Supabase Edge Functions                 Paystack
  | choices (no price)  ->  paystack-init   -- price from server -> initialize
  |                          records pending row in `payments`
  | <- checkout URL
  | -------------------- customer pays on Paystack ------------------>
  | /payment/callback   ->  paystack-verify -- re-checks ----------> verify
  |                          marks payment completed (amount+currency must match)
  |                         paystack-webhook <- charge.success ------ (backup if the
  |                          signature checked, re-verifies            browser is closed)
```

Security rules built in:
- The **secret key lives only in Supabase secrets**, never in the website code or repo.
- The browser sends only the service id/date/time; **the server decides the price**.
- A payment is "completed" only if Paystack confirms success **and** amount + currency match.
- The webhook requires a valid HMAC-SHA512 signature and still re-verifies with Paystack.
- Confirming twice (callback + webhook) is safe: it is idempotent.
- Customers can only read their own rows in `payments` (existing RLS); only the server writes.

## One-time setup (needs your Supabase + Paystack accounts)

Install the [Supabase CLI](https://supabase.com/docs/guides/cli), then from the repo root:

```bash
supabase login
supabase link --project-ref <your-project-ref>

# 1. Database: adds reference/currency/metadata columns to `payments`
supabase db push        # or paste supabase/migrations/20261124090000_002_paystack_payments.sql
                        # into the Supabase SQL editor and run it

# 2. Secrets (use YOUR Paystack secret key; never commit it)
supabase secrets set PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
supabase secrets set ALLOWED_ORIGINS=https://glam-nu.vercel.app,http://localhost:5173

# 3. Deploy the three functions
supabase functions deploy paystack-init
supabase functions deploy paystack-verify
supabase functions deploy paystack-webhook --no-verify-jwt
```

`ALLOWED_ORIGINS` is the list of site addresses allowed to start a payment (also where
Paystack sends customers back to). Add your custom domain when you have one.

Then in the **Paystack dashboard → Settings → API Keys & Webhooks**, set the **Test Webhook URL** to:

```
https://<your-project-ref>.supabase.co/functions/v1/paystack-webhook
```

The website itself needs **no new environment variables**.

## Testing (test mode)

Paystack's documented test card: `4084 0840 8408 4081`, any future expiry, CVV `408`;
if asked for a PIN use `0000` and OTP `123456`. Check the result in Supabase → Table editor → `payments`
(`status` = `completed`, `reference` starts with `GB-`).

Server tests (no network needed): `deno test supabase/functions/_tests/paystack_test.ts`

## Going live

1. Complete Paystack business verification and switch to your **live** keys.
2. `supabase secrets set PAYSTACK_SECRET_KEY=sk_live_...` and set the **Live Webhook URL** (same address as above).
3. **Rotate any test key that was ever pasted into a chat or ticket** (Paystack → Settings → API Keys).

## Good to know / next steps

- Prices live in two mirrored places: `src/constants/pricing.js` and
  `supabase/functions/_shared/catalog.ts`. Keep them in sync, or move services into the
  `services` table and read them from there in `paystack-init`.
- The stylist, bookings, wallet and admin pages still show **demo data**. Payments are saved
  in the `payments` table (booking details are in its `metadata.booking`), ready to be turned
  into real `bookings` rows once stylists/services are read from the database.
- Not included yet: refunds, stylist payouts/withdrawals, payment receipts by email.
