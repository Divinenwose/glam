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
    <nav className="sticky top-0 z-50 glass">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="p-2 bg-primary-600 rounded-xl"
            >
              <Scissors className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-display font-semibold text-secondary-900 dark:text-white">
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
                  ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800'
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
                className="p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800"
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
                <a href="/notifications" className="relative p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
                </a>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium">{profile?.full_name?.[0] || 'U'}</span>
                      )}
                    </div>
                    <ChevronDown className="hidden lg:block w-4 h-4 text-secondary-600 dark:text-secondary-300" />
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-secondary-900 shadow-lg border border-secondary-200 dark:border-secondary-700 py-2"
                      >
                        <div className="px-4 py-2 border-b border-secondary-100 dark:border-secondary-800">
                          <p className="font-medium text-secondary-900 dark:text-white truncate">
                            {profile?.full_name || 'User'}
                          </p>
                          <p className="text-sm text-secondary-500 truncate">{profile?.email}</p>
                        </div>

                        <div className="py-2">
                          <a
                            href={profile?.role === 'stylist' ? '/stylist/dashboard' : profile?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </a>
                          <a
                            href="/bookings"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800"
                          >
                            <Calendar className="w-4 h-4" />
                            Bookings
                          </a>
                          <a
                            href="/favorites"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800"
                          >
                            <Heart className="w-4 h-4" />
                            Favorites
                          </a>
                          <a
                            href="/messages"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Messages
                          </a>
                          <a
                            href="/settings"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </a>
                        </div>

                        <div className="border-t border-secondary-100 dark:border-secondary-800 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-2 w-full text-left text-error-600 dark:text-error-400 hover:bg-secondary-50 dark:hover:bg-secondary-800"
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
              className="lg:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:bg-secondary-800"
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
            className="lg:hidden bg-white dark:bg-black border-t border-secondary-100 dark:border-secondary-800"
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
                      ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20"
                      : "text-secondary-600 dark:text-secondary-300"
                      }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Auth buttons */}
              {!user && (
                <div className="mt-6 space-y-3 border-t border-secondary-200 dark:border-secondary-700 pt-4">
                  <a
                    href="/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center py-3 rounded-xl border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition"
                  >
                    Sign In
                  </a>

                  <a
                    href="/register"
                    onClick={closeMobileMenu}
                    className="block w-full text-center py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
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
