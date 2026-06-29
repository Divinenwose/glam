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
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-soft p-6 sm:p-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-5">
            <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
          </div>

          <h2 className="text-xl font-display font-bold text-secondary-900 dark:text-white mb-2">
            Verify Your Email
          </h2>

          <p className="text-sm sm:text-base leading-7 text-secondary-600 dark:text-secondary-400 mb-6">
            We've sent a verification link to
            <br />
            <strong className="text-secondary-900 dark:text-white">{email || 'your email'}</strong>.
            <br />
            Please click the link in the email to verify your account.
          </p>

          <p className="text-sm text-secondary-500 dark:text-secondary-500 mb-6">
            Didn't receive the email? Check your spam folder or request a new one.
          </p>

          <Button
            variant="ghost"
            onClick={handleResend}
            loading={resending}
            className="w-full sm:w-auto mb-4"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Resend Verification Email
          </Button>

          <div className="pt-2">
            <Link
              to="/login"
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function RoleSelectionPage() {
  return null
}
