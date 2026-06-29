import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock, Award, Heart, Check } from 'lucide-react'
import { Card, Badge, Button } from './Modal'
import { formatCurrency } from '../../utils/helpers'

export function StylistCard({ stylist, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Link to={`/stylists/${stylist.id}`} className="block h-full">
        <Card hover className="group h-full flex flex-col overflow-hidden">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={stylist.image || 'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=800'}
              alt={stylist.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                }}
                className="p-2 rounded-full bg-white/90 dark:bg-secondary-900/90 text-secondary-400 hover:text-error-500 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
            {stylist.is_verified && (
              <div className="absolute top-3 left-3">
                <Badge variant="success" className="gap-1">
                  <Check className="w-3 h-3" />
                  Verified
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            <div className="mt-auto flex items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-secondary-900 dark:text-white">
                  {stylist.name}
                </h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  {stylist.title}
                </p>
              </div>
              <div className="flex items-center gap-1 text-warning-500">
                <Star className="w-4 h-4 fill-warning-500" />
                <span className="text-sm font-medium">{stylist.rating?.toFixed(1) || 'New'}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-secondary-500 dark:text-secondary-400 mb-3">
              <MapPin className="w-4 h-4" />
              {stylist.city}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {stylist.specializations?.slice(0, 3).map((spec) => (
                <Badge key={spec} variant="primary">
                  {spec}
                </Badge>
              ))}
              {stylist.specializations?.length > 3 && (
                <Badge variant="secondary">
                  +{stylist.specializations.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-secondary-500 dark:text-secondary-400">From</span>
                <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {formatCurrency(stylist.starting_price || 50)}
                </p>
              </div>
              <Button variant="primary" size="sm">
                Book Now
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export function StylistHorizontalCard({ stylist }) {
  return (
    <Link to={`/stylists/${stylist.id}`}>
      <Card hover className="flex gap-4 p-4">
        {/* Image */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={stylist.image || 'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={stylist.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-secondary-900 dark:text-white truncate">
                  {stylist.name}
                </h3>
                {stylist.is_verified && (
                  <Badge variant="success" className="gap-1">
                    <Check className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                {stylist.title}
              </p>
            </div>
            <div className="flex items-center gap-1 text-warning-500">
              <Star className="w-4 h-4 fill-warning-500" />
              <span className="text-sm font-medium">{stylist.rating?.toFixed(1) || 'New'}</span>
              {stylist.review_count > 0 && (
                <span className="text-xs text-secondary-400">({stylist.review_count})</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm text-secondary-500 dark:text-secondary-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {stylist.city}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {stylist.experience_years}+ years
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {stylist.specializations?.slice(0, 4).map((spec) => (
              <Badge key={spec} variant="secondary">
                {spec}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3">
            <p className="text-lg font-semibold text-primary-600">
              From {formatCurrency(stylist.starting_price || 50)}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
