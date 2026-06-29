import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Star, Clock, Award, Home, Store,
  Heart, MessageSquare, Calendar, Share2, Check,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { Button, Card, Badge, Avatar, ReviewCard } from '../../components/ui'
import { formatCurrency } from '../../utils/helpers'
import { useAuth } from '../../context/AuthContext'

const mockStylist = {
  id: '1',
  name: 'Jasmine Williams',
  title: 'Braiding Specialist',
  bio: 'With over 8 years of experience specializing in braids and protective styles, I am passionate about helping clients achieve their hair goals while maintaining the health of their natural hair. I have worked with clients of all hair textures and types, and I take pride in creating customized looks that enhance your natural beauty.',
  city: 'New York',
  address: '123 Beauty Lane, Suite 4B, New York, NY 10001',
  rating: 4.9,
  review_count: 128,
  experience_years: 8,
  starting_price: 85,
  specializations: ['Braids', 'Cornrows', 'Twists', 'Box Braids', 'Knotless Braids', 'Goddess Locs'],
  certifications: ['Licensed Cosmetologist', 'Braiding Certified', 'Hair Care Specialist'],
  portfolio_images: [
    'https://images.pexels.com/photos/1654748/pexels-photo-1654748.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993309/pexels-photo-3993309.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  is_verified: true,
  offers_home_service: true,
  offers_salon_service: true,
  image: 'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=800',
  working_hours: {
    monday: { start: '09:00', end: '18:00' },
    tuesday: { start: '09:00', end: '18:00' },
    wednesday: { start: '09:00', end: '18:00' },
    thursday: { start: '09:00', end: '18:00' },
    friday: { start: '09:00', end: '20:00' },
    saturday: { start: '10:00', end: '17:00' },
    sunday: null,
  },
  services: [
    { id: 1, name: 'Box Braids', description: 'Classic box braids using high-quality synthetic hair.', price: 150, duration_minutes: 240, service_type: 'both' },
    { id: 2, name: 'Knotless Braids', description: 'Tension-free knotless braids for a natural look.', price: 180, duration_minutes: 270, service_type: 'both' },
    { id: 3, name: 'Cornrows', description: 'Neat cornrows in various patterns and styles.', price: 85, duration_minutes: 120, service_type: 'both' },
    { id: 4, name: 'Goddess Locs', description: 'Beautiful goddess locs with wavy ends.', price: 250, duration_minutes: 300, service_type: 'salon' },
    { id: 5, name: 'Spring Twists', description: 'Lightweight spring twists for a bouncy look.', price: 120, duration_minutes: 180, service_type: 'both' },
  ],
  reviews: [
    { id: 1, rating: 5, comment: 'Jasmine did an amazing job with my box braids! They look so natural and lasted for months. Highly recommend!', created_at: '2024-01-15', customer: { full_name: 'Aisha M.', avatar_url: null } },
    { id: 2, rating: 5, comment: 'Best stylist I have ever worked with. Professional, on time, and talented!', created_at: '2024-01-10', customer: { full_name: 'Patricia L.', avatar_url: null } },
    { id: 3, rating: 4, comment: 'Great work on my cornrows. The salon is clean and welcoming.', created_at: '2024-01-05', customer: { full_name: 'Tanya W.', avatar_url: null } },
  ],
}

export default function StylistDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('services')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [stylist] = useState(mockStylist)

  const handleBookNow = () => {
    navigate(`/stylists/${id}/book`)
  }

  const handleContact = () => {
    navigate('/messages', { state: { stylistId: id } })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % stylist.portfolio_images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + stylist.portfolio_images.length) % stylist.portfolio_images.length)
  }

  return (
    <div className="bg-secondary-50 dark:bg-secondary-950 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="container-custom p-6">
          <Link to="/stylists" className="flex items-center gap-1 text-primary-600 hover:text-primary-700">
            <ChevronLeft className="w-4 h-4" />
            Back to search
          </Link>
        </div>
      </div>

      <div className="container-custom mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Image Slider */}
                  <div className="w-full lg:w-1/3 relative">
                    <div className="h-72 sm:aspect-square overflow-hidden">
                      <img
                        src={stylist.portfolio_images[currentImageIndex]}
                        alt={stylist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {stylist.portfolio_images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {stylist.portfolio_images.map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${i === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div className="w-full lg:w-2/3 p-4 sm:p-9">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                            {stylist.name}
                          </h1>
                          {stylist.is_verified && (
                            <Badge variant="success" className="gap-1">
                              <Check className="w-3 h-3" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-secondary-600 dark:text-secondary-400">
                          {stylist.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-warning-500">
                        <Star className="w-5 h-5 fill-warning-500" />
                        <span className="text-lg font-semibold">{stylist.rating}</span>
                        <span className="text-sm text-secondary-500">({stylist.review_count})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4 text-secondary-600 dark:text-secondary-400 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {stylist.city}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {stylist.experience_years}+ years
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {stylist.certifications.length} certifications
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {stylist.specializations.slice(0, 4).map((spec) => (
                        <Badge key={spec} variant="primary">{spec}</Badge>
                      ))}
                      {stylist.specializations.length > 4 && (
                        <Badge variant="secondary">+{stylist.specializations.length - 4}</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {stylist.offers_home_service && (
                        <Badge variant="primary" className="gap-1">
                          <Home className="w-3 h-3" />
                          Home Service
                        </Badge>
                      )}
                      {stylist.offers_salon_service && (
                        <Badge variant="secondary" className="gap-1">
                          <Store className="w-3 h-3" />
                          Salon Visit
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Tabs */}
            <div className="border-b border-secondary-200 dark:border-secondary-700">
              <div className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {['services', 'portfolio', 'reviews', 'about'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 shrink-0 capitalize font-medium transition-colors ${activeTab === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {activeTab === 'services' && (
                <div className="space-y-4">
                  {stylist.services.map((service) => (
                    <Card key={service.id} className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-secondary-900 dark:text-white">{service.name}</h3>
                          {service.description && (
                            <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">{service.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-sm text-secondary-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {service.duration_minutes} min
                            </span>
                            {service.service_type === 'home' && (
                              <span className="flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                Home
                              </span>
                            )}
                            {service.service_type === 'salon' && (
                              <span className="flex items-center gap-1">
                                <Store className="w-4 h-4" />
                                Salon
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-xl font-bold text-primary-600">{formatCurrency(service.price)}</p>
                          <Button
                            size="sm"
                            onClick={handleBookNow}
                            className="mt-2 w-full sm:w-auto"
                          >
                            Book
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {stylist.portfolio_images.map((img, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {stylist.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}

              {activeTab === 'about' && (
                <Card className="p-6">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-4">About Me</h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-6">{stylist.bio}</p>

                  <h4 className="font-medium text-secondary-900 dark:text-white mb-3">Certifications</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {stylist.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary">{cert}</Badge>
                    ))}
                  </div>

                  <h4 className="font-medium text-secondary-900 dark:text-white mb-3">Location</h4>
                  <p className="text-secondary-600 dark:text-secondary-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {stylist.address}
                  </p>
                </Card>
              )}
            </motion.div>
          </div>

          {/* Right - Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4 lg:sticky lg:top-24">
              {/* Booking Card */}
              <Card className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-secondary-500">Starting at</span>
                  <p className="text-3xl font-bold text-secondary-900 dark:text-white">
                    {formatCurrency(stylist.starting_price)}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button onClick={handleBookNow} className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" onClick={handleContact} className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" size="icon" className="flex-1">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="flex-1">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              {/* Working Hours */}
              <Card className="p-6">
                <h3 className="font-semibold text-secondary-900 dark:text-white mb-4">Working Hours</h3>
                <div className="space-y-3 text-sm">
                  {Object.entries(stylist.working_hours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="capitalize text-secondary-600 dark:text-secondary-400">{day}</span>
                      <span className="text-secondary-900 dark:text-white">
                        {hours ? `${hours.start} - ${hours.end}` : 'Closed'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
