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
        <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
          Reviews Management
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Review and moderate stylist reviews.
        </p>
      </motion.div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Stylist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Comment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {mockReviews.map((review) => (
                <tr key={review.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                  <td className="px-6 py-4 text-neutral-900 dark:text-white">{review.customer}</td>
                  <td className="px-6 py-4 text-neutral-900 dark:text-white">{review.stylist}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                      <span className="text-neutral-900 dark:text-white">{review.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400 max-w-xs truncate">{review.comment}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      review.visible
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}>
                      {review.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">{formatDate(review.date)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-burgundy-700 text-sm hover:text-burgundy-800 hover:underline">View</button>
                      <button className="text-red-500 text-sm hover:underline">
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

