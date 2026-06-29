import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Trash2, Plus, Upload } from 'lucide-react'
import { Card, Button } from '../../../components/ui'
import toast from 'react-hot-toast'

const mockImages = [
  'https://images.pexels.com/photos/1654748/pexels-photo-1654748.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3993309/pexels-photo-3993309.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
]

export default function StylistPortfolioPage() {
  const [images, setImages] = useState(mockImages)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleDelete = (url) => {
    setImages(images.filter(img => img !== url))
    toast.success('Image removed')
  }

  const handleAddImage = () => {
    toast.success('Image upload coming soon!')
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
            Portfolio
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Showcase your best work to attract new clients.
          </p>
        </div>
        <Button onClick={handleAddImage}>
          <Plus className="w-4 h-4 mr-2" />
          Add Photo
        </Button>
      </motion.div>

      {/* Upload Zone */}
      <Card className="p-8 border-2 border-dashed border-secondary-300 dark:border-secondary-700 text-center">
        <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
        <p className="text-secondary-600 dark:text-secondary-400 mb-2">
          Drag and drop images here, or click to browse
        </p>
        <p className="text-sm text-secondary-500">PNG, JPG up to 5MB each</p>
      </Card>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <motion.div
            key={url}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative aspect-square rounded-xl overflow-hidden group"
          >
            <img
              src={url}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button variant="ghost" size="icon" className="bg-white/90 text-secondary-900">
                <Camera className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 text-error-500"
                onClick={() => handleDelete(url)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {images.length === 0 && (
        <Card className="p-12 text-center">
          <Camera className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">
            No portfolio photos yet. Upload your best work to attract clients!
          </p>
        </Card>
      )}
    </div>
  )
}
