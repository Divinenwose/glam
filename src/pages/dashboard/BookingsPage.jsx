import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookingCard, Card } from '../../components/ui'

const mockBookings = [
  {
    id: '1',
    stylist: { name: 'Jasmine Williams', avatar_url: null },
    service: { name: 'Box Braids' },
    booking_date: '2024-02-15',
    booking_time: '10:00',
    amount: 155,
    status: 'confirmed',
    service_type: 'salon',
    service_address: '123 Beauty Lane, New York, NY',
  },
  {
    id: '2',
    stylist: { name: 'Marcus Johnson', avatar_url: null },
    service: { name: 'Fade Haircut' },
    booking_date: '2024-02-10',
    booking_time: '14:30',
    amount: 50,
    status: 'completed',
    service_type: 'salon',
  },
  {
    id: '3',
    stylist: { name: 'Amara Chen', avatar_url: null },
    service: { name: 'Hair Coloring' },
    booking_date: '2024-02-05',
    booking_time: '11:00',
    amount: 200,
    status: 'completed',
    service_type: 'home',
  },
  {
    id: '4',
    stylist: { name: 'Taylor Smith', avatar_url: null },
    service: { name: 'Bridal Hairstyling' },
    booking_date: '2024-01-20',
    booking_time: '09:00',
    amount: 300,
    status: 'cancelled',
    service_type: 'salon',
  },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [bookings, setBookings] = useState([])

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'upcoming') return ['confirmed', 'pending'].includes(booking.status)
    if (activeTab === 'completed') return booking.status === 'completed'
    if (activeTab === 'cancelled') return ['cancelled', 'refunded'].includes(booking.status)
    return true
  })

  useEffect(() => {
    setBookings(mockBookings)
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          My Bookings
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          View and manage all your appointments.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="border-b border-secondary-200 dark:border-secondary-700">
        <div className="flex gap-8">
          {[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-secondary-600 dark:text-secondary-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid md:grid-cols-2 gap-4">
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
