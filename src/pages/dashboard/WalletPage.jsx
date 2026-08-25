import { motion } from 'framer-motion'
import { Wallet, ArrowDownLeft, ArrowUpRight, CreditCard, DollarSign, ArrowRight } from 'lucide-react'
import { Card, Button } from '../../components/ui'
import { formatCurrency, formatDate } from '../../utils/helpers'

const mockTransactions = [
  { id: 1, type: 'booking_payment', amount: -155, date: '2024-02-12', status: 'completed', booking_id: '1' },
  { id: 2, type: 'booking_payment', amount: -50, date: '2024-02-10', status: 'completed', booking_id: '2' },
  { id: 3, type: 'refund', amount: 100, date: '2024-01-28', status: 'completed', booking_id: '3' },
]

export default function WalletPage() {
  const balance = 0

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
          Wallet
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          View your transactions and payment history.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-burgundy-100 dark:bg-burgundy-900/30">
              <Wallet className="w-6 h-6 text-burgundy-600" />
            </div>
            <h2 className="font-medium text-neutral-900 dark:text-white">Balance</h2>
          </div>
          <p className="text-4xl font-bold text-neutral-900 dark:text-white mb-1">
            {formatCurrency(balance)}
          </p>
          <p className="text-sm text-neutral-500 mb-4">Available balance</p>
          <Button variant="outline" className="w-full">
            Add Funds
          </Button>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="font-medium text-neutral-900 dark:text-white mb-4">Payment Methods</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-neutral-400" />
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white">**** **** **** 4242</p>
                  <p className="text-xs text-neutral-500">Expires 12/25</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs bg-burgundy-100 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-400 rounded-full">
                Default
              </span>
            </div>
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-medium text-neutral-900 dark:text-white mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  tx.type === 'refund' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-neutral-200 dark:bg-neutral-700'
                }`}>
                  {tx.type === 'refund' ? (
                    <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-neutral-900 dark:text-white capitalize">
                    {tx.type.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-neutral-500">{formatDate(tx.date)}</p>
                </div>
              </div>
              <p className={`font-medium ${
                tx.type === 'refund' ? 'text-emerald-600' : 'text-neutral-900 dark:text-white'
              }`}>
                {tx.type === 'refund' ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

