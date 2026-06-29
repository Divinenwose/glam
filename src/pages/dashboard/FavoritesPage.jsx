import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { StylistHorizontalCard } from '../../components/ui/StylistCard'
import { Card } from '../../components/ui'

const mockFavorites = [
  {
    id: '1',
    name: 'Jasmine Williams',
    title: 'Braiding Specialist',
    city: 'New York',
    rating: 4.9,
    review_count: 128,
    experience_years: 8,
    starting_price: 85,
    specializations: ['Braids', 'Cornrows', 'Twists'],
    is_verified: true,
    image: 'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    title: 'Master Barber',
    city: 'New York',
    rating: 4.8,
    review_count: 95,
    experience_years: 12,
    starting_price: 45,
    specializations: ["Men's Haircuts", 'Fades', 'Beard Trim'],
    is_verified: true,
    image: 'https://images.pexels.com/photos/1811822/pexels-photo-1811822.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(mockFavorites)
  }, [])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Favorite Stylists
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Stylists you've saved for easy access.
        </p>
      </motion.div>

      <div className="space-y-4">
        {favorites.map((stylist, index) => (
          <motion.div
            key={styist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StylistHorizontalCard stylist={stylist} />
          </motion.div>
        ))}
      </div>

      {favorites.length === 0 && (
        <Card className="p-12 text-center">
          <Heart className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
          <p className="text-secondary-600 dark:text-secondary-400">
            No favorites yet. Browse stylists and save your favorites!
          </p>
        </Card>
      )}
    </div>
  )
}
