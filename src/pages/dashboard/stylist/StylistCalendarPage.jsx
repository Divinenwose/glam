import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../../../components/ui'
import { useState } from 'react'

export default function StylistCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days = []

    // Previous month days
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: null, currentMonth: false })
    }

    // Current month days
    const today = new Date()
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i)
      days.push({
        day: i,
        date: dayDate,
        currentMonth: true,
        isToday: dayDate.toDateString() === today.toDateString(),
        isSelected: selectedDate && dayDate.toDateString() === selectedDate.toDateString(),
      })
    }

    return days
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const bookingsByDate = selectedDate ? [
    { time: '10:00', customer: 'Aisha M.', service: 'Box Braids' },
    { time: '14:30', customer: 'Patricia L.', service: 'Cornrows' },
  ] : []

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">
          Calendar
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          View and manage your schedule.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              {monthYear}
            </h2>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-neutral-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => (
              <button
                key={i}
                disabled={!d.currentMonth}
                onClick={() => d.currentMonth && setSelectedDate(d.date)}
                className={`aspect-square p-1 text-sm rounded-lg transition-all ${
                  !d.currentMonth
                    ? 'text-neutral-300 dark:text-neutral-700'
                    : d.isSelected
                    ? 'bg-burgundy-600 text-white'
                    : d.isToday
                    ? 'border-2 border-burgundy-600 text-burgundy-600'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white'
                }`}
              >
                {d.day || ''}
              </button>
            ))}
          </div>
        </Card>

        {/* Selected Day Details */}
        <Card className="p-6">
          {selectedDate ? (
            <>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </h2>
              <div className="space-y-3">
                {bookingsByDate.map((booking, i) => (
                  <div key={i} className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-neutral-900 dark:text-white">{booking.time}</p>
                      <p className="text-sm text-burgundy-600">{booking.service}</p>
                    </div>
                    <p className="text-sm text-neutral-500">{booking.customer}</p>
                  </div>
                ))}
                {bookingsByDate.length === 0 && (
                  <p className="text-center text-neutral-500 py-4">No bookings</p>
                )}
                <button className="w-full btn-primary mt-4">Add Availability</button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-neutral-500">
              <p>Select a day to view details</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

