import { motion } from 'framer-motion'
import { Card, StatsCard } from '../../../components/ui'
import { formatCurrency } from '../../../utils/helpers'

const mockPayments = [
  { id: 'P001', amount: 155, type: 'booking_payment', status: 'completed', date: '2024-02-15', user: 'Aisha M.' },
  { id: 'P002', amount: 500, type: 'withdrawal', status: 'pending', date: '2024-02-14', user: 'Jasmine Williams' },
  { id: 'P003', amount: 50, type: 'booking_payment', status: 'completed', date: '2024-02-14', user: 'Patricia L.' },
]

export default function AdminPaymentsPage() {
  const stats = [
    { title: 'Total Processed', value: formatCurrency(125000), icon: null },
    { title: 'Pending Withdrawals', value: formatCurrency(8500), icon: null },
    { title: 'Platform Revenue', value: formatCurrency(25000), icon: null },
    { title: 'Pending Refunds', value: formatCurrency(500), icon: null },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Payment Management
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Monitor transactions and manage withdrawals.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={stat.title} index={i} className="p-4">
            <p className="text-sm text-secondary-500">{stat.title}</p>
            <p className="text-2xl font-bold text-secondary-900 dark:text-white mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Transactions */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-secondary-200 dark:border-secondary-800">
          <h2 className="font-semibold text-secondary-900 dark:text-white">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 font-mono text-sm text-secondary-900 dark:text-white">{payment.id}</td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400 capitalize">{payment.type.replace('_', ' ')}</td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{payment.user}</td>
                  <td className="px-6 py-4 font-medium text-secondary-900 dark:text-white">{formatCurrency(payment.amount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      payment.status === 'completed' ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400' :
                      payment.status === 'pending' ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400' :
                      'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
