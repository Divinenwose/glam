/*
# Initial Schema for Hairstylist Marketplace

1. New Tables
- `profiles` - Extended user data (role, phone, avatar, verification status)
- `stylists` - Hairstylist business profile (business name, experience, specializations, location)
- `services` - Services offered by stylists with pricing and duration
- `bookings` - Customer bookings with status tracking
- `reviews` - Customer reviews for stylists with ratings
- `payments` - Payment transactions and withdrawals
- `messages` - Conversations and messages between users
- `favorites` - Customer favorites
- `conversations` - Message conversation threads
- `notifications` - User notifications

2. Security
- RLS enabled on all tables
- Owner-scoped policies for authenticated users
- Public read for stylist profiles and services (marketplace browsing)

3. Notes
- Uses auth.uid() for ownership checks
- Defaults user_id columns to auth.uid() for automatic ownership
- Service categories reference the predefined constants
*/

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  phone text,
  avatar_url text,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'stylist', 'admin')),
  location text,
  is_verified boolean DEFAULT false,
  government_id_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stylists table (business profile)
CREATE TABLE IF NOT EXISTS stylists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  business_name text NOT NULL,
  bio text,
  experience_years integer DEFAULT 0,
  specializations text[] DEFAULT '{}',
  certifications text[] DEFAULT '{}',
  location_address text,
  location_lat decimal(10, 8),
  location_lng decimal(11, 8),
  city text,
  country text DEFAULT 'United States',
  working_hours jsonb DEFAULT '{"monday": {"start": "09:00", "end": "18:00"}, "tuesday": {"start": "09:00", "end": "18:00"}, "wednesday": {"start": "09:00", "end": "18:00"}, "thursday": {"start": "09:00", "end": "18:00"}, "friday": {"start": "09:00", "end": "18:00"}, "saturday": {"start": "10:00", "end": "16:00"}, "sunday": null}'::jsonb,
  offers_home_service boolean DEFAULT false,
  offers_salon_service boolean DEFAULT true,
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  rating_avg decimal(3, 2) DEFAULT 0,
  rating_count integer DEFAULT 0,
  bank_account jsonb DEFAULT '{}',
  portfolio_images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stylist_id uuid NOT NULL REFERENCES stylists(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL,
  description text,
  price decimal(10, 2) NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  service_type text NOT NULL DEFAULT 'both' CHECK (service_type IN ('home', 'salon', 'both')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stylist_id uuid NOT NULL REFERENCES stylists(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE SET NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  duration_minutes integer NOT NULL,
  service_type text NOT NULL CHECK (service_type IN ('home', 'salon')),
  amount decimal(10, 2) NOT NULL,
  platform_fee decimal(10, 2) NOT NULL DEFAULT 0,
  stylist_earnings decimal(10, 2) NOT NULL DEFAULT 0,
  service_address text,
  service_lat decimal(10, 8),
  service_lng decimal(11, 8),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stylist_id uuid NOT NULL REFERENCES stylists(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  images text[] DEFAULT '{}',
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (booking_id)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount decimal(10, 2) NOT NULL,
  type text NOT NULL CHECK (type IN ('booking_payment', 'withdrawal', 'refund', 'platform_fee')),
  payment_method text CHECK (payment_method IN ('card', 'bank_transfer', 'wallet', 'cash')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_payment_id text,
  created_at timestamptz DEFAULT now()
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant1_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant2_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  last_message_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE (participant1_id, participant2_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stylist_id uuid NOT NULL REFERENCES stylists(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (customer_id, stylist_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb DEFAULT '{}',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

-- Stylists policies (public read for marketplace browsing)
DROP POLICY IF EXISTS "read_published_stylists" ON stylists;
CREATE POLICY "read_published_stylists" ON stylists FOR SELECT
  TO authenticated USING (is_active = true AND is_verified = true OR user_id = auth.uid());

DROP POLICY IF EXISTS "insert_own_stylist" ON stylists;
CREATE POLICY "insert_own_stylist" ON stylists FOR INSERT
  TO authenticated WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "update_own_stylist" ON stylists;
CREATE POLICY "update_own_stylist" ON stylists FOR UPDATE
  TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Services policies (public read for marketplace browsing)
DROP POLICY IF EXISTS "read_active_services" ON services;
CREATE POLICY "read_active_services" ON services FOR SELECT
  TO authenticated;

DROP POLICY IF EXISTS "insert_own_services" ON services;
CREATE POLICY "insert_own_services" ON services FOR INSERT
  TO authenticated WITH CHECK (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "update_own_services" ON services;
CREATE POLICY "update_own_services" ON services FOR UPDATE
  TO authenticated USING (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "delete_own_services" ON services;
CREATE POLICY "delete_own_services" ON services FOR DELETE
  TO authenticated USING (stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

-- Bookings policies
DROP POLICY IF EXISTS "read_own_bookings" ON bookings;
CREATE POLICY "read_own_bookings" ON bookings FOR SELECT
  TO authenticated USING (customer_id = auth.uid() OR stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "create_booking" ON bookings;
CREATE POLICY "create_booking" ON bookings FOR INSERT
  TO authenticated WITH CHECK (customer_id = auth.uid());

DROP POLICY IF EXISTS "update_own_bookings" ON bookings;
CREATE POLICY "update_own_bookings" ON bookings FOR UPDATE
  TO authenticated USING (customer_id = auth.uid() OR stylist_id IN (SELECT id FROM stylists WHERE user_id = auth.uid()));

-- Reviews policies
DROP POLICY IF EXISTS "read_reviews" ON reviews;
CREATE POLICY "read_reviews" ON reviews FOR SELECT
  TO authenticated USING (is_published = true OR customer_id = auth.uid());

DROP POLICY IF EXISTS "create_review" ON reviews;
CREATE POLICY "create_review" ON reviews FOR INSERT
  TO authenticated WITH CHECK (customer_id = auth.uid());

-- Payments policies
DROP POLICY IF EXISTS "read_own_payments" ON payments;
CREATE POLICY "read_own_payments" ON payments FOR SELECT
  TO authenticated USING (user_id = auth.uid());

-- Conversations policies
DROP POLICY IF EXISTS "read_own_conversations" ON conversations;
CREATE POLICY "read_own_conversations" ON conversations FOR SELECT
  TO authenticated USING (participant1_id = auth.uid() OR participant2_id = auth.uid());

DROP POLICY IF EXISTS "create_conversation" ON conversations;
CREATE POLICY "create_conversation" ON conversations FOR INSERT
  TO authenticated WITH CHECK (participant1_id = auth.uid() OR participant2_id = auth.uid());

-- Messages policies
DROP POLICY IF EXISTS "read_conversation_messages" ON messages;
CREATE POLICY "read_conversation_messages" ON messages FOR SELECT
  TO authenticated USING (conversation_id IN (SELECT id FROM conversations WHERE participant1_id = auth.uid() OR participant2_id = auth.uid()));

DROP POLICY IF EXISTS "send_message" ON messages;
CREATE POLICY "send_message" ON messages FOR INSERT
  TO authenticated WITH CHECK (sender_id = auth.uid() AND conversation_id IN (SELECT id FROM conversations WHERE participant1_id = auth.uid() OR participant2_id = auth.uid()));

-- Favorites policies
DROP POLICY IF EXISTS "read_own_favorites" ON favorites;
CREATE POLICY "read_own_favorites" ON favorites FOR SELECT
  TO authenticated USING (customer_id = auth.uid());

DROP POLICY IF EXISTS "insert_favorite" ON favorites;
CREATE POLICY "insert_favorite" ON favorites FOR INSERT
  TO authenticated WITH CHECK (customer_id = auth.uid());

DROP POLICY IF EXISTS "delete_favorite" ON favorites;
CREATE POLICY "delete_favorite" ON favorites FOR DELETE
  TO authenticated USING (customer_id = auth.uid());

-- Notifications policies
DROP POLICY IF EXISTS "read_own_notifications" ON notifications;
CREATE POLICY "read_own_notifications" ON notifications FOR SELECT
  TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "update_own_notifications" ON notifications;
CREATE POLICY "update_own_notifications" ON notifications FOR UPDATE
  TO authenticated USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stylists_user_id ON stylists(user_id);
CREATE INDEX IF NOT EXISTS idx_stylists_city ON stylists(city);
CREATE INDEX IF NOT EXISTS idx_stylists_rating ON stylists(rating_avg DESC);
CREATE INDEX IF NOT EXISTS idx_services_stylist_id ON services(stylist_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_stylist ON bookings(stylist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_reviews_stylist ON reviews(stylist_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stylists_updated_at ON stylists;
CREATE TRIGGER update_stylists_updated_at BEFORE UPDATE ON stylists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
