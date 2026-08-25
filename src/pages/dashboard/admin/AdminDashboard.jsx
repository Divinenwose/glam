import { motion } from 'framer-motion'
import { Users, DollarSign, ShoppingBag, Star, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, StatsCard } from '../../../components/ui'
import { formatCurrency } from '../../../utils/helpers'

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '15,240', change: '+12%', changeType: 'positive', icon: Users },
    { title: 'Total Revenue', value: formatCurrency(125000), change: '+8%', changeType: 'positive', icon: DollarSign },
    { title: 'Total Bookings', value: '8,520', change: '+15%', changeType: 'positive', icon: ShoppingBag },
    { title: 'Active Stylists', value: '2,340', change: '+5%', changeType: 'positive', icon: Star },
  ]

  const pendingApprovals = [
    { id: 1, name: 'Kofi Asante', type: 'stylist_verification', date: '2024-02-14' },
    { id: 2, name: 'Amara Chen', type: 'withdrawal_request', amount: 500 },
    { id: 3, name: 'Sarah Miller', type: 'support_ticket', subject: 'Payment not received' },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Overview of platform activity and metrics.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={stat.title} {...stat} index={i} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h2 className="font-semibold text-neutral-900 dark:text-white">Pending Approvals</h2>
              <span className="px-2.5 py-0.5 text-xs font-medium bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 rounded-full">
                {pendingApprovals.length} pending
              </span>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      item.type === 'stylist_verification' ? 'bg-burgundy-100 dark:bg-burgundy-900/30' :
                      item.type === 'withdrawal_request' ? 'bg-gold-100 dark:bg-gold-900/30' :
                      'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      {item.type === 'stylist_verification' ? <Users className="w-4 h-4 text-burgundy-600" /> :
                       item.type === 'withdrawal_request' ? <DollarSign className="w-4 h-4 text-gold-600" /> :
                       <AlertTriangle className="w-4 h-4 text-red-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-neutral-500">
                        {item.type === 'stylist_verification' ? 'Stylist Verification' :
                         item.type === 'withdrawal_request' ? `Withdrawal - ${formatCurrency(item.amount)}` :
                         `Support: ${item.subject}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-sm btn-success">Approve</button>
                    <button className="btn-sm btn-outline">View</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Platform Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Uptime</span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  99.9%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Active Sessions</span>
                <span className="font-medium text-neutral-900 dark:text-white">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">Error Rate</span>
                <span className="text-emerald-600 font-medium">0.02%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Revenue Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Platform Fees</span>
                  <span className="font-medium">{formatCurrency(25000)}</span>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-[20%] bg-burgundy-600 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600 dark:text-neutral-400">Stylist Earnings</span>
                  <span className="font-medium">{formatCurrency(100000)}</span>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-gold-500 rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

