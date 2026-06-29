import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DollarSign, TrendingUp, ArrowDownLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { Card, Button } from '../../../components/ui'
import { StatsCard } from '../../../components/ui'
import { formatCurrency, formatDate } from '../../../utils/helpers'

const mockTransactions = [
  { id: 1, type: 'earning', amount: 150, date: '2024-02-12', status: 'completed', booking_id: '1' },
  { id: 2, type: 'earning', amount: 85, date: '2024-02-10', status: 'completed', booking_id: '2' },
  { id: 3, type: 'withdrawal', amount: -500, date: '2024-02-08', status: 'completed', account: '****4242' },
  { id: 4, type: 'earning', amount: 200, date: '2024-02-05', status: 'completed', booking_id: '3' },
  { id: 5, type: 'refund', amount: -100, date: '2024-02-01', status: 'completed', booking_id: '4' },
]

export default function StylistEarningsPage() {
  const balance = 585
  const availableBalance = 435

  const stats = [
    { title: 'Today\'s Earnings', value: formatCurrency(235), change: '+15%', changeType: 'positive', icon: DollarSign },
    { title: 'This Week', value: formatCurrency(850), change: '+12%', changeType: 'positive', icon: TrendingUp },
    { title: 'This Month', value: formatCurrency(3450), change: '+8%', changeType: 'positive', icon: Calendar },
    { title: 'Total Earned', value: formatCurrency(25000), change: '', icon: DollarSign },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Earnings
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Track your income and manage withdrawals.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      {/* Balance & Withdraw */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-semibold text-secondary-900 dark:text-white mb-4">Balance Overview</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20">
              <p className="text-sm text-secondary-600 dark:text-secondary-400">Available Balance</p>
              <p className="text-3xl font-bold text-primary-600">{formatCurrency(availableBalance)}</p>
              <p className="text-xs text-secondary-500 mt-2">Ready to withdraw</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary-100 dark:bg-secondary-800">
              <p className="text-sm text-secondary-600 dark:text-secondary-400">Pending Balance</p>
              <p className="text-3xl font-bold text-secondary-900 dark:text-white">{formatCurrency(balance - availableBalance)}</p>
              <p className="text-xs text-secondary-500 mt-2">Processing (~3 days)</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-secondary-200 dark:border-secondary-700">
            <Button>Request Withdrawal</Button>
            <p className="text-xs text-secondary-500 mt-3">
              Minimum withdrawal amount: $50. Withdrawals typically process within 3-5 business days.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-medium text-secondary-900 dark:text-white mb-4">Bank Account</h3>
          <div className="p-3 rounded-lg bg-secondary-50 dark:bg-secondary-800 mb-4">
            <p className="font-medium text-secondary-900 dark:text-white">**** **** **** 4242</p>
            <p className="text-sm text-secondary-500">Primary Account</p>
          </div>
          <Button variant="outline" className="w-full">Update Bank Details</Button>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="p-6">
        <h2 className="font-semibold text-secondary-900 dark:text-white mb-4">Transaction History</h2>
        <div className="space-y-3">
          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary-50 dark:bg-secondary-800"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  tx.type === 'earning' ? 'bg-success-100 dark:bg-success-900/30' :
                  tx.type === 'withdrawal' ? 'bg-warning-100 dark:bg-warning-900/30' :
                  'bg-error-100 dark:bg-error-900/30'
                }`}>
                  {tx.type === 'earning' ? <ArrowDownLeft className="w-4 h-4 text-success-600" /> :
                   tx.type === 'withdrawal' ? <ArrowUpRight className="w-4 h-4 text-warning-600" /> :
                   <ArrowUpRight className="w-4 h-4 text-error-600" />}
                </div>
                <div>
                  <p className="font-medium text-secondary-900 dark:text-white capitalize">{tx.type}</p>
                  <p className="text-xs text-secondary-500">{formatDate(tx.date)}</p>
                </div>
              </div>
              <p className={`font-medium ${
                tx.type === 'earning' ? 'text-success-600' :
                tx.type === 'withdrawal' ? 'text-warning-600' :
                'text-error-600'
              }`}>
                {tx.type === 'earning' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
