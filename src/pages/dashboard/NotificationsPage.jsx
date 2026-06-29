import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, CheckCheck, Calendar, MessageSquare, CreditCard, Star, AlertCircle } from 'lucide-react'
import { Card, Badge, Button } from '../../components/ui'

const mockNotifications = [
  {
    id: '1',
    type: 'booking_confirmed',
    title: 'Booking Confirmed',
    message: 'Your booking with Jasmine Williams has been confirmed for Feb 15.',
    data: { booking_id: '1' },
    is_read: false,
    created_at: '2024-02-12T14:30:00',
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Jasmine Williams sent you a message.',
    data: { conversation_id: '1' },
    is_read: false,
    created_at: '2024-02-12T14:35:00',
  },
  {
    id: '3',
    type: 'review_reminder',
    title: 'Leave a Review',
    message: 'How was your appointment with Marcus Johnson? Leave a review!',
    data: { booking_id: '2' },
    is_read: true,
    created_at: '2024-02-11T10:00:00',
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment Successful',
    message: 'Your payment of $155 has been processed successfully.',
    data: { payment_id: '1' },
    is_read: true,
    created_at: '2024-02-10T15:30:00',
  },
]

const iconMap = {
  booking_confirmed: Calendar,
  message: MessageSquare,
  payment: CreditCard,
  review_reminder: Star,
  default: Bell,
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setNotifications(mockNotifications)
  }, [])

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, is_read: true })))
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
            Notifications
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Stay updated on your bookings, messages, and more.
          </p>
        </div>
        <Button variant="ghost" onClick={markAllAsRead}>
          <CheckCheck className="w-4 h-4 mr-2" />
          Mark all as read
        </Button>
      </motion.div>

      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const Icon = iconMap[notification.type] || iconMap.default
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-4 ${
                !notification.is_read ? 'border-l-4 border-l-primary-500 bg-primary-50/50 dark:bg-primary-900/10' : ''
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    !notification.is_read
                      ? 'bg-primary-100 dark:bg-primary-900/30'
                      : 'bg-secondary-100 dark:bg-secondary-800'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      !notification.is_read ? 'text-primary-600' : 'text-secondary-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`font-medium ${
                          !notification.is_read ? 'text-secondary-900 dark:text-white' : 'text-secondary-700 dark:text-secondary-300'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-secondary-600 dark:text-secondary-400">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <Badge variant="primary" className="flex-shrink-0">New</Badge>
                      )}
                    </div>
                    <p className="text-xs text-secondary-500 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
