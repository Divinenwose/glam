import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Save, User, Phone, Mail, MapPin, Store, Clock, Home, Check, AlertCircle } from 'lucide-react'
import { Card, Button, Input, Avatar, Badge } from '../../../components/ui'
import toast from 'react-hot-toast'
import { SERVICE_CATEGORIES } from '../../../constants'

export default function StylistProfilePage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: 'Jasmine\'s Braiding Studio',
    fullName: 'Jasmine Williams',
    email: 'jasmine@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Beauty Lane, Suite 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    bio: 'With over 8 years of experience specializing in braids and protective styles, I am passionate about helping clients achieve their hair goals while maintaining the health of their natural hair.',
    experienceYears: '8',
    specializations: ['Braids', 'Cornrows', 'Twists', 'Box Braids', 'Knotless Braids'],
    offersHomeService: true,
    offersSalonService: true,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.success('Profile updated successfully!')
    setLoading(false)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Stylist Profile
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Manage your business profile and how clients see you.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        {/* Verification Status */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success-100 dark:bg-success-900/30">
                <Check className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">Verified Stylist</p>
                <p className="text-sm text-secondary-500">Your account is verified!</p>
              </div>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>
        </Card>

        {/* Profile Photo & Basic Info */}
        <Card className="p-6 mb-6">
          <h2 className="font-semibold text-secondary-900 dark:text-white mb-4">Basic Information</h2>
          <div className="flex items-center gap-6 mb-6">
            <Avatar size="xl" name={formData.fullName} />
            <div>
              <Button type="button" variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-xs text-secondary-500 mt-2">JPG, PNG. Max 5MB</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Business Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="input bg-secondary-50 dark:bg-secondary-800"
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input"
              />
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6 mb-6">
          <h2 className="font-semibold text-secondary-900 dark:text-white mb-4">Location</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Street Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">ZIP</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="input"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Bio & Specializations */}
        <Card className="p-6 mb-6">
          <h2 className="font-semibold text-secondary-900 dark:text-white mb-4">About & Services</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="input min-h-[120px]"
                placeholder="Tell clients about yourself..."
              />
            </div>
            <div>
              <label className="label">Years of Experience</label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="input w-32"
                min="0"
                max="50"
              />
            </div>
            <div>
              <label className="label">Specializations</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.specializations.map((spec) => (
                  <Badge key={spec} variant="primary" className="py-1.5 px-3">{spec}</Badge>
                ))}
                <Button type="button" variant="outline" size="sm">+ Add</Button>
              </div>
            </div>
            <div>
              <label className="label">Service Types</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.offersSalonService}
                    onChange={(e) => setFormData({ ...formData, offersSalonService: e.target.checked })}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-secondary-700 dark:text-secondary-300 flex items-center gap-1">
                    <Store className="w-4 h-4" />
                    Salon Service
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.offersHomeService}
                    onChange={(e) => setFormData({ ...formData, offersHomeService: e.target.checked })}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-secondary-700 dark:text-secondary-300 flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    Home Service
                  </span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" loading={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
