import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Scissors, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Badge, Button, Avatar } from './Modal'
import { formatDate, formatTime, formatCurrency } from '../../utils/helpers'

const statusColors = {
  pending: 'warning',
  confirmed: 'success',
  in_progress: 'primary',
  completed: 'secondary',
  cancelled: 'error',
  refunded: 'error',
}

export function BookingCard({ booking, index = 0, showActions = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar
                src={booking.stylist?.avatar_url || booking.customer?.avatar_url}
                alt={booking.stylist?.name || booking.customer?.full_name}
                size="md"
              />
              <div>
                <h3 className="font-medium text-secondary-900 dark:text-white">
                  {booking.stylist?.name || booking.customer?.full_name}
                </h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  {booking.service?.name}
                </p>
              </div>
            </div>
            <Badge variant={statusColors[booking.status]}>
              {booking.status.replace('_', ' ').charAt(0).toUpperCase() + booking.status.replace('_', ' ').slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-y border-secondary-200 dark:border-secondary-700">
            <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(booking.booking_date)}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{booking.booking_time}</span>
            </div>
            {booking.service_address && (
              <div className="col-span-2 flex items-center gap-2 text-secondary-600 dark:text-secondary-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm truncate">{booking.service_address}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-secondary-400" />
              <span className="text-sm text-secondary-500">
                {booking.service_type === 'home' ? 'Home Service' : 'Salon Visit'}
              </span>
            </div>
            <p className="text-lg font-semibold text-secondary-900 dark:text-white">
              {formatCurrency(booking.amount)}
            </p>
          </div>
        </div>

        {showActions && (
          <div className="px-4 py-3 bg-secondary-50 dark:bg-secondary-800/50 flex items-center justify-between">
            <Link
              to={`/bookings/${booking.id}`}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            >
              View details
              <ChevronRight className="w-4 h-4" />
            </Link>
            {booking.status === 'pending' && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button variant="primary" size="sm">
                  Confirm
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  )
}
