import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, Scissors, Award, Users, CreditCard } from 'lucide-react'
import { Button, Card } from '../components/ui'
import toast from 'react-hot-toast'

const steps = [
  { title: 'Basic Info', description: 'Tell us about yourself' },
  { title: 'Business Details', description: 'Your salon or business info' },
  { title: 'Services', description: 'What services do you offer?' },
  { title: 'Availability', description: 'When are you available?' },
  { title: 'Verification', description: 'Verify your identity' },
]

const benefits = [
  { icon: Users, title: 'Reach New Clients', description: 'Get discovered by clients in your area' },
  { icon: CreditCard, title: 'Secure Payments', description: 'Fast and reliable payouts to your bank' },
  { icon: Award, title: 'Build Your Reputation', description: 'Collect reviews and grow your rating' },
]

export default function BecomeStylistPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    experienceYears: '',
    specializations: [],
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bio: '',
    offersHomeService: false,
    offersSalonService: true,
    // Services
    services: [],
    // Availability
    workingHours: {},
    // Verification
    governmentId: null,
    selfie: null,
    portfolioImages: [],
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success('Application submitted! We will review and get back to you soon.')
    navigate('/')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      {/* Header */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="container-custom py-8">
          <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
            Become a Hairstylist
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Join our marketplace and start growing your business today.
          </p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Form - Left 2 columns */}
          <div className="lg:col-span-2">
            {/* Progress */}
            <div className="flex items-start gap-4 mb-6 overflow-x-auto scrollbar-hide pb-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${currentStep >= index
                          ? 'bg-primary-600 text-white'
                          : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-500'
                        }`}
                    >
                      {currentStep > index ? <Check className="w-4 h-4" /> : index + 1}
                    </div>
                    <div className="mt-2 text-center hidden sm:block">
                      <p className={`text-xs font-medium ${currentStep >= index ? 'text-primary-600' : 'text-secondary-500'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${currentStep > index ? 'bg-primary-600' : 'bg-secondary-200 dark:bg-secondary-700'
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form Steps */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-secondary-900 rounded-2xl shadow-soft p-4 sm:p-6 lg:p-8"
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="Your full legal name"
                      />
                    </div>
                    <div>
                      <label className="label">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="label">How many years of experience?</label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={50}
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="input"
                      placeholder="5"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="label">Business Name</label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="input"
                      placeholder="Your business or salon name"
                    />
                  </div>
                  <div>
                    <label className="label">Business Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="input"
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="label">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="input"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="label">State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="input"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="label">ZIP Code</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="input"
                        placeholder="ZIP"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Bio / About</label>
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="input"
                      placeholder="Tell clients about yourself, your style, and what makes you unique..."
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.offersSalonService}
                        onChange={(e) => setFormData({ ...formData, offersSalonService: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded"
                      />
                      <span className="text-secondary-700 dark:text-secondary-300">I offer salon services</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.offersHomeService}
                        onChange={(e) => setFormData({ ...formData, offersHomeService: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded"
                      />
                      <span className="text-secondary-700 dark:text-secondary-300">I offer home / mobile services</span>
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="text-center py-8">
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Service listing page would be here. After submitting, you'll be redirected to verify your identity.
                  </p>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center py-8">
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Availability calendar would be here. Set your working hours and days.
                  </p>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="label">Government ID</label>
                    <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-700 rounded-xl p-8 text-center">
                      <input type="file" accept="image/*,.pdf" className="hidden" id="governmentId" />
                      <label htmlFor="governmentId" className="cursor-pointer">
                        <p className="text-secondary-600 dark:text-secondary-400">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-secondary-500 mt-1">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="label">Portfolio Images (Up to 10)</label>
                    <div className="border-2 border-dashed border-secondary-300 dark:border-secondary-700 rounded-xl p-8 text-center">
                      <input type="file" accept="image/*" multiple className="hidden" id="portfolio" />
                      <label htmlFor="portfolio" className="cursor-pointer">
                        <p className="text-secondary-600 dark:text-secondary-400">
                          Upload images of your best work
                        </p>
                        <p className="text-sm text-secondary-500 mt-1">
                          PNG, JPG up to 5MB each
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 pt-6 border-t border-secondary-200 dark:border-secondary-700 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  className="w-full sm:w-auto"
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button onClick={handleNext} className="w-full sm:w-auto">
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} loading={loading}>
                    Submit Application
                    <Check className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Benefits - Right column */}
         <div className="lg:col-span-1 mt-8 xl:mt-0">
            <div className="space-y-4 lg:sticky lg:top-24">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                      <benefit.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900 dark:text-white">{benefit.title}</h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">{benefit.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
