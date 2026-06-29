import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '../components/ui'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl font-display font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          <Link to="/stylists" className="btn-outline">
            <Search className="w-4 h-4 mr-2" />
            Find Stylists
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
