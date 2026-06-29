import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, RefreshCw, Scissors } from 'lucide-react'
import { Button } from '../../components/ui'
import toast from 'react-hot-toast'

export default function VerifyEmailPage() {
  const location = useLocation()
  const email = location.state?.email || ''
  const [resending, setResending] = useState(false)

  const handleResend = async () => {
    setResending(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Verification email sent!')
    setResending(false)
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="p-2 bg-primary-600 rounded-xl">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-semibold text-secondary-900 dark:text-white">
            GlamBook
          </span>
        </Link>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-soft p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>

          <h2 className="text-xl font-display font-bold text-secondary-900 dark:text-white mb-2">
            Verify Your Email
          </h2>

          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            We've sent a verification link to
            <br />
            <strong className="text-secondary-900 dark:text-white">{email || 'your email'}</strong>.
            <br />
            Please click the link in the email to verify your account.
          </p>

          <p className="text-sm text-secondary-500 dark:text-secondary-500 mb-6">
            Didn't receive the email? Check your spam folder or request a new one.
          </p>

          <Button variant="ghost" onClick={handleResend} loading={resending} className="mb-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Resend Verification Email
          </Button>

          <Link to="/login" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export function RoleSelectionPage() {
  return null
}
