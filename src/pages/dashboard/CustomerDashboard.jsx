import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Heart, MessageSquare, Clock, TrendingUp, Users, DollarSign, Eye } from 'lucide-react'
import { StatsCard, Card, BookingCard } from '../../components/ui'

const upcomingBookings = [
  {
    id: '1',
    stylist: { name: 'Jasmine Williams', avatar_url: null },
    service: { name: 'Box Braids' },
    booking_date: '2024-02-15',
    booking_time: '10:00',
    amount: 155,
    status: 'confirmed',
    service_type: 'salon',
  },
  {
    id: '2',
    stylist: { name: 'Marcus Johnson', avatar_url: null },
    service: { name: 'Fade Haircut' },
    booking_date: '2024-02-18',
    booking_time: '14:30',
    amount: 50,
    status: 'pending',
    service_type: 'salon',
  },
]

export default function CustomerDashboard() {
  const stats = [
    { title: 'Bookings', value: '5', change: '+2', icon: Calendar },
    { title: 'Reviews', value: '3', change: '0', icon: TrendingUp },
    { title: 'Favorites', value: '12', change: '+3', icon: Heart },
    { title: 'Conversations', value: '8', change: '+1', icon: MessageSquare },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Welcome back!
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Here's an overview of your recent activity.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-800 flex items-center justify-between">
              <h2 className="font-semibold text-secondary-900 dark:text-white">Upcoming Bookings</h2>
              <Link to="/bookings" className="text-sm text-primary-600 hover:underline">View all</Link>
            </div>
            <div className="p-4 space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} showActions={false} />
              ))}
              {upcomingBookings.length === 0 && (
                <div className="py-8 text-center text-secondary-500">
                  No upcoming bookings.{' '}
                  <Link to="/stylists" className="text-primary-600 hover:underline">Find a stylist</Link>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="font-medium text-secondary-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/stylists" className="flex items-center gap-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 hover:bg-primary-100/50">
                <Calendar className="w-5 h-5" />
                Book an Appointment
              </Link>
              <Link to="/favorites" className="flex items-center gap-3 p-3 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700">
                <Heart className="w-5 h-5" />
                View Favorites
              </Link>
              <Link to="/messages" className="flex items-center gap-3 p-3 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700">
                <MessageSquare className="w-5 h-5" />
                Messages
              </Link>
            </div>
          </Card>

          {/* Recent Reviews */}
          <Card className="p-4">
            <h3 className="font-medium text-secondary-900 dark:text-white mb-4">Recent Reviews Left</h3>
            <div className="text-center py-8 text-secondary-500">
              No reviews yet. After your appointments, you can leave reviews for stylists.
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
