import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, DollarSign, Users, TrendingUp, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react'
import { StatsCard, Card, BookingCard } from '../../../components/ui'
import { formatCurrency } from '../../../utils/helpers'

const todayBookings = [
  {
    id: '1',
    customer: { full_name: 'Aisha M.', avatar_url: null },
    service: { name: 'Box Braids' },
    booking_date: new Date().toISOString(),
    booking_time: '10:00',
    amount: 150,
    status: 'confirmed',
  },
  {
    id: '2',
    customer: { full_name: 'Patricia L.', avatar_url: null },
    service: { name: 'Cornrows' },
    booking_date: new Date().toISOString(),
    booking_time: '14:30',
    amount: 85,
    status: 'pending',
  },
]

export default function StylistDashboard() {
  const stats = [
    { title: "Today's Bookings", value: '2', change: '+1', changeType: 'positive', icon: Calendar },
    { title: 'This Week Earnings', value: '$850', change: '+12%', changeType: 'positive', icon: DollarSign },
    { title: 'Total Customers', value: '128', change: '+5', changeType: 'positive', icon: Users },
    { title: 'Average Rating', value: '4.9', change: '+0.1', changeType: 'positive', icon: Star },
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
          Here's how your business is performing today.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-800 flex items-center justify-between">
              <h2 className="font-semibold text-secondary-900 dark:text-white">Today's Appointments</h2>
              <Link to="/stylist/bookings" className="text-sm text-primary-600 hover:underline">View all</Link>
            </div>
            <div className="p-4 space-y-4">
              {todayBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary-50 dark:bg-secondary-800">
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900 dark:text-white">{booking.service.name}</p>
                    <p className="text-sm text-secondary-500">{booking.customer.full_name} • {booking.booking_time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-600">{formatCurrency(booking.amount)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                        : 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Booking Requests */}
          <Card className="mt-6">
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-800">
              <h2 className="font-semibold text-secondary-900 dark:text-white">New Booking Requests</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-warning-50 dark:bg-warning-900/10 border border-warning-200 dark:border-warning-800">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-warning-600" />
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">Tanya W.</p>
                    <p className="text-sm text-secondary-500">Box Braids • Feb 20 at 11:00 AM</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn-sm btn-success">Accept</button>
                  <button className="btn-sm btn-outline">Decline</button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-secondary-900 dark:text-white mb-4">Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary-600 dark:text-secondary-400">Booking Rate</span>
                  <span className="font-medium text-secondary-900 dark:text-white">85%</span>
                </div>
                <div className="h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-primary-600 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary-600 dark:text-secondary-400">Response Rate</span>
                  <span className="font-medium text-secondary-900 dark:text-white">92%</span>
                </div>
                <div className="h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-success-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary-600 dark:text-secondary-400">Completion Rate</span>
                  <span className="font-medium text-secondary-900 dark:text-white">100%</span>
                </div>
                <div className="h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-success-500 rounded-full" />
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="font-medium text-secondary-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/stylist/calendar" className="flex items-center gap-3 p-3 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700">
                <Calendar className="w-5 h-5" />
                Update Availability
              </Link>
              <Link to="/stylist/services" className="flex items-center gap-3 p-3 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700">
                <TrendingUp className="w-5 h-5" />
                Add New Service
              </Link>
              <Link to="/stylist/portfolio" className="flex items-center gap-3 p-3 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700">
                <Star className="w-5 h-5" />
                Update Portfolio
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
