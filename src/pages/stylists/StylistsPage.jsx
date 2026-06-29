import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown, MapPin } from 'lucide-react'
import { StylistHorizontalCard } from '../../components/ui/StylistCard'
import { Button, Card, Input, Select } from '../../components/ui'
import { SERVICE_CATEGORIES, RATING_OPTIONS, EXPERIENCE_LEVELS, DISTANCE_OPTIONS } from '../../constants'

const mockStylists = [
  {
    id: '1',
    name: 'Jasmine Williams',
    title: 'Braiding Specialist',
    city: 'New York',
    rating: 4.9,
    review_count: 128,
    experience_years: 8,
    starting_price: 85,
    specializations: ['Braids', 'Cornrows', 'Twists', 'Box Braids'],
    is_verified: true,
    offers_home_service: true,
    offers_salon_service: true,
    image: 'https://images.pexels.com/photos/3993312/pexels-photo-3993312.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    title: 'Master Barber',
    city: 'New York',
    rating: 4.8,
    review_count: 95,
    experience_years: 12,
    starting_price: 45,
    specializations: ["Men's Haircuts", 'Fades', 'Beard Trim', 'Lineups'],
    is_verified: true,
    offers_home_service: false,
    offers_salon_service: true,
    image: 'https://images.pexels.com/photos/1811822/pexels-photo-1811822.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    name: 'Amara Chen',
    title: 'Hair Colorist',
    city: 'Brooklyn',
    rating: 4.95,
    review_count: 156,
    experience_years: 6,
    starting_price: 120,
    specializations: ['Hair Coloring', 'Balayage', 'Highlights', 'Color Correction'],
    is_verified: true,
    offers_home_service: false,
    offers_salon_service: true,
    image: 'https://images.pexels.com/photos/1747539/pexels-photo-1747539.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    name: 'Kofi Asante',
    title: 'Natural Hair Expert',
    city: 'Queens',
    rating: 4.85,
    review_count: 72,
    experience_years: 5,
    starting_price: 75,
    specializations: ['Natural Hair', 'Locs', 'Hair Treatment', 'Twists'],
    is_verified: true,
    offers_home_service: true,
    offers_salon_service: true,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '5',
    name: 'Taylor Smith',
    title: 'Bridal Hair Specialist',
    city: 'New York',
    rating: 4.92,
    review_count: 89,
    experience_years: 10,
    starting_price: 200,
    specializations: ['Bridal Hair', 'Hair Styling', 'Updos', 'Hair Extensions'],
    is_verified: true,
    offers_home_service: true,
    offers_salon_service: false,
    image: 'https://images.pexels.com/photos/1990932/pexels-photo-1990932.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

export default function StylistsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [stylists, setStylists] = useState(mockStylists)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    service: searchParams.get("service") || "",
    rating: searchParams.get("rating") || "",
    experience: searchParams.get("experience") || "",
    distance: searchParams.get("distance") || "",
    homeService: searchParams.get("homeService") === "true",
    salonService: searchParams.get("salonService") !== "false",
    verified: searchParams.get("verified") !== "false",
  })

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setStylists(mockStylists)
      setLoading(false)
    }, 800)
  }, [])

  useEffect(() => {
    let filtered = [...mockStylists];

    // Location or stylist name
    if (filters.location) {
      const search = filters.location.toLowerCase();

      filtered = filtered.filter(
        stylist =>
          stylist.name.toLowerCase().includes(search) ||
          stylist.city.toLowerCase().includes(search)
      );
    }

    // Service
    if (filters.service) {
      filtered = filtered.filter(stylist =>
        stylist.specializations.some(service =>
          service.toLowerCase() === filters.service.toLowerCase()
        )
      );
    }

    // Rating
    if (filters.rating) {
      filtered = filtered.filter(
        stylist => stylist.rating >= Number(filters.rating)
      );
    }

    // Experience
    if (filters.experience) {
      filtered = filtered.filter(
        stylist => stylist.experience_years >= Number(filters.experience)
      );
    }

    // Home Service
    if (filters.homeService) {
      filtered = filtered.filter(
        stylist => stylist.offers_home_service
      );
    }

    // Salon Service
    if (filters.salonService) {
      filtered = filtered.filter(
        stylist => stylist.offers_salon_service
      );
    }

    // Verified
    if (filters.verified) {
      filtered = filtered.filter(
        stylist => stylist.is_verified
      );
    }

    setStylists(filtered);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
  }

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    setSearchParams(params);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      service: "",
      rating: "",
      experience: "",
      distance: "",
      homeService: false,
      salonService: true,
      verified: true,
    });

    setStylists(mockStylists);
    setSearchParams({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="bg-secondary-50 dark:bg-secondary-950 pb-12">
      {/* Search Header */}
      <div className="bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search by location or stylist name..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>
            </div>

            {/* Service Filter */}
            <div className="w-full lg:w-48">
              <select
                value={filters.service}
                onChange={(e) => handleFilterChange('service', e.target.value)}
                className="input w-full"
              >
                <option value="">All Services</option>
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Filter Button */}
            <Button
              variant="secondary"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="label">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="input"
                  >
                    <option value="">Any Rating</option>
                    {RATING_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Experience Level</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="input"
                  >
                    <option value="">Any Experience</option>
                    {EXPERIENCE_LEVELS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Distance</label>
                  <select
                    value={filters.distance}
                    onChange={(e) => handleFilterChange('distance', e.target.value)}
                    className="input"
                  >
                    {DISTANCE_OPTIONS.map((opt) => (
                      <option key={opt.label} value={opt.value || ''}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Service Type</label>
                  <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.homeService}
                        onChange={(e) => handleFilterChange('homeService', e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded"
                      />
                      <span className="text-secondary-700 dark:text-secondary-300">Home Service</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.salonService}
                        onChange={(e) => handleFilterChange('salonService', e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-secondary-300 rounded"
                      />
                      <span className="text-secondary-700 dark:text-secondary-300">Salon Visit</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button onClick={applyFilters}>Apply Filters</Button>
                <Button variant="ghost" onClick={clearFilters}>Clear All</Button>
                <Button variant="ghost" onClick={() => setShowFilters(false)}>Cancel</Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-custom mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white">
              Find Stylists
            </h1>
            <p className="text-secondary-600 dark:text-secondary-400">
              {loading ? 'Searching...' : `${stylists.length} stylists found`}
            </p>
          </div>

          <select className="input w-auto">
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full" />
          </div>
        ) : stylists.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-secondary-600 dark:text-secondary-400">
              No stylists found matching your criteria. Try adjusting your filters.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {stylists.map((stylist, index) => (
              <motion.div
                key={stylist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <StylistHorizontalCard stylist={stylist} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
