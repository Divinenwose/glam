import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Card, Button, Badge } from '../../../components/ui'
import { SERVICE_CATEGORIES } from '../../../constants'

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
            Service Categories
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage hair service categories displayed on the platform.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICE_CATEGORIES.map((category) => (
          <Card key={category.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-secondary-900 dark:text-white">{category.name}</h3>
                <Badge variant="secondary" className="mt-2">{category.id}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-error-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
