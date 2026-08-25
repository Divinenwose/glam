import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Scissors, ChevronDown, User, LogOut, Settings,
  Bell, Heart, Calendar, MessageSquare, LayoutDashboard
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Find Stylists', href: '/stylists' },
  { name: 'Become a Stylist', href: '/become-stylist' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, profile, signOut } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const isActive = (path) => location.pathname === path

  const handleSignOut = async () => {
    await signOut()
    setProfileOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-burgundy-100/70 bg-[rgba(250,248,243,0.95)] backdrop-blur-xl dark:border-burgundy-900/50 dark:bg-[rgba(26,22,19,0.95)]">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="p-2 bg-burgundy-700 rounded-xl"
            >
              <Scissors className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-display font-semibold text-neutral-900 dark:text-white">
              GlamBook
            </span>
          </a>

          {/* Deskhrefp Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.href)
                  ? 'text-burgundy-700 bg-burgundy-50 dark:text-gold-400 dark:bg-burgundy-900/30'
                  : 'text-neutral-700 hover:text-burgundy-800 dark:text-neutral-300 dark:hover:text-gold-400 hover:bg-burgundy-50/80 dark:hover:bg-burgundy-900/20'
                  }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle (Guests only) */}
            {!user && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-neutral-700 hover:bg-burgundy-50 dark:text-neutral-300 dark:hover:bg-burgundy-900/20"
              >
                {darkMode ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.button>
            )}

            {user ? (
              <>
                {/* Notifications */}
                <a href="/notifications" className="relative p-2 rounded-lg text-neutral-700 hover:bg-burgundy-50 dark:text-neutral-300 dark:hover:bg-burgundy-900/20">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-[#1A1614]"></span>
                </a>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-50 dark:bg-neutral-800 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20"
                  >
                    <div className="w-8 h-8 rounded-full bg-burgundy-700 text-white flex items-center justify-center">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium">{profile?.full_name?.[0] || 'U'}</span>
                      )}
                    </div>
                    <ChevronDown className="hidden lg:block w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#24201D] shadow-lg border border-neutral-200 dark:border-neutral-700 py-2"
                      >
                        <div className="px-4 py-2 border-b border-neutral-100 dark:border-neutral-700">
                          <p className="font-medium text-neutral-900 dark:text-white truncate">
                            {profile?.full_name || 'User'}
                          </p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{profile?.email}</p>
                        </div>

                        <div className="py-2">
                          <a
                            href={profile?.role === 'stylist' ? '/stylist/dashboard' : profile?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </a>
                          <a
                            href="/bookings"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20"
                          >
                            <Calendar className="w-4 h-4" />
                            Bookings
                          </a>
                          <a
                            href="/favorites"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20"
                          >
                            <Heart className="w-4 h-4" />
                            Favorites
                          </a>
                          <a
                            href="/messages"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Messages
                          </a>
                          <a
                            href="/settings"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </a>
                        </div>

                        <div className="border-t border-neutral-100 dark:border-neutral-700 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-600 dark:text-red-400 hover:bg-neutral-50 dark:hover:bg-burgundy-900/20"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <a
                  href="/login"
                  className="btn-ghost hidden sm:inline-flex"
                >
                  Sign in
                </a>
                <a
                  href="/register"
                  className="btn-primary"
                >
                  Get started
                </a>
              </div>
            )}



            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-burgundy-900/20"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#24201D] border-t border-neutral-100 dark:border-neutral-700"
          >
            <div className="container-custom py-4">
              {/* Navigation */}
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg transition-colors ${isActive(item.href)
                      ? "text-burgundy-600 bg-burgundy-50 dark:text-gold-400 dark:bg-burgundy-900/30"
                      : "text-neutral-600 dark:text-neutral-300"
                      }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Auth buttons */}
              {!user && (
                <div className="mt-6 space-y-3 border-t border-neutral-200 dark:border-neutral-700 pt-4">
                  <a
                    href="/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center py-3 rounded-xl border border-burgundy-200 dark:border-neutral-600 text-burgundy-700 dark:text-burgundy-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20 transition"
                  >
                    Sign In
                  </a>

                  <a
                    href="/register"
                    onClick={closeMobileMenu}
                    className="block w-full text-center py-3 rounded-xl bg-burgundy-700 text-white font-semibold hover:bg-burgundy-800 dark:bg-burgundy-600 dark:hover:bg-burgundy-700 transition"
                  >
                    Get Started
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

