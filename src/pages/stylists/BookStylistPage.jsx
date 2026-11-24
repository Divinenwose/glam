import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, MapPin, CreditCard, Check, ChevronLeft, ChevronRight, Lock, ShieldCheck, Landmark, Smartphone } from 'lucide-react'
import { Button, Card, Badge } from '../../components/ui'
import { formatCurrency } from '../../utils/helpers'
import { BOOKABLE_SERVICES, BOOKING_TIME_SLOTS, PLATFORM_FEE } from '../../constants/pricing'
import { createPayment, toLocalISODate } from '../../lib/payments'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const mockServices = BOOKABLE_SERVICES
const timeSlots = BOOKING_TIME_SLOTS

const steps = [
  { id: 1, title: 'Select Service' },
  { id: 2, title: 'Choose Date' },
  { id: 3, title: 'Select Time' },
  { id: 4, title: 'Confirm Details' },
  { id: 5, title: 'Payment' },
]

export default function BookStylistPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState({
    serviceId: null,
    serviceType: 'salon',
    date: null,
    time: null,
    address: '',
    notes: '',
  })

  const selectedService = mockServices.find(s => s.id === booking.serviceId)

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const total = (selectedService?.price || 0) + PLATFORM_FEE

  const canContinue =
    (currentStep === 1 && !!booking.serviceId) ||
    (currentStep === 2 && !!booking.date) ||
    (currentStep === 3 && !!booking.time) ||
    (currentStep === 4 && (booking.serviceType !== 'home' || booking.address.trim().length > 0)) ||
    currentStep === 5

  // Sends the booking choices to the server, then hands the customer to Paystack's secure checkout.
  const handlePay = async () => {
    if (!user) {
      toast('Please sign in to complete your booking.')
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    if (!selectedService || !booking.date || !booking.time) {
      toast.error('Please complete the earlier steps first.')
      return
    }
    setLoading(true)
    try {
      const payment = await createPayment({
        stylistId: String(id),
        serviceId: selectedService.id,
        serviceType: booking.serviceType,
        date: toLocalISODate(booking.date),
        time: booking.time,
        address: booking.address,
        notes: booking.notes,
      })
      window.location.assign(payment.authorization_url)
    } catch (err) {
      toast.error(err.message)
      setLoading(false)
    }
  }

  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1)
    const days = []
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // Add empty slots for days before first of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ date: null, disabled: true })
    }

    // Add actual days
    const today = new Date()
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d)
      days.push({
        date,
        disabled: date < today || date.getDay() === 0, // No Sundays in this example
        isToday: date.toDateString() === today.toDateString(),
      })
    }

    return days
  }

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth())

  return (
    <div className="bg-neutral-950 pb-12">
      {/* Header */}
      <div className="bg-neutral-900 border-b border-neutral-800">
        <div className="container-custom py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gold-400 hover:text-gold-300 hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="container-custom mt-6">
        <h1 className="text-2xl font-display font-semibold text-white mb-6">
          Book an Appointment
        </h1>

        {/* Steps */}
        <div className="flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide gap-2 mb-6 pb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center flex-shrink-0"
            >
              <div className="flex flex-col items-center min-w-[80px]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep > step.id
                    ? 'bg-emerald-500 text-white'
                    : currentStep === step.id
                      ? 'bg-burgundy-600 text-white'
                      : 'bg-neutral-700 text-neutral-400'
                  }`}>
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <p className={`text-xs mt-2 font-medium ${currentStep >= step.id ? 'text-gold-400' : 'text-neutral-400'
                  }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ${currentStep > step.id ? 'bg-emerald-500' : 'bg-neutral-700'
                  }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6">
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">
                      Select a Service
                    </h2>
                    <div className="space-y-3">
                      {mockServices.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setBooking({ ...booking, serviceId: service.id })}
                          className={`w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all ${booking.serviceId === service.id
                              ? 'border-gold-500/50 bg-burgundy-900/20'
                              : 'border-neutral-700 hover:border-neutral-600'
                            }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div>
                              <h3 className="font-medium text-white">{service.name}</h3>
                              <p className="text-sm text-neutral-400">{service.duration_minutes} minutes</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gold-400">{formatCurrency(service.price)}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium text-white mb-3">Service Location</h3>
                      <div className="flex gap-4">
                        <label className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${booking.serviceType === 'salon'
                            ? 'border-gold-500/50 bg-burgundy-900/20'
                            : 'border-neutral-700'
                          }`}>
                          <input
                            type="radio"
                            name="serviceType"
                            value="salon"
                            checked={booking.serviceType === 'salon'}
                            onChange={(e) => setBooking({ ...booking, serviceType: e.target.value })}
                            className="sr-only"
                          />
                          <span className="font-medium text-white">Salon Visit</span>
                        </label>
                        <label className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${booking.serviceType === 'home'
                            ? 'border-gold-500/50 bg-burgundy-900/20'
                            : 'border-neutral-700'
                          }`}>
                          <input
                            type="radio"
                            name="serviceType"
                            value="home"
                            checked={booking.serviceType === 'home'}
                            onChange={(e) => setBooking({ ...booking, serviceType: e.target.value })}
                            className="sr-only"
                          />
                          <span className="font-medium text-white">Home Service</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">
                      Select a Date
                    </h2>
                    <div className="bg-neutral-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="font-medium text-white">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="text-xs font-medium text-neutral-400 py-2">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {days.map((day, i) => (
                          <button
                            key={i}
                            disabled={day.disabled || !day.date}
                            onClick={() => day.date && setBooking({ ...booking, date: day.date })}
                            className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${!day.date
                                ? ''
                                : day.disabled
                                  ? 'text-neutral-600 cursor-not-allowed'
                                  : booking.date && booking.date.toDateString() === day.date.toDateString()
                                      ? 'bg-burgundy-600 text-white'
                                    : day.isToday
                                      ? 'border-2 border-gold-500/50 text-gold-400'
                                      : 'hover:bg-neutral-700'
                              }`}
                          >
                            {day.date?.getDate() || ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">
                      Select a Time
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setBooking({ ...booking, time })}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${booking.time === time
                              ? 'bg-burgundy-600 text-white'
                              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                            }`}
                        >
                          {(() => {
                            const [hour, minute] = time.split(':')
                            const h = parseInt(hour)
                            const period = h >= 12 ? 'PM' : 'AM'
                            const displayHour = h % 12 || 12
                            return `${displayHour}:${minute} ${period}`
                          })()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white">
                      Confirm Your Details
                    </h2>

                    {booking.serviceType === 'home' && (
                      <div>
                        <label className="label">Service Address</label>
                        <input
                          type="text"
                          value={booking.address}
                          onChange={(e) => setBooking({ ...booking, address: e.target.value })}
                          placeholder="Enter your address"
                          className="input"
                        />
                      </div>
                    )}

                    <div>
                      <label className="label">Special Notes (Optional)</label>
                      <textarea
                        value={booking.notes}
                        onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                        placeholder="Any special requests or notes for your stylist..."
                        className="input resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-4">
                      <h3 className="font-medium text-white mb-3">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Service</span>
                          <span className="font-medium text-white">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Date</span>
                          <span className="font-medium text-white">
                            {booking.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Time</span>
                          <span className="font-medium text-white">{booking.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Duration</span>
                          <span className="font-medium text-white">{selectedService?.duration_minutes} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white">
                      Secure Payment
                    </h2>

                    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.07] p-5">
                      <div className="flex items-start gap-3">
                        <span className="p-2 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/40">
                          <ShieldCheck className="w-5 h-5 text-emerald-300" />
                        </span>
                        <div>
                          <p className="font-medium text-white">Pay securely with Paystack</p>
                          <p className="text-sm text-neutral-300 mt-1">
                            You'll be taken to Paystack's encrypted checkout to complete your payment, then brought straight back here. We never see or store your card details.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {[
                          { icon: CreditCard, label: 'Card' },
                          { icon: Landmark, label: 'Bank transfer' },
                          { icon: Smartphone, label: 'USSD' },
                        ].map(({ icon: Icon, label }) => (
                          <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/25 bg-white/5 px-3 py-1 text-xs text-neutral-200">
                            <Icon className="w-3.5 h-3.5 text-gold-300" />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-neutral-800 rounded-xl p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Subtotal</span>
                          <span className="text-white">{formatCurrency(selectedService?.price || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Platform fee</span>
                          <span className="text-white">{formatCurrency(PLATFORM_FEE)}</span>
                        </div>
                        <div className="border-t border-neutral-700 pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span className="text-white">Total to pay</span>
                            <span className="text-gold-400">{formatCurrency(total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-700">
                  <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 1}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  {currentStep < 5 ? (
                    <Button onClick={handleNext} disabled={!canContinue}>Continue</Button>
                  ) : (
                    <Button onClick={handlePay} loading={loading} disabled={!canContinue}>
                      <Lock className="w-4 h-4 mr-2" />
                      Pay {formatCurrency(total)}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <h3 className="font-semibold text-white mb-4">Booking Summary</h3>
                {selectedService && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-neutral-400">Service</span>
                      <p className="font-medium text-white">{selectedService.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-400">Duration</span>
                      <p className="font-medium text-white">{selectedService.duration_minutes} minutes</p>
                    </div>
                    {booking.date && (
                      <div>
                        <span className="text-sm text-neutral-400">Date</span>
                        <p className="font-medium text-white">
                          {booking.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    )}
                    {booking.time && (
                      <div>
                        <span className="text-sm text-neutral-400">Time</span>
                        <p className="font-medium text-white">{booking.time}</p>
                      </div>
                    )}
                    <div className="border-t border-neutral-700 pt-4">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Total</span>
                        <span className="text-xl font-bold text-gold-400">
                          {formatCurrency(selectedService.price + PLATFORM_FEE)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

