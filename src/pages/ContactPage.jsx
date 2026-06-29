import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Button, Card } from '../components/ui'
import toast from 'react-hot-toast'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@glambook.com',
    description: 'We typically respond within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri from 9am to 6pm EST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '123 Beauty Lane, New York, NY 10001',
    description: 'HQ Location',
  },
]

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Customer Support' },
  { value: 'stylist', label: 'Stylist Inquiry' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'press', label: 'Press & Media' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'general',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success('Message sent successfully! We\'ll get back to you soon.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      inquiryType: 'general',
      message: '',
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Have questions, feedback, or need help? We'd love to hear from you. Our team is here to assist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="inline-flex p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 mb-4">
                    <method.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                    {method.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {method.value}
                  </p>
                  <p className="text-sm text-secondary-500 dark:text-secondary-500">
                    {method.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Inquiry Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="input"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this about?"
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                    className="input resize-none"
                  />
                </div>

                <Button type="submit" size="lg" loading={loading} className="w-full sm:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-secondary-50 dark:bg-secondary-800/50 border-0">
                <MessageCircle className="w-12 h-12 text-primary-600 mb-6" />
                <h2 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-4">
                  Need Quick Help?
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                  Our help center has answers to the most commonly asked questions. You might find what you're looking for there.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-success-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">Response Time</p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        We aim to respond within 24 hours on business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-warning-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">Phone Support Hours</p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        Monday - Friday: 9:00 AM - 6:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Visit Help Center
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
