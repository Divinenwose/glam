import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Clock, Loader2, Receipt, CalendarDays, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { verifyPayment } from '../lib/payments'
import { formatCurrency } from '../utils/helpers'

const MAX_POLLS = 6 // bank transfer / USSD can take a little while to confirm
const POLL_MS = 4000

function formatBookingDate(date, time) {
  if (!date) return null
  const d = new Date(`${date}T00:00:00`)
  const nice = d.toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  if (!time) return nice
  const [h, m] = time.split(':').map(Number)
  const t = `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
  return `${nice} at ${t}`
}

export default function PaymentCallbackPage() {
  const [params] = useSearchParams()
  const reference = params.get('reference') || params.get('trxref')
  const { user, loading: authLoading } = useAuth()
  const [phase, setPhase] = useState('verifying') // verifying | completed | failed | pending | error
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')
  const polls = useRef(0)
  const timer = useRef(null)

  useEffect(() => {
    if (authLoading) return
    if (!reference) {
      setPhase('error')
      setMessage('We could not find a payment reference. If you were charged, please contact support.')
      return
    }
    if (!user) {
      setPhase('error')
      setMessage('Please sign in to view your payment.')
      return
    }

    let cancelled = false
    const check = async () => {
      try {
        const data = await verifyPayment(reference)
        if (cancelled) return
        setResult(data)
        if (data.state === 'completed') return setPhase('completed')
        if (data.state === 'failed') return setPhase('failed')
        // still pending: keep checking for a short while
        polls.current += 1
        if (polls.current >= MAX_POLLS) return setPhase('pending')
        setPhase('verifying')
        timer.current = setTimeout(check, POLL_MS)
      } catch (err) {
        if (cancelled) return
        setPhase('error')
        setMessage(err.message)
      }
    }
    check()
    return () => {
      cancelled = true
      clearTimeout(timer.current)
    }
  }, [reference, user, authLoading])

  const when = formatBookingDate(result?.booking?.date, result?.booking?.time)

  const states = {
    verifying: {
      icon: <Loader2 className="w-10 h-10 text-gold-300 animate-spin" />,
      ring: 'border-gold-500/40 bg-gold-500/10',
      title: 'Confirming your payment…',
      text: 'Please wait a moment. Do not close this page.',
    },
    completed: {
      icon: <CheckCircle2 className="w-10 h-10 text-emerald-300" />,
      ring: 'border-emerald-400/50 bg-emerald-500/15',
      title: 'Payment successful',
      text: 'Thank you! Your payment has been received and your appointment is reserved.',
    },
    failed: {
      icon: <XCircle className="w-10 h-10 text-red-400" />,
      ring: 'border-red-400/40 bg-red-500/10',
      title: 'Payment was not completed',
      text: 'Your payment did not go through and you have not been charged for this booking. You can try again.',
    },
    pending: {
      icon: <Clock className="w-10 h-10 text-gold-300" />,
      ring: 'border-gold-500/40 bg-gold-500/10',
      title: 'Still waiting for confirmation',
      text: 'We have not received confirmation from your bank yet. This can take a few minutes for transfers. If money left your account, your booking will be confirmed automatically.',
    },
    error: {
      icon: <XCircle className="w-10 h-10 text-red-400" />,
      ring: 'border-red-400/40 bg-red-500/10',
      title: 'We could not confirm this payment',
      text: message,
    },
  }
  const s = states[phase]

  return (
    <div className="section min-h-[70vh] flex items-center">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="card relative max-w-lg mx-auto p-8 sm:p-10 text-center"
        >
          {phase === 'completed' && (
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" aria-hidden="true" />
          )}

          <motion.div
            key={phase}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            className={`relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border ${s.ring} ${phase === 'completed' ? 'animate-pulse-glow-emerald' : ''}`}
          >
            {s.icon}
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-display font-semibold text-white mb-3">{s.title}</h1>
          <p className="text-neutral-300 leading-relaxed" role="status" aria-live="polite">{s.text}</p>

          {phase === 'completed' && result && (
            <div className="mt-8 rounded-2xl border border-gold-500/20 bg-white/[0.03] p-5 text-left space-y-3">
              <div className="flex items-center gap-2 text-gold-300 text-sm font-semibold uppercase tracking-wider">
                <Receipt className="w-4 h-4" /> Receipt
              </div>
              {result.booking?.service_name && (
                <Row label="Service" value={result.booking.service_name} />
              )}
              {when && (
                <Row label="Appointment" value={when} icon={<CalendarDays className="w-4 h-4 text-gold-400" />} />
              )}
              <Row label="Amount paid" value={formatCurrency(result.amount, result.currency || 'NGN')} strong />
              <Row label="Reference" value={result.reference} mono />
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {phase === 'completed' && (
              <>
                <Link to="/bookings" className="btn-primary group">
                  View my bookings
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/stylists" className="btn-outline">Book another</Link>
              </>
            )}
            {(phase === 'failed' || phase === 'pending' || phase === 'error') && (
              <>
                <Link to="/stylists" className="btn-primary">Back to stylists</Link>
                <Link to="/contact" className="btn-outline">Contact support</Link>
              </>
            )}
          </div>

          {reference && phase !== 'completed' && (
            <p className="mt-6 text-xs text-neutral-500">Reference: <span className="font-mono">{reference}</span></p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

function Row({ label, value, strong, mono, icon }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-neutral-400 flex items-center gap-2">{icon}{label}</span>
      <span className={`text-right ${strong ? 'text-lg font-semibold text-gold-300' : 'text-white'} ${mono ? 'font-mono text-xs break-all' : ''}`}>
        {value}
      </span>
    </div>
  )
}
