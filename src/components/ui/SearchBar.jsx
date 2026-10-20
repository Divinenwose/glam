import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Search, Calendar, DollarSign, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from './Modal'
import { SERVICE_CATEGORIES, PRICE_RANGES } from '../../constants'

export default function SearchBar({ variant = 'hero', className, onSearch }) {
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [budget, setBudget] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showServiceDropdown, setShowServiceDropdown] = useState(false)
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false)

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
  const filteredCities = location ? cities.filter(c => c.toLowerCase().includes(location.toLowerCase())) : cities
  const filteredServices = service ? SERVICE_CATEGORIES.filter(s => s.name.toLowerCase().includes(service.toLowerCase())) : SERVICE_CATEGORIES

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.append('location', location)
    if (service) params.append('service', service)
    if (date) params.append('date', date)
    if (budget) params.append('budget', budget)
    navigate(`/stylists?${params.toString()}`)
    onSearch?.()
  }

  if (variant === 'compact') {
    return (
      <div className={className}>
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search stylists by name, service, or location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input pl-10"
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass rounded-3xl shadow-soft-lg p-5 sm:p-6 text-left ${className || ''}`}
    >
      <div className="grid md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400/90 mb-2">
            <MapPin className="w-4 h-4" />
            Location
          </label>
          <input
            type="text"
            placeholder="Enter city..."
            value={location}
            onChange={(e) => {
              setLocation(e.target.value)
              setShowLocationDropdown(true)
            }}
            onFocus={() => setShowLocationDropdown(true)}
            className="input w-full"
          />
          <AnimatePresence>
            {showLocationDropdown && filteredCities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 mt-2 w-full bg-[#1B1016] rounded-xl shadow-soft-lg border border-gold-500/25 max-h-48 overflow-y-auto"
              >
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setLocation(city)
                      setShowLocationDropdown(false)
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-gold-500/10 hover:text-gold-200 text-neutral-300 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Service */}
        <div className="relative">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400/90 mb-2">
            <Search className="w-4 h-4" />
            Hairstyle/Service
          </label>
          <input
            type="text"
            placeholder="What service?"
            value={service}
            onChange={(e) => {
              setService(e.target.value)
              setShowServiceDropdown(true)
            }}
            onFocus={() => setShowServiceDropdown(true)}
            className="input w-full"
          />
          <AnimatePresence>
            {showServiceDropdown && filteredServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 mt-2 w-full bg-[#1B1016] rounded-xl shadow-soft-lg border border-gold-500/25 max-h-48 overflow-y-auto"
              >
                {filteredServices.slice(0, 6).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setService(s.name)
                      setShowServiceDropdown(false)
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-gold-500/10 hover:text-gold-200 text-neutral-300 transition-colors"
                  >
                    {s.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400/90 mb-2">
            <Calendar className="w-4 h-4" />
            Preferred Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="input w-full"
          />
        </div>

        {/* Budget */}
        <div className="relative">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-400/90 mb-2">
            <DollarSign className="w-4 h-4" />
            Budget
          </label>
          <button
            onClick={() => setShowBudgetDropdown(!showBudgetDropdown)}
            className="input w-full text-left flex items-center justify-between"
          >
            <span className={budget ? 'text-white' : 'text-neutral-400'}>
              {budget || 'Select budget'}
            </span>
          </button>
          <AnimatePresence>
            {showBudgetDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-20 mt-2 w-full bg-[#1B1016] rounded-xl shadow-soft-lg border border-gold-500/25"
              >
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => {
                      setBudget(range.label)
                      setShowBudgetDropdown(false)
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-gold-500/10 hover:text-gold-200 text-neutral-300 transition-colors"
                  >
                    {range.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Button onClick={handleSearch} size="lg" className="w-full mt-4">
        <Search className="w-5 h-5 mr-2" />
        Find Hairstylist
      </Button>
    </motion.div>
  )
}

