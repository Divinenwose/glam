import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Scissors, Shield, Clock, Star, Heart, Phone, Mail,
  MapPin, Sparkles, Users, CreditCard, Award, Check,
  ChevronRight, ArrowRight
} from 'lucide-react'
import SearchBar from '../components/ui/SearchBar'
import { StylistCard } from '../components/ui/StylistCard'
import { ReviewCard } from '../components/ui/ReviewCard'
import { SERVICE_CATEGORIES } from '../constants'
import { motion as m } from 'framer-motion'

const featuredStylists = [
  {
    id: '1',
    name: 'Jasmine Williams',
    title: 'Braiding Specialist',
    city: 'New York',
    rating: 4.9,
    review_count: 128,
    experience_years: 8,
    starting_price: 85,
    specializations: ['Braids', 'Cornrows', 'Twists'],
    is_verified: true,
    image: 'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    title: 'Master Barber',
    city: 'Los Angeles',
    rating: 4.8,
    review_count: 95,
    experience_years: 12,
    starting_price: 45,
    specializations: ["Men's Haircuts", 'Fades', 'Beard Trim'],
    is_verified: true,
    image: 'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    name: 'Amara Chen',
    title: 'Hair Colorist',
    city: 'Chicago',
    rating: 4.95,
    review_count: 156,
    experience_years: 6,
    starting_price: 120,
    specializations: ['Hair Coloring', 'Balayage', 'Highlights'],
    is_verified: true,
    image: 'https://images.pexels.com/photos/1747539/pexels-photo-1747539.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    name: 'Kofi Asante',
    title: 'Natural Hair Expert',
    city: 'Houston',
    rating: 4.85,
    review_count: 72,
    experience_years: 5,
    starting_price: 75,
    specializations: ['Natural Hair', 'Locs', 'Hair Treatment'],
    is_verified: true,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

const popularHairstyles = [
  { name: 'Braids', image: 'https://images.pexels.com/photos/1654748/pexels-photo-1654748.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Cornrows', image: 'https://images.pexels.com/photos/3993309/pexels-photo-3993309.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Locs', image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Fade', image: 'https://images.pexels.com/photos/1709530/pexels-photo-1709530.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Balayage', image: 'https://images.pexels.com/photos/1529036/pexels-photo-1529036.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { name: 'Bridal Hair', image: 'https://images.pexels.com/photos/1529036/pexels-photo-1529036.jpeg?auto=compress&cs=tinysrgb&w=400' },
]

const reviews = [
  {
    id: '1',
    rating: 5,
    comment: "Jasmine did an amazing job with my box braids! She was professional, on time, and the braids turned out perfectly. I've already recommend her to all my friends.",
    created_at: '2024-01-15',
    customer: { full_name: 'Aisha M.', avatar_url: null },
  },
  {
    id: '2',
    rating: 5,
    comment: "Best haircut I've ever had. Marcus really knows his craft. The attention to detail is unmatched. Definitely booking again!",
    created_at: '2024-01-10',
    customer: { full_name: 'David K.', avatar_url: null },
  },
  {
    id: '3',
    rating: 5,
    comment: 'Amara transformed my hair with the most beautiful balayage. The color is exactly what I wanted. Highly recommend for anyone looking for color services.',
    created_at: '2024-01-08',
    customer: { full_name: 'Sarah L.', avatar_url: null },
  },
]

const faqs = [
  {
    question: 'How do I book a hairstylist?',
    answer: 'Simply search for stylists in your area, browse their profiles and services, select your preferred date and time, and complete the booking. You\'ll receive confirmation once the stylist accepts.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, bank transfers, and wallet payments. Some stylists also accept cash payments directly.',
  },
  {
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'Yes, we offer a satisfaction guarantee. If the service doesn\'t meet expectations, contact us within 24 hours for a review and possible refund.',
  },
  {
    question: 'How do stylists get verified?',
    answer: 'Stylists undergo a verification process including ID verification, portfolio review, and skill assessment to ensure quality and safety.',
  },
]

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All stylists are thoroughly verified with ID checks, portfolio reviews, and background checks for your safety.',
  },
  {
    icon: Star,
    title: 'Quality Guaranteed',
    description: 'We stand behind our stylists. If you\'re not satisfied, we\'ll work to make it right.',
  },
  {
    icon: Clock,
    title: 'Easy Booking',
    description: 'Book your next appointment in minutes with real-time availability and instant confirmation.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Your payments are protected with industry-standard encryption and fraud protection.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Search & Discover',
    description: 'Browse verified hairstylists in your area by location, service, rating, and price.',
  },
  {
    number: '02',
    title: 'Choose Your Stylist',
    description: 'View portfolios, reviews, and services to find the perfect match for your needs.',
  },
  {
    number: '03',
    title: 'Book & Pay',
    description: 'Select your preferred time, book securely, and pay with your favorite payment method.',
  },
  {
    number: '04',
    title: 'Get Styled',
    description: 'Enjoy your appointment! Rate and review to help others find great stylists.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-secondary-950 dark:to-secondary-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/30 dark:bg-accent-900/20 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Over 10,000+ Verified Hairstylists
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary-900 dark:text-white mb-6 leading-tight">
                Find Your Perfect
                <span className="text-gradient block">Hairstylist Today</span>
              </h1>

              <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-400 mb-8 max-w-2xl mx-auto">
                Connect with verified beauty professionals in your area. Browse portfolios, read reviews, and book your next appointment with confidence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <SearchBar />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-10 text-secondary-600 dark:text-secondary-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success-500" />
                <span className="text-sm">Verified Stylists</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning-500" />
                <span className="text-sm">4.8 Avg Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-500" />
                <span className="text-sm">Secure Payments</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              How GlamBook Works
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              Book your next hairstyle in four simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 h-full">
                  <span className="text-5xl font-bold text-primary-500 dark:text-primary-400/70">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stylists */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-2">
                Featured Stylists
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                Top-rated professionals in your area
              </p>
            </div>
            <Link to="/stylists" className="btn-outline hidden md:inline-flex">
              View All Stylists
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {featuredStylists.map((stylist, index) => (
              <StylistCard key={stylist.id} stylist={stylist} index={index} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/stylists" className="btn-outline">
              View All Stylists
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Hairstyles */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Popular Hairstyles
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Discover trending styles from our talented stylists
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularHairstyles.map((style, index) => (
              <motion.div
                key={style.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/stylists?service=${encodeURIComponent(style.name)}`}
                  className="group block relative overflow-hidden rounded-2xl aspect-square"
                >
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-center">{style.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-600 dark:text-primary-400 font-medium text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mt-2 mb-6">
                The Smart Way to Find Your Hairstylist
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                We connect you with verified beauty professionals, ensuring quality, safety, and convenience every step of the way.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 h-fit">
                      <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Stylist at work"
                  className="rounded-2xl w-full h-64 object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Barber styling"
                  className="rounded-2xl w-full h-64 object-cover mt-8"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-secondary-800 rounded-2xl shadow-soft-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary-600">10K+</div>
                  <div>
                    <p className="font-semibold text-secondary-900 dark:text-white">Happy Clients</p>
                    <p className="text-sm text-secondary-500">Across 50+ cities</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              Real experiences from real clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Stylist CTA */}
      <section className="section bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-900 dark:to-primary-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Join Our Community of Stylists
              </h2>
              <p className="text-lg text-primary-100 mb-8">
                Grow your business, reach new clients, and manage your schedule with ease. Join thousands of stylists who trust GlamBook.
              </p>
              <ul className="space-y-4 mb-8">
                {['Create your free profile', 'Showcase your portfolio', 'Accept bookings 24/7', 'Earn competitive rates'].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary-200" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/become-stylist" className="px-4 py-2 flex items-center justify-center gap-2 rounded-full bg-white text-primary-700 hover:bg-primary-50">
                Become a Stylist
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <img
                src="https://images.pexels.com/photos/1747539/pexels-photo-1747539.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional stylist"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                Got questions? We've got answers.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white dark:bg-secondary-800 rounded-xl overflow-hidden"
                  open={index === 0}
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="font-semibold text-secondary-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-secondary-400 rotate-0 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-secondary-600 dark:text-secondary-400">
                    {faq.answer}
                  </div>
                </motion.details>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                Still have questions?
              </p>
              <Link to="/contact" className="btn-primary">
                Contact Our Support Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
              Subscribe to get the latest tips, trends, and exclusive offers delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="text-sm text-secondary-500 dark:text-secondary-500 mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
