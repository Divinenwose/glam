import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, MapPin, CreditCard, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, Card, Badge } from '../../components/ui'
import { formatCurrency } from '../../utils/helpers'
import toast from 'react-hot-toast'

const mockServices = [
  { id: 1, name: 'Box Braids', price: 150, duration_minutes: 240 },
  { id: 2, name: 'Knotless Braids', price: 180, duration_minutes: 270 },
  { id: 3, name: 'Cornrows', price: 85, duration_minutes: 120 },
]

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
]

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
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState({
    serviceId: null,
    serviceType: 'salon',
    date: null,
    time: null,
    address: '',
    notes: '',
    paymentMethod: 'card',
  })

  const selectedService = mockServices.find(s => s.id === booking.serviceId)

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleConfirmBooking = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Booking confirmed!')
    navigate('/bookings')
    setLoading(false)
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
    <div className="bg-secondary-50 dark:bg-secondary-950 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="container-custom py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>

      <div className="container-custom mt-6">
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-6">
          Book an Appointment
        </h1>

        {/* Steps */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center min-w-[80px]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > step.id
                    ? 'bg-success-500 text-white'
                    : currentStep === step.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-500'
                }`}>
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <p className={`text-xs mt-2 font-medium ${
                  currentStep >= step.id ? 'text-primary-600' : 'text-secondary-500'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ${
                  currentStep > step.id ? 'bg-success-500' : 'bg-secondary-200 dark:bg-secondary-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                      Select a Service
                    </h2>
                    <div className="space-y-3">
                      {mockServices.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setBooking({ ...booking, serviceId: service.id })}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            booking.serviceId === service.id
                              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-secondary-900 dark:text-white">{service.name}</h3>
                              <p className="text-sm text-secondary-500">{service.duration_minutes} minutes</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary-600">{formatCurrency(service.price)}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium text-secondary-900 dark:text-white mb-3">Service Location</h3>
                      <div className="flex gap-4">
                        <label className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          booking.serviceType === 'salon'
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-secondary-200 dark:border-secondary-700'
                        }`}>
                          <input
                            type="radio"
                            name="serviceType"
                            value="salon"
                            checked={booking.serviceType === 'salon'}
                            onChange={(e) => setBooking({ ...booking, serviceType: e.target.value })}
                            className="sr-only"
                          />
                          <span className="font-medium text-secondary-900 dark:text-white">Salon Visit</span>
                        </label>
                        <label className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          booking.serviceType === 'home'
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-secondary-200 dark:border-secondary-700'
                        }`}>
                          <input
                            type="radio"
                            name="serviceType"
                            value="home"
                            checked={booking.serviceType === 'home'}
                            onChange={(e) => setBooking({ ...booking, serviceType: e.target.value })}
                            className="sr-only"
                          />
                          <span className="font-medium text-secondary-900 dark:text-white">Home Service</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                      Select a Date
                    </h2>
                    <div className="bg-white dark:bg-secondary-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}>
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="font-medium text-secondary-900 dark:text-white">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="text-xs font-medium text-secondary-500 py-2">
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
                            className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                              !day.date
                                ? ''
                                : day.disabled
                                ? 'text-secondary-300 dark:text-secondary-600 cursor-not-allowed'
                                : booking.date && booking.date.toDateString() === day.date.toDateString()
                                ? 'bg-primary-600 text-white'
                                : day.isToday
                                ? 'border-2 border-primary-600 text-primary-600'
                                : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'
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
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                      Select a Time
                    </h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setBooking({ ...booking, time })}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            booking.time === time
                              ? 'bg-primary-600 text-white'
                              : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
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
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
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

                    <div className="bg-secondary-50 dark:bg-secondary-800 rounded-xl p-4">
                      <h3 className="font-medium text-secondary-900 dark:text-white mb-3">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary-600 dark:text-secondary-400">Service</span>
                          <span className="font-medium text-secondary-900 dark:text-white">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600 dark:text-secondary-400">Date</span>
                          <span className="font-medium text-secondary-900 dark:text-white">
                            {booking.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600 dark:text-secondary-400">Time</span>
                          <span className="font-medium text-secondary-900 dark:text-white">{booking.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600 dark:text-secondary-400">Duration</span>
                          <span className="font-medium text-secondary-900 dark:text-white">{selectedService?.duration_minutes} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      Payment Method
                    </h2>

                    <div className="space-y-3">
                      {[
                        { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                        { id: 'cash', label: 'Pay in Cash', icon: null },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            booking.paymentMethod === method.id
                              ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-secondary-200 dark:border-secondary-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={booking.paymentMethod === method.id}
                            onChange={(e) => setBooking({ ...booking, paymentMethod: e.target.value })}
                            className="sr-only"
                          />
                          {method.icon && <method.icon className="w-5 h-5 text-secondary-600" />}
                          <span className="font-medium text-secondary-900 dark:text-white">{method.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="bg-secondary-50 dark:bg-secondary-800 rounded-xl p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-secondary-600 dark:text-secondary-400">Subtotal</span>
                          <span className="text-secondary-900 dark:text-white">{formatCurrency(selectedService?.price || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600 dark:text-secondary-400">Platform fee</span>
                          <span className="text-secondary-900 dark:text-white">$5.00</span>
                        </div>
                        <div className="border-t border-secondary-200 dark:border-secondary-700 pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span className="text-secondary-900 dark:text-white">Total</span>
                            <span className="text-primary-600">{formatCurrency((selectedService?.price || 0) + 5)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700">
                  <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 1}>
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  {currentStep < 5 ? (
                    <Button onClick={handleNext}>Continue</Button>
                  ) : (
                    <Button onClick={handleConfirmBooking} loading={loading}>
                      Confirm Booking
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
                <h3 className="font-semibold text-secondary-900 dark:text-white mb-4">Booking Summary</h3>
                {selectedService && (
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-secondary-500">Service</span>
                      <p className="font-medium text-secondary-900 dark:text-white">{selectedService.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-secondary-500">Duration</span>
                      <p className="font-medium text-secondary-900 dark:text-white">{selectedService.duration_minutes} minutes</p>
                    </div>
                    {booking.date && (
                      <div>
                        <span className="text-sm text-secondary-500">Date</span>
                        <p className="font-medium text-secondary-900 dark:text-white">
                          {booking.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    )}
                    {booking.time && (
                      <div>
                        <span className="text-sm text-secondary-500">Time</span>
                        <p className="font-medium text-secondary-900 dark:text-white">{booking.time}</p>
                      </div>
                    )}
                    <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                      <div className="flex justify-between">
                        <span className="text-secondary-600 dark:text-secondary-400">Total</span>
                        <span className="text-xl font-bold text-primary-600">
                          {formatCurrency(selectedService.price + 5)}
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
