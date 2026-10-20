import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Scissors, ChevronDown, LogOut, Settings,
  Bell, Heart, Calendar, MessageSquare, LayoutDashboard, ArrowRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

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
  const [scrolled, setScrolled] = useState(false)
  const { user, profile, signOut } = useAuth()
  const location = useLocation()
  const profileRef = useRef(null)

  useEffect(() => {
    setMobileMenuOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!profileOpen) return
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [profileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const isActive = (path) => location.pathname === path

  const handleSignOut = async () => {
    await signOut()
    setProfileOpen(false)
  }

  const dashboardHref =
    profile?.role === 'stylist' ? '/stylist/dashboard' : profile?.role === 'admin' ? '/admin/dashboard' : '/dashboard'

  const menuItems = [
    { to: dashboardHref, icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/bookings', icon: Calendar, label: 'Bookings' },
    { to: '/favorites', icon: Heart, label: 'Favorites' },
    { to: '/messages', icon: MessageSquare, label: 'Messages' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(14,8,11,0.78)] backdrop-blur-xl border-b border-gold-500/20 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]'
          : 'bg-[rgba(14,8,11,0.25)] backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="container-custom">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 18, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-[0_8px_24px_-8px_rgba(212,175,55,0.7)]"
            >
              <Scissors className="w-5 h-5 text-burgundy-950" />
            </motion.div>
            <span className="text-2xl font-display font-semibold tracking-tight text-white">
              Glam<span className="text-gradient">Book</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive(item.href) ? 'text-gold-300' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-gold-300 to-gold-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/notifications"
                  className="relative p-2.5 rounded-xl text-neutral-300 hover:text-gold-300 hover:bg-white/5 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#0E080B]" />
                </Link>

                <div className="relative" ref={profileRef}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gold-500/25 bg-white/5 hover:border-gold-500/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-burgundy-500 to-burgundy-800 text-white flex items-center justify-center ring-1 ring-gold-500/40">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-sm font-medium">{profile?.full_name?.[0] || 'U'}</span>
                      )}
                    </div>
                    <ChevronDown
                      className={`hidden lg:block w-4 h-4 text-neutral-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-60 origin-top-right rounded-2xl glass shadow-soft-lg py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gold-500/15">
                          <p className="font-medium text-white truncate">{profile?.full_name || 'User'}</p>
                          <p className="text-sm text-neutral-400 truncate">{profile?.email}</p>
                        </div>

                        <div className="py-2">
                          {menuItems.map(({ to, icon: Icon, label }) => (
                            <Link
                              key={label}
                              to={to}
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-neutral-300 hover:text-gold-300 hover:bg-white/5 transition-colors"
                            >
                              <Icon className="w-4 h-4" />
                              {label}
                            </Link>
                          ))}
                        </div>

                        <div className="border-t border-gold-500/15 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-red-400 hover:bg-red-500/10 transition-colors"
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
                <Link to="/login" className="btn-ghost">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary">
                  Get started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-neutral-200 border border-gold-500/25 hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[rgba(14,8,11,0.96)] backdrop-blur-xl border-t border-gold-500/20"
          >
            <div className="container-custom py-5">
              <div className="space-y-1">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-gold-300 bg-burgundy-900/40 border border-gold-500/20'
                          : 'text-neutral-300 hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                      <ArrowRight className="w-4 h-4 opacity-50" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {!user && (
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gold-500/15 pt-5">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-outline btn-lg">
                    Sign in
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn-primary btn-lg">
                    Get started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
