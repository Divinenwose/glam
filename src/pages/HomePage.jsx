import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield, Clock, Star, Sparkles, CreditCard, Check,
  ChevronRight, ChevronDown, ArrowRight, Scissors, Users, MapPin, Heart,
} from 'lucide-react'
import SearchBar from '../components/ui/SearchBar'
import { StylistCard } from '../components/ui/StylistCard'
import { ReviewCard } from '../components/ui/ReviewCard'
import {
  Reveal, Stagger, StaggerItem, SplitWords, Counter, Marquee,
  SpotlightCard, Parallax, Float, Sparkles as SparkleField,
} from '../components/motion'

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

const marqueeItems = [
  'Box Braids', 'Silk Press', 'Balayage', 'Locs', 'Bridal Styling', 'Fades',
  'Knotless Braids', 'Color Correction', 'Natural Hair', 'Cornrows', 'Twists', 'Updos',
]

const stats = [
  { to: 10000, suffix: '+', label: 'Verified Stylists', icon: Scissors },
  { to: 250000, suffix: '+', label: 'Appointments Booked', icon: Heart },
  { to: 50, suffix: '+', label: 'Cities Served', icon: MapPin },
  { to: 4.8, decimals: 1, suffix: '/5', label: 'Average Rating', icon: Star },
]

