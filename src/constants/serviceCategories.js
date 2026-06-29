export const SERVICE_CATEGORIES = [
  { id: 'braids', name: 'Braids', icon: 'Sparkles' },
  { id: 'cornrows', name: 'Cornrows', icon: 'Grid3x3' },
  { id: 'twists', name: 'Twists', icon: 'RefreshCw' },
  { id: 'locs', name: 'Locs', icon: 'Infinity' },
  { id: 'wigs', name: 'Wigs', icon: 'Crown' },
  { id: 'hair-coloring', name: 'Hair Coloring', icon: 'Palette' },
  { id: 'hair-relaxing', name: 'Hair Relaxing', icon: 'Wind' },
  { id: 'natural-hair', name: 'Natural Hair', icon: 'Leaf' },
  { id: 'hair-treatment', name: 'Hair Treatment', icon: 'Heart' },
  { id: 'kids-hair', name: 'Kids Hair', icon: 'Baby' },
  { id: 'mens-haircuts', name: "Men's Haircuts", icon: 'Scissors' },
  { id: 'womens-haircuts', name: "Women's Haircuts", icon: 'Scissors' },
  { id: 'hair-extensions', name: 'Hair Extensions', icon: 'Layers' },
  { id: 'bridal-hair', name: 'Bridal Hair', icon: 'Gem' },
  { id: 'hair-wash', name: 'Hair Wash', icon: 'Droplets' },
  { id: 'hair-styling', name: 'Hair Styling', icon: 'Wand2' },
]

export const SERVICE_TYPES = [
  { id: 'home-service', name: 'Home Service', icon: 'Home' },
  { id: 'salon-visit', name: 'Salon Visit', icon: 'Store' },
]

export const PRICE_RANGES = [
  { id: 'budget', label: 'Budget', min: 0, max: 50 },
  { id: 'mid-range', label: 'Mid-Range', min: 50, max: 150 },
  { id: 'premium', label: 'Premium', min: 150, max: 500 },
  { id: 'luxury', label: 'Luxury', min: 500, max: null },
]

export const RATING_OPTIONS = [
  { value: 5, label: '5 Stars Only' },
  { value: 4, label: '4+ Stars' },
  { value: 3, label: '3+ Stars' },
  { value: 2, label: '2+ Stars' },
  { value: 1, label: 'Any Rating' },
]

export const EXPERIENCE_LEVELS = [
  { value: 1, label: '1+ years' },
  { value: 3, label: '3+ years' },
  { value: 5, label: '5+ years' },
  { value: 10, label: '10+ years' },
]

export const DISTANCE_OPTIONS = [
  { value: 5, label: 'Within 5 km' },
  { value: 10, label: 'Within 10 km' },
  { value: 25, label: 'Within 25 km' },
  { value: 50, label: 'Within 50 km' },
  { value: null, label: 'Any distance' },
]

export const AVAILABILITY_OPTIONS = [
  { id: 'today', label: 'Available Today' },
  { id: 'tomorrow', label: 'Available Tomorrow' },
  { id: 'this-week', label: 'This Week' },
  { id: 'weekend', label: 'Weekend' },
]
