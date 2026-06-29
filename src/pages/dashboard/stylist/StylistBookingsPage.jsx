import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookingCard, Card } from '../../../components/ui'

const mockBookings = [
  {
    id: '1',
    customer: { full_name: 'Aisha M.', avatar_url: null },
    service: { name: 'Box Braids' },
    booking_date: '2024-02-15',
    booking_time: '10:00',
    duration_minutes: 240,
    amount: 150,
    status: 'confirmed',
    service_type: 'salon',
  },
  {
    id: '2',
    customer: { full_name: 'Patricia L.', avatar_url: null },
    service: { name: 'Cornrows' },
    booking_date: '2024-02-15',
    booking_time: '14:30',
    duration_minutes: 120,
    amount: 85,
    status: 'pending',
    service_type: 'salon',
  },
  {
    id: '3',
    customer: { full_name: 'Tanya W.', avatar_url: null },
    service: { name: 'Knotless Braids' },
    booking_date: '2024-02-16',
    booking_time: '11:00',
    duration_minutes: 270,
    amount: 180,
    status: 'completed',
    service_type: 'home',
  },
]

export default function StylistBookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [bookings] = useState(mockBookings)

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'upcoming') return ['pending', 'confirmed'].includes(b.status)
    if (activeTab === 'completed') return b.status === 'completed'
    if (activeTab === 'cancelled') return ['cancelled', 'refunded'].includes(b.status)
    return true
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Bookings
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Manage your appointments and booking requests.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        {['upcoming', 'completed', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-1 mr-8 capitalize font-medium transition-colors ${
              activeTab === tab
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-secondary-600 dark:text-secondary-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings */}
      <div className="space-y-4">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <BookingCard booking={booking} />
          </motion.div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-secondary-600 dark:text-secondary-400">
            No bookings in this category.
          </p>
        </Card>
      )}
    </div>
  )
}
