/*
  # Paystack payments

  Extends the existing `payments` table so each Paystack transaction is
  recorded server-side. Rows are created and updated ONLY by the Edge
  Functions (service role). Customers can still read their own payments
  through the existing `read_own_payments` policy; there is intentionally
  no INSERT/UPDATE policy for authenticated users.
*/

ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS reference       text,
  ADD COLUMN IF NOT EXISTS currency        text NOT NULL DEFAULT 'NGN',
  ADD COLUMN IF NOT EXISTS gateway         text NOT NULL DEFAULT 'paystack',
  ADD COLUMN IF NOT EXISTS gateway_channel text,
  ADD COLUMN IF NOT EXISTS metadata        jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS paid_at         timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at      timestamptz NOT NULL DEFAULT now();

-- One row per Paystack reference (makes webhook + verify idempotent)
CREATE UNIQUE INDEX IF NOT EXISTS payments_reference_key
  ON payments (reference) WHERE reference IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_payments_user_created
  ON payments (user_id, created_at DESC);

-- Paystack channels beyond card / bank transfer
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_payment_method_check;
ALTER TABLE payments ADD CONSTRAINT payments_payment_method_check
  CHECK (payment_method IN ('card', 'bank_transfer', 'ussd', 'mobile_money', 'wallet', 'cash'));
