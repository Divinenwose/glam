import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Input } from '../components/ui'

const faqCategories = [
  {
    id: 'booking',
    title: 'Booking & Appointments',
    faqs: [
      {
        question: 'How do I book a hairstylist?',
        answer: 'To book a hairstylist, search for stylists in your area using our search bar. Browse through profiles, view their portfolio, services, and reviews. Select your preferred appointment time, choose the service you want, and complete the booking by paying online or selecting another payment method.',
      },
      {
        question: 'Can I cancel or reschedule my appointment?',
        answer: 'Yes, you can cancel or reschedule your appointment up to 24 hours before the scheduled time without any penalty. Go to your Bookings page, find the appointment, and click "Reschedule" or "Cancel". Cancellations made less than 24 hours before may be subject to a cancellation fee.',
      },
      {
        question: 'What happens if the stylist cancels?',
        answer: 'If a stylist cancels your appointment, you will receive a full refund automatically. We also help you find alternative stylists with similar availability. Repeated cancellations by stylists may result in their removal from the platform.',
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking at least 2-3 days in advance for regular appointments. For special occasions like weddings or events, book at least 2-4 weeks ahead to ensure availability of your preferred stylist.',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments & Pricing',
    faqs: [
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept major credit and debit cards (Visa, Mastercard, American Express), bank transfers, and wallet payments. Some stylists also accept cash payments directly. You can select your preferred payment method during checkout.',
      },
      {
        question: 'When am I charged for the booking?',
        answer: 'For most bookings, you are charged at the time of confirmation. For home services, payment is held in escrow and released to the stylist 24 hours after the service is completed to ensure satisfaction.',
      },
      {
        question: 'Is there a platform fee?',
        answer: 'Customers do not pay any platform fees - the listed price is what you pay. Stylists pay a small commission on each booking (typically 15-20%) which covers payment processing, insurance, and platform maintenance.',
      },
      {
        question: 'How do refunds work?',
        answer: 'Refunds are processed automatically for cancellations made more than 24 hours in advance. For service-related issues, contact our support team within 48 hours of your appointment. Refunds typically appear in your account within 5-7 business days.',
      },
    ],
  },
  {
    id: 'stylists',
    title: 'For Stylists',
    faqs: [
      {
        question: 'How do I become a stylist on GlamBook?',
        answer: 'Sign up as a stylist, complete your profile with photos of your work, list your services and pricing, and submit verification documents (government ID and proof of experience). Our team reviews applications within 2-3 business days.',
      },
      {
        question: 'What are the requirements to join?',
        answer: 'You must be 18+ years old, have training or experience in hairstyling, have a professional portfolio, and be authorized to work. Government ID verification is mandatory for the verification badge.',
      },
      {
        question: 'How much does it cost to use GlamBook?',
        answer: 'Creating a profile is free. GlamBook charges a small commission (15-20%) on each completed booking. There are no monthly fees or hidden costs. You keep the majority of your earnings.',
      },
      {
        question: 'How do I get paid?',
        answer: 'Earnings are transferred to your linked bank account automatically. Payouts are processed within 3-5 business days after the service is completed. You can track your earnings in real-time from your dashboard.',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety & Trust',
    faqs: [
      {
        question: 'How are stylists verified?',
        answer: 'All stylists undergo a verification process including government ID verification, phone number verification, and portfolio review. Verified stylists display a green badge on their profile. Some stylists also complete additional background checks.',
      },
      {
        question: 'Is my personal information safe?',
        answer: 'Yes, we take data security seriously. Your payment information is encrypted and never stored on our servers. Personal information is protected by industry-standard security measures. Read our Privacy Policy for details.',
      },
      {
        question: 'What if I have a bad experience?',
        answer: 'Contact our support team immediately if you have any issues. We have a satisfaction guarantee policy and can help resolve disputes between clients and stylists. Serious violations of our community guidelines result in account removal.',
      },
      {
        question: 'Are the reviews authentic?',
        answer: 'Yes, all reviews come from verified bookings. We have systems in place to detect and remove fake reviews. Only clients who have completed appointments can leave reviews, ensuring authenticity.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    faqs: [
      {
        question: 'Do stylists offer home services?',
        answer: 'Many stylists offer home services where they come to your location. Look for the "Home Service" badge on profiles. Home services may have additional fees for travel time and expenses.',
      },
      {
        question: 'What services are available?',
        answer: 'We cover all hair services including braids, cornrows, twists, locs, wigs, hair coloring, relaxing, natural hair styling, treatments, haircuts for all hair types, hair extensions, bridal styling, and more.',
      },
      {
        question: 'Can I request a custom service?',
        answer: 'Yes, you can message a stylist directly through their profile to discuss custom requests. Many stylists offer consultations to help determine the best service for your needs.',
      },
      {
        question: 'How do I know if a stylist is right for me?',
        answer: 'Review their portfolio, read client reviews, check their specializations, and consider their experience level. Many stylists offer free phone consultations - don\'t hesitate to reach out before booking.',
      },
    ],
  },
]

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const [activeCategory, setActiveCategory] = useState('booking')

  const filteredFAQs = faqCategories.find(c => c.id === activeCategory)?.faqs.filter(faq =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  ) || []

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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
              Find answers to common questions about using GlamBook.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-12 w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <nav className="sticky top-24 space-y-1">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setExpandedFAQ(null)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-6">
                  {faqCategories.find(c => c.id === activeCategory)?.title}
                </h2>

                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-secondary-600 dark:text-secondary-400">
                      No FAQs found for your search.
                    </p>
                  </div>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-secondary-800 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                        className="w-full text-left px-6 py-4 flex items-start justify-between gap-4"
                      >
                        <span className="font-medium text-secondary-900 dark:text-white">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-secondary-400 flex-shrink-0 transition-transform ${
                            expandedFAQ === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {expandedFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-6 pb-4 text-secondary-600 dark:text-secondary-400">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help? */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Our support team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <Link to="/contact" className="btn-primary btn-lg">
              Contact Support
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