function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  return (
    <Reveal className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-2xl mb-14 ${className}`}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-3xl md:text-5xl font-display font-semibold text-white leading-[1.1] mt-3">{title}</h2>
      {subtitle && <p className="text-lg text-neutral-300 mt-5 leading-relaxed">{subtitle}</p>}
    </Reveal>
  )
}

function FaqItem({ faq, open, onToggle, index }) {
  return (
    <Reveal delay={index * 0.08} y={20}>
      <div
        className={`rounded-2xl border transition-all duration-500 ${
          open ? 'border-gold-500/50 bg-white/[0.04] shadow-gold' : 'border-gold-500/15 bg-white/[0.02] hover:border-gold-500/35'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 p-6 text-left"
          aria-expanded={open}
        >
          <h3 className="font-display text-lg md:text-xl text-white">{faq.question}</h3>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.4 }}
            className={`flex-shrink-0 p-2 rounded-full border ${open ? 'border-gold-400 text-gold-300' : 'border-neutral-600 text-neutral-400'}`}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="px-6 pb-6 text-neutral-300 leading-relaxed">{faq.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 120])
  const heroFade = useTransform(scrollY, [0, 500], [1, 0.2])

  return (
    <div className="min-h-screen overflow-x-clip">
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden gradient-luxury noise">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full bg-burgundy-500/30 blur-[120px] animate-drift" />
          <div className="absolute -bottom-48 -left-32 w-[520px] h-[520px] rounded-full bg-gold-500/20 blur-[120px] animate-drift-slow" />
          <div className="absolute top-1/3 left-1/2 w-[380px] h-[380px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[110px] animate-drift" />
          <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        </div>
        <SparkleField count={22} />

        <div className="container-custom relative">
          <motion.div style={{ y: heroY, opacity: heroFade }} className="pt-20 pb-24 lg:pt-28 lg:pb-32">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-200 text-sm font-medium mb-8 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-gold-300" />
                Over 10,000+ Verified Hairstylists
              </motion.span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-white mb-7 leading-[1.05]">
                <SplitWords text="Find Your Perfect" delay={0.15} />
                <br />
                <span className="text-gradient">
                  <SplitWords text="Hairstylist Today" delay={0.5} />
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-lg md:text-xl text-neutral-200/90 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Connect with verified beauty professionals in your area. Browse portfolios, read reviews, and book your next appointment with confidence.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto relative"
            >
              <div className="absolute -inset-px gold-border-anim pointer-events-none" style={{ borderRadius: '1.5rem' }} aria-hidden="true" />
              <SearchBar />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-12 text-neutral-200"
            >
              {[
                { icon: Shield, text: 'Verified Stylists', color: 'text-emerald-400' },
                { icon: Star, text: '4.8 Avg Rating', color: 'text-gold-400' },
                { icon: CreditCard, text: 'Secure Payments', color: 'text-burgundy-300' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="text-sm tracking-wide">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      </section>

      {/* ───────────── Marquee ───────────── */}
      <section className="relative py-7 bg-[#0A0508] border-b border-gold-500/10">
        <Marquee speed={45}>
          {marqueeItems.map((item) => (
            <span key={item} className="flex items-center gap-12 whitespace-nowrap">
              <span className="font-display text-2xl md:text-3xl text-neutral-300/80 hover:text-gold-300 transition-colors">{item}</span>
              <Sparkles className="w-5 h-5 text-gold-500/70" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* ───────────── How it works ───────────── */}
      <section className="section-alt">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Simple & seamless"
            title="How GlamBook Works"
            subtitle="Book your next hairstyle in four effortless steps."
          />

          <Stagger className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6" gap={0.12}>
            <div className="hidden lg:block absolute top-[3.2rem] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" aria-hidden="true" />
            {steps.map((step) => (
              <StaggerItem key={step.number} className="relative">
                <SpotlightCard className="card h-full p-7 group hover:border-gold-500/45 transition-colors duration-500">
                  <span className="block text-6xl font-display font-semibold text-gradient leading-none">{step.number}</span>
                  <h3 className="text-xl font-display font-semibold text-white mt-6 mb-3">{step.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{step.description}</p>
                  <div className="mt-6 h-px w-10 bg-gold-500/60 group-hover:w-full transition-all duration-700" />
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ───────────── Featured stylists ───────────── */}
      <section className="section">
        <div className="container-custom">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="eyebrow mb-4">Handpicked talent</span>
              <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mt-3 leading-[1.1]">Featured Stylists</h2>
              <p className="text-lg text-neutral-300 mt-4">Top-rated professionals in your area</p>
            </div>
            <Link to="/stylists" className="btn-outline hidden md:inline-flex group">
              View All Stylists
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {featuredStylists.map((stylist, index) => (
              <StylistCard key={stylist.id} stylist={stylist} index={index} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link to="/stylists" className="btn-outline">
              View All Stylists
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Popular hairstyles ───────────── */}
      <section className="section-alt">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Trending now"
            title="Popular Hairstyles"
            subtitle="Discover trending styles from our talented stylists."
          />

          <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" gap={0.08}>
            {popularHairstyles.map((style, i) => (
              <StaggerItem key={style.name} y={36} className={i % 2 === 1 ? 'lg:mt-8' : ''}>
                <Link
                  to={`/stylists?service=${encodeURIComponent(style.name)}`}
                  className="group zoom-frame block relative rounded-2xl aspect-[3/4] border border-gold-500/20 hover:border-gold-400/60 transition-colors duration-500 shadow-soft"
                >
                  <img src={style.image} alt={style.name} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E080B] via-[#0E080B]/30 to-transparent" />
                  <div className="absolute inset-0 bg-burgundy-700/0 group-hover:bg-burgundy-700/25 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-display text-lg text-center">{style.name}</h3>
                    <div className="mx-auto mt-2 h-px w-6 bg-gold-400 group-hover:w-16 transition-all duration-500" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="hidden lg:block h-8" aria-hidden="true" />
        </div>
      </section>

      {/* ───────────── Why choose us ───────────── */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal x={-30} y={0}>
                <span className="eyebrow mb-4">Why choose us</span>
                <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mt-3 mb-6 leading-[1.1]">
                  The Smart Way to Find Your <span className="text-gradient">Hairstylist</span>
                </h2>
                <p className="text-lg text-neutral-300 mb-10 leading-relaxed">
                  We connect you with verified beauty professionals, ensuring quality, safety, and convenience every step of the way.
                </p>
              </Reveal>

              <Stagger className="grid sm:grid-cols-2 gap-5" gap={0.1}>
                {whyChooseUs.map((item) => (
                  <StaggerItem key={item.title}>
                    <SpotlightCard className="h-full rounded-2xl border border-gold-500/15 bg-white/[0.03] p-5 hover:border-gold-500/40 transition-colors duration-500 group">
                      <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-burgundy-600 to-burgundy-800 ring-1 ring-gold-500/30 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <item.icon className="w-6 h-6 text-gold-300" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-white mb-1.5">{item.title}</h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                    </SpotlightCard>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal x={30} y={0} className="relative">
              <div className="absolute -inset-8 rounded-full bg-burgundy-600/25 blur-3xl" aria-hidden="true" />
              <div className="relative grid grid-cols-2 gap-4">
                <Parallax offset={24}>
                  <div className="zoom-frame rounded-3xl border border-gold-500/30 shadow-soft-lg">
                    <img
                      src="https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Stylist at work"
                      loading="lazy"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                </Parallax>
                <Parallax offset={-24} className="mt-12">
                  <div className="zoom-frame rounded-3xl border border-gold-500/30 shadow-soft-lg">
                    <img
                      src="https://images.pexels.com/photos/1747539/pexels-photo-1747539.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Barber styling"
                      loading="lazy"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                </Parallax>
              </div>
              <Float amplitude={10} className="absolute -bottom-8 -left-4 sm:-left-8">
                <div className="glass rounded-2xl shadow-gold p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl sm:text-5xl font-display font-semibold text-gradient">
                      <Counter to={10} suffix="K+" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Happy Clients</p>
                      <p className="text-sm text-neutral-400">Across 50+ cities</p>
                    </div>
                  </div>
                </div>
              </Float>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── Stats band ───────────── */}
      <section className="relative py-20 gradient-beauty noise overflow-hidden border-y border-gold-500/25">
        <div className="absolute inset-0 bg-dots opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" aria-hidden="true" />
        <div className="container-custom relative">
          <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6" gap={0.12}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="inline-flex p-3 rounded-full border border-gold-500/40 bg-gold-500/10 mb-4 animate-pulse-glow">
                  <stat.icon className="w-5 h-5 text-gold-300" />
                </div>
                <div className="text-4xl md:text-5xl font-display font-semibold text-white">
                  <Counter to={stat.to} decimals={stat.decimals || 0} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gold-300/90">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ───────────── Reviews ───────────── */}
      <section className="section-alt">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Loved by clients"
            title="What Our Customers Say"
            subtitle="Real experiences from real clients."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Become a stylist ───────────── */}
      <section className="section gradient-beauty noise overflow-hidden">
        <div className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-gold-500/15 blur-3xl animate-drift pointer-events-none" aria-hidden="true" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal x={-30} y={0} className="text-white">
              <span className="eyebrow mb-4">For professionals</span>
              <h2 className="text-3xl md:text-5xl font-display font-semibold mt-3 mb-6 leading-[1.1]">
                Join Our Community of <span className="text-gradient">Stylists</span>
              </h2>
              <p className="text-lg text-neutral-200/90 mb-8 leading-relaxed">
                Grow your business, reach new clients, and manage your schedule with ease. Join thousands of stylists who trust GlamBook.
              </p>
              <ul className="space-y-4 mb-10">
                {['Create your free profile', 'Showcase your portfolio', 'Accept bookings 24/7', 'Earn competitive rates'].map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold-500/20 ring-1 ring-gold-400/60">
                      <Check className="w-3.5 h-3.5 text-gold-300" />
                    </span>
                    <span className="text-neutral-100">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <Link to="/become-stylist" className="btn-primary btn-lg group">
                Become a Stylist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>

            <Reveal x={30} y={0} className="hidden lg:block relative">
              <div className="absolute -inset-4 rounded-[2rem] border border-gold-500/30 rotate-3" aria-hidden="true" />
              <div className="zoom-frame relative rounded-[2rem] border border-gold-500/40 shadow-soft-lg">
                <img
                  src="https://images.pexels.com/photos/1747539/pexels-photo-1747539.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional stylist"
                  loading="lazy"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/70 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Good to know"
              title="Frequently Asked Questions"
              subtitle="Got questions? We've got answers."
            />
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>

            <Reveal className="text-center mt-12">
              <p className="text-neutral-300 mb-5">Still have questions?</p>
              <Link to="/contact" className="btn-primary">
                Contact Our Support Team
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── Newsletter ───────────── */}
      <section className="section-alt">
        <div className="container-custom">
          <Reveal scale={0.96} className="relative max-w-3xl mx-auto text-center rounded-[2rem] gradient-luxury noise overflow-hidden border border-gold-500/30 p-10 md:p-16 shadow-gold">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gold-500/20 blur-3xl animate-drift pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <span className="eyebrow mb-4">The GlamBook letter</span>
              <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mt-3 mb-4 leading-[1.1]">Stay in the Loop</h2>
              <p className="text-lg text-neutral-200/90 mb-8">
                Subscribe to get the latest tips, trends, and exclusive offers delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" className="input flex-1" aria-label="Email address" />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe Now
                </button>
              </form>
              <p className="text-sm text-neutral-400 mt-5">No spam, ever. Unsubscribe anytime.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
