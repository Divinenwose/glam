import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Card } from '../../../components/ui'
import { formatDate } from '../../../utils/helpers'

const mockReviews = [
  { id: 1, customer: 'Aisha M.', stylist: 'Jasmine Williams', rating: 5, comment: 'Amazing work!', date: '2024-02-15', visible: true },
  { id: 2, customer: 'Patricia L.', stylist: 'Marcus Johnson', rating: 5, comment: 'Best haircut ever!', date: '2024-02-10', visible: true },
  { id: 3, customer: 'Tanya W.', stylist: 'Amara Chen', rating: 3, comment: 'Service was okay but took longer than expected.', date: '2024-02-05', visible: false },
]

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Reviews Management
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Review and moderate stylist reviews.
        </p>
      </motion.div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Stylist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {mockReviews.map((review) => (
                <tr key={review.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{review.customer}</td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{review.stylist}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
                      <span className="text-secondary-900 dark:text-white">{review.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400 max-w-xs truncate">{review.comment}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      review.visible
                        ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
                    }`}>
                      {review.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">{formatDate(review.date)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-primary-600 text-sm hover:underline">View</button>
                      <button className="text-error-500 text-sm hover:underline">
                        {review.visible ? 'Hide' : 'Approve'}
                      </button>
                    </div>
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
