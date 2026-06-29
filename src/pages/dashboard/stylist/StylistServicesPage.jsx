import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Check } from 'lucide-react'
import { Card, Badge, Button } from '../../../components/ui'
import { formatCurrency } from '../../../utils/helpers'
import { SERVICE_CATEGORIES } from '../../../constants'
import toast from 'react-hot-toast'

const mockServices = [
  { id: 1, name: 'Box Braids', category: 'Braids', price: 150, duration_minutes: 240, service_type: 'both', is_active: true },
  { id: 2, name: 'Knotless Braids', category: 'Braids', price: 180, duration_minutes: 270, service_type: 'both', is_active: true },
  { id: 3, name: 'Cornrows', category: 'Cornrows', price: 85, duration_minutes: 120, service_type: 'both', is_active: true },
  { id: 4, name: 'Goddess Locs', category: 'Locs', price: 250, duration_minutes: 300, service_type: 'salon', is_active: true },
  { id: 5, name: 'Spring Twists', category: 'Twists', price: 120, duration_minutes: 180, service_type: 'both', is_active: false },
]

export default function StylistServicesPage() {
  const [services, setServices] = useState(mockServices)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState(null)

  const handleToggle = (id) => {
    setServices(services.map(s => s.id === id ? { ...s, is_active: !s.is_active } : s))
    toast.success('Service updated')
  }

  const handleDelete = (id) => {
    setServices(services.filter(s => s.id !== id))
    toast.success('Service deleted')
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
            Services
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage your services and pricing.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </motion.div>

      {/* Services List */}
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className={`p-4 ${!service.is_active ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-secondary-900 dark:text-white">{service.name}</h3>
                    {!service.is_active && <Badge variant="secondary">Inactive</Badge>}
                  </div>
                  <Badge variant="primary" className="mt-1">{service.category}</Badge>
                </div>
                <p className="text-lg font-bold text-primary-600">{formatCurrency(service.price)}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-secondary-500 mt-3">
                <span>{service.duration_minutes} min</span>
                <span>•</span>
                <span className="capitalize">{service.service_type === 'both' ? 'Home & Salon' : service.service_type}</span>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <Button variant="ghost" size="sm" onClick={() => handleToggle(service.id)}>
                  {service.is_active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setEditingService(service)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-error-500" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {services.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-secondary-600 dark:text-secondary-400">
            No services yet. Add your first service to start accepting bookings!
          </p>
        </Card>
      )}
    </div>
  )
}
