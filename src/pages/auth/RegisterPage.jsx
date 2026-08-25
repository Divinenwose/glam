import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, Scissors, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/ui'
import toast from 'react-hot-toast'

const roles = [
  { id: 'customer', title: 'Customer', description: 'Find and book hairstylists' },
  { id: 'stylist', title: 'Hairstylist', description: 'Offer services and grow your business' },
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    role: 'customer',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        role: formData.role,
      })

      if (error) throw error

      toast.success('Account created successfully!')
      navigate('/verify-email', { state: { email: formData.email } })
    } catch (error) {
      toast.error(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-auto flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center my-16 p-8">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-1 rounded ${step >= 1 ? 'bg-burgundy-600' : 'bg-neutral-200 dark:bg-neutral-700'}`} />
            <div className={`flex-1 h-1 rounded ${step >= 2 ? 'bg-burgundy-600' : 'bg-neutral-200 dark:bg-neutral-700'}`} />
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                Choose Your Role
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Select how you want to use GlamBook
              </p>

              <div className="space-y-4 mb-8">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      formData.role === role.id
                        ? 'border-burgundy-600 bg-burgundy-50 dark:bg-burgundy-900/20'
                        : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {role.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {role.description}
                        </p>
                      </div>
                      {formData.role === role.id && (
                        <Check className="w-5 h-5 text-burgundy-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <Button size="lg" onClick={() => setStep(2)} className="w-full">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-2">
                Create Your Account
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                {formData.role === 'stylist' ? 'Set up your stylist profile' : 'Fill in your details to get started'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="input pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="label">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="Confirm your password"
                      className="input pl-10"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-neutral-300 text-burgundy-600 focus:ring-burgundy-500"
                  />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    I agree to the{' '}
                    <Link to="/terms" className="text-burgundy-700 hover:text-burgundy-800 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-burgundy-700 hover:text-burgundy-800 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                <Button type="submit" size="lg" loading={loading} className="w-full">
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-4 w-full text-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                Back to role selection
              </button>
            </>
          )}

          <div className="mt-8 text-center">
              <p className="text-neutral-600 dark:text-neutral-400">
              Already have an account?{' '}
              <Link to="/login" className="text-burgundy-700 font-medium hover:text-burgundy-800 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Hairstylist"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-burgundy-800/95" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <h2 className="text-3xl font-display font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-burgundy-100 text-lg">
              Connect with talented stylists and embark on your hair transformation journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

