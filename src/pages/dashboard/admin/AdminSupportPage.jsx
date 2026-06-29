import { motion } from 'framer-motion'
import { Card, Badge, Button } from '../../../components/ui'
import { formatDate } from '../../../utils/helpers'

const mockTickets = [
  { id: 1, user: 'Aisha M.', subject: 'Refund request for cancelled booking', priority: 'high', status: 'open', date: '2024-02-15' },
  { id: 2, user: 'Jasmine Williams', subject: 'Payment not received', priority: 'medium', status: 'in_progress', date: '2024-02-14' },
  { id: 3, user: 'Marcus Johnson', subject: 'Help with portfolio upload', priority: 'low', status: 'resolved', date: '2024-02-10' },
]

export default function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Support Tickets
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Manage and respond to user support requests.
        </p>
      </motion.div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-secondary-500">Open Tickets</p>
          <p className="text-2xl font-bold text-error-500 mt-1">5</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-secondary-500">In Progress</p>
          <p className="text-2xl font-bold text-warning-500 mt-1">12</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-secondary-500">Resolved Today</p>
          <p className="text-2xl font-bold text-success-500 mt-1">8</p>
        </Card>
      </div>

      {/* Tickets List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {mockTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{ticket.user}</td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      ticket.priority === 'high' ? 'error' :
                      ticket.priority === 'medium' ? 'warning' : 'secondary'
                    }>
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      ticket.status === 'open' ? 'error' :
                      ticket.status === 'in_progress' ? 'warning' : 'success'
                    }>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">{formatDate(ticket.date)}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="primary" size="sm">Respond</Button>
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
