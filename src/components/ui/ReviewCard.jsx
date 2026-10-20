import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Card, Avatar, StarRating } from './Modal'
import { formatDate } from '../../utils/helpers'

export function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="relative h-full flex flex-col p-6 border-gold-500/20 hover:border-gold-500/45 transition-colors duration-500">
        <Quote className="absolute top-5 right-5 w-10 h-10 text-gold-500/15" />
        <div className="flex items-start gap-3 flex-1">
          <Avatar
            src={review.customer?.avatar_url}
            alt={review.customer?.full_name}
            size="md"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-white">
                  {review.customer?.full_name || 'Anonymous'}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={review.rating} />
                  <span className="text-sm text-neutral-400">
                    {formatDate(review.created_at)}
                  </span>
                </div>
              </div>
            </div>
            {review.comment && (
              <p className="mt-4 text-neutral-300 leading-relaxed">
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
                  <div className="w-16 h-16 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 text-sm font-medium">
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

