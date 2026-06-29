import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, MapPin, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, Button, Badge } from '../../components/ui'
import { formatCurrency, formatDate } from '../../utils/helpers'

export default function BookingDetailPage() {
  const { id } = useParams()

  const booking = {
    id,
    stylist: {
      name: 'Jasmine Williams',
      avatar_url: null,
      phone: '+1 (555) 123-4567',
    },
    service: { name: 'Box Braids', duration_minutes: 240 },
    booking_date: '2024-02-15',
    booking_time: '10:00',
    amount: 150,
    platform_fee: 5,
    total: 155,
    status: 'confirmed',
    service_type: 'salon',
    service_address: '123 Beauty Lane, Suite 4B, New York, NY 10001',
    notes: 'Looking forward to box braids. Previous session was great!',
  }

  return (
    <div className="space-y-6">
      <Link to="/bookings" className="flex items-center gap-1 text-primary-600 hover:text-primary-700">
        <ChevronLeft className="w-4 h-4" />
        Back to bookings
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
                  {booking.service.name}
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400">
                  by {booking.stylist.name}
                </p>
              </div>
              <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 py-4 border-y border-secondary-200 dark:border-secondary-700">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-secondary-400" />
                <div>
                  <p className="text-sm text-secondary-500">Date</p>
                  <p className="font-medium text-secondary-900 dark:text-white">
                    {formatDate(booking.booking_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary-400" />
                <div>
                  <p className="text-sm text-secondary-500">Time</p>
                  <p className="font-medium text-secondary-900 dark:text-white">{booking.booking_time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-secondary-400" />
                <div>
                  <p className="text-sm text-secondary-500">Location</p>
                  <p className="font-medium text-secondary-900 dark:text-white">
                    {booking.service_type === 'home' ? 'Your Location' : 'Salon'}
                  </p>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div className="mt-6">
                <p className="text-sm text-secondary-500 mb-2">Notes</p>
                <p className="text-secondary-700 dark:text-secondary-300 bg-secondary-50 dark:bg-secondary-800 p-3 rounded-lg">
                  {booking.notes}
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline">Contact Stylist</Button>
              <Button variant="ghost" className="text-error-500">Cancel Booking</Button>
            </div>
          </Card>

          {/* Status Timeline */}
          <Card className="p-6">
            <h2 className="font-semibold text-secondary-900 dark:text-white mb-4">Timeline</h2>
            <div className="space-y-4">
              {[
                { datetime: '2024-02-10 15:30', title: 'Booking Confirmed', icon: CheckCircle, status: 'success' },
                { datetime: '2024-02-10 15:28', title: 'Payment Received', icon: CheckCircle, status: 'success' },
                { datetime: '2024-02-10 15:25', title: 'Booking Created', icon: CheckCircle, status: 'success' },
              ].map((event, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`p-1 rounded-full ${
                    event.status === 'success' ? 'bg-success-100 dark:bg-success-900/30 text-success-600' : 'bg-secondary-100 text-secondary-500'
                  }`}>
                    <event.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">{event.title}</p>
                    <p className="text-sm text-secondary-500">{event.datetime}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-semibold text-secondary-900 dark:text-white mb-4">Payment Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Service</span>
                <span className="text-secondary-900 dark:text-white">{formatCurrency(booking.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600 dark:text-secondary-400">Platform fee</span>
                <span className="text-secondary-900 dark:text-white">{formatCurrency(booking.platform_fee)}</span>
              </div>
              <div className="border-t border-secondary-200 dark:border-secondary-700 pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span className="text-secondary-900 dark:text-white">Total</span>
                  <span className="text-primary-600">{formatCurrency(booking.total)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
