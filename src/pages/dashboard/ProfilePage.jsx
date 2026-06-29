import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Save, User, Phone, Mail, MapPin } from 'lucide-react'
import { Card, Button, Input } from '../../components/ui'
import { Avatar } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { profile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success('Profile updated successfully!')
    setLoading(false)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Update your personal information and preferences.
        </p>
      </motion.div>

      <Card className="p-6">
        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8">
            <Avatar src={profile?.avatar_url} alt={profile?.full_name} size="xl" />
            <div>
              <Button type="button" variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-xs text-secondary-500 mt-2">
                JPG, PNG. Max size 5MB.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="input pl-10 bg-secondary-50 dark:bg-secondary-800"
                />
              </div>
              <p className="text-xs text-secondary-500 mt-1">Email can only be changed by contacting support.</p>
            </div>

            <div>
              <label className="label">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input pl-10"
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-secondary-200 dark:border-secondary-700 flex gap-3">
              <Button type="submit" loading={loading}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
