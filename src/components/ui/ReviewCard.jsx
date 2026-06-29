import { motion } from 'framer-motion'
import { Star, Calendar } from 'lucide-react'
import { Card, Avatar, StarRating } from './Modal'
import { formatDate } from '../../utils/helpers'

export function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <Avatar
            src={review.customer?.avatar_url}
            alt={review.customer?.full_name}
            size="md"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-secondary-900 dark:text-white">
                  {review.customer?.full_name || 'Anonymous'}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-secondary-500 dark:text-secondary-400">
                    {formatDate(review.created_at)}
                  </span>
                </div>
              </div>
            </div>
            {review.comment && (
              <p className="mt-3 text-secondary-600 dark:text-secondary-400">
                {review.comment}
              </p>
            )}
            {review.images?.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.images.slice(0, 4).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ))}
                {review.images.length > 4 && (
                  <div className="w-16 h-16 rounded-lg bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center text-secondary-600 dark:text-secondary-400 text-sm font-medium">
                    +{review.images.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
