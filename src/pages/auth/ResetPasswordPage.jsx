import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Scissors, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Password reset successfully!')
    navigate('/login')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >

        <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-soft p-8">
          <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
            Reset Your Password
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            Enter a new password for your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 8 characters"
                  className="input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="label">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your new password"
                  className="input pl-10"
                />
              </div>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full">
              Reset Password
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
