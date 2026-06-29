import { motion } from 'framer-motion'
import { motion as m } from 'framer-motion'
import { Search, Filter, Eye } from 'lucide-react'
import { Card, Badge, Button } from '../../../components/ui'
import { formatCurrency, formatDate } from '../../../utils/helpers'

const mockBookings = [
  { id: 'B001', customer: 'Aisha M.', stylist: 'Jasmine Williams', service: 'Box Braids', date: '2024-02-15', amount: 155, status: 'confirmed' },
  { id: 'B002', customer: 'Patricia L.', stylist: 'Marcus Johnson', service: 'Fade', date: '2024-02-14', amount: 50, status: 'completed' },
  { id: 'B003', customer: 'Tanya W.', stylist: 'Amara Chen', service: 'Balayage', date: '2024-02-13', amount: 200, status: 'pending' },
]

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Booking Management
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          View and manage all platform bookings.
        </p>
      </m.div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Stylist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 font-mono text-sm text-secondary-900 dark:text-white">{booking.id}</td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{booking.customer}</td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{booking.stylist}</td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">{booking.service}</td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">{formatDate(booking.date)}</td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{formatCurrency(booking.amount)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      booking.status === 'confirmed' ? 'success' :
                      booking.status === 'pending' ? 'warning' :
                      booking.status === 'completed' ? 'secondary' : 'error'
                    }>
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
