import { motion } from 'framer-motion'
import { Home, Store } from 'lucide-react'
import { Card, Badge } from './Modal'
import { formatCurrency } from '../../utils/helpers'

export function ServiceCard({ service, index = 0, onSelect }) {
  const serviceTypeIcons = {
    home: Home,
    salon: Store,
    both: null,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        hover
        className="p-4 group"
        onClick={() => onSelect?.(service)}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-secondary-900 dark:text-white">
              {service.name}
            </h3>
            <Badge variant="secondary" className="mt-1">
              {service.category}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary-600">
              {formatCurrency(service.price)}
            </p>
            <p className="text-xs text-secondary-500">
              {service.duration_minutes} min
            </p>
          </div>
        </div>

        {service.description && (
          <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mt-2">
            {service.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-3">
          {service.service_type !== 'both' && serviceTypeIcons[service.service_type] && (
            <Badge variant="secondary" className="gap-1">
              {(() => {
                const Icon = serviceTypeIcons[service.service_type]
                return <Icon className="w-3 h-3" />
              })()}
              {service.service_type === 'home' ? 'Home Service' : 'Salon Visit'}
            </Badge>
          )}
          {service.service_type === 'both' && (
            <>
              <Badge variant="secondary" className="gap-1">
                <Home className="w-3 h-3" />
                Home
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Store className="w-3 h-3" />
                Salon
              </Badge>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
