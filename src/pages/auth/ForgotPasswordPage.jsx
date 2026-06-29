import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Scissors } from 'lucide-react'
import { Button } from '../../components/ui'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSent(true)
    toast.success('Reset email sent!')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >

        {sent ? (
          <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-soft p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-success-600" />
            </div>
            <h2 className="text-xl font-display font-bold text-secondary-900 dark:text-white mb-2">
              Check Your Email
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              We've sent a password reset link to <strong className="text-secondary-900 dark:text-white">{email}</strong>. Please check your inbox.
            </p>
            <Link to="/login" className="btn-primary w-full inline-flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-soft p-8">
            <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
              Forgot Your Password?
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              No worries. Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input pl-10"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" loading={loading} className="w-full">
                Send Reset Link
              </Button>
            </form>

            <Link
              to="/login"
              className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
