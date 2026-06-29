import { motion } from 'framer-motion'
import { Star, MessageSquare } from 'lucide-react'
import { Card } from '../../components/ui'

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          My Reviews
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Reviews you've left for stylists.
        </p>
      </motion.div>

      <Card className="p-12 text-center">
        <MessageSquare className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
        <p className="text-secondary-600 dark:text-secondary-400">
          No reviews yet. After your appointments, you can leave reviews for stylists!
        </p>
      </Card>
    </div>
  )
}
