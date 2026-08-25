import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card } from './Modal'

export function StatsCard({ title, value, change, changeType = 'positive', icon: Icon, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-burgundy-50 dark:bg-burgundy-900/20">
            <Icon className="w-5 h-5 text-burgundy-600" />
          </div>
          {change && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {changeType === 'positive' ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {change}%
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">{value}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
        </div>
      </Card>
    </motion.div>
  )
}

export function DashboardChartCard({ title, children, className }) {
  return (
    <Card className={className}>
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </Card>
  )
}

