import { motion } from 'framer-motion'
import { ReviewCard } from '../../../components/ui'
import { Card } from '../../../components/ui'

const mockReviews = [
  {
    id: '1',
    rating: 5,
    comment: 'Jasmine did an amazing job with my box braids! They look so natural and lasted for months.',
    created_at: '2024-02-15',
    customer: { full_name: 'Aisha M.', avatar_url: null },
  },
  {
    id: '2',
    rating: 5,
    comment: 'Best stylist I have ever worked with. Professional, on time, and talented!',
    created_at: '2024-02-10',
    customer: { full_name: 'Patricia L.', avatar_url: null },
  },
  {
    id: '3',
    rating: 4,
    comment: 'Great work on my cornrows. The salon is clean and welcoming.',
    created_at: '2024-02-05',
    customer: { full_name: 'Tanya W.', avatar_url: null },
  },
]

export default function StylistReviewsPage() {
  const avgRating = mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Reviews
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          See what clients are saying about your services.
        </p>
      </motion.div>

      {/* Summary */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-secondary-900 dark:text-white">{avgRating.toFixed(1)}</p>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-4 h-4 ${star <= avgRating ? 'text-warning-500 fill-warning-500' : 'text-secondary-300'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-secondary-500 mt-1">{mockReviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = mockReviews.filter(r => r.rating === rating).length
              const percentage = (count / mockReviews.length) * 100
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-secondary-500 w-3">{rating}</span>
                  <div className="flex-1 h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
                    <div className="h-full bg-warning-500 rounded-full" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm text-secondary-500 w-6">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
