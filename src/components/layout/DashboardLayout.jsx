import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Calendar, MessageSquare, Heart, Settings,
  User, Bell, Menu, X, ChevronLeft, LogOut, HelpCircle
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Navbar from './Navbar'

const sidebarLinks = {
  customer: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', href: '/bookings', icon: Calendar },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Favorites', href: '/favorites', icon: Heart },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  stylist: [
    { name: 'Dashboard', href: '/stylist/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', href: '/stylist/bookings', icon: Calendar },
    { name: 'Calendar', href: '/stylist/calendar', icon: Calendar },
    { name: 'Services', href: '/stylist/services', icon: Settings },
    { name: 'Portfolio', href: '/stylist/portfolio', icon: User },
    { name: 'Messages', href: '/messages', icon: MessageSquare },
    { name: 'Reviews', href: '/stylist/reviews', icon: User },
    { name: 'Earnings', href: '/stylist/earnings', icon: Settings },
    { name: 'Profile', href: '/stylist/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Customers', href: '/admin/customers', icon: User },
    { name: 'Stylists', href: '/admin/stylists', icon: User },
    { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { name: 'Payments', href: '/admin/payments', icon: Settings },
    { name: 'Reviews', href: '/admin/reviews', icon: User },
    { name: 'Support', href: '/admin/support', icon: HelpCircle },
    { name: 'Service Categories', href: '/admin/categories', icon: Settings },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ],
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { profile, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const role = profile?.role || 'customer'
  const links = sidebarLinks[role] || sidebarLinks.customer

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-800 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary-600 rounded-xl">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-display font-semibold text-secondary-900 dark:text-white">
              GlamBook
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive(link.href)
                  ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 font-medium'
                  : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary-200 dark:border-secondary-800">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-secondary-900 dark:text-white">
                {links.find(l => isActive(l.href))?.name || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/notifications"
                className="relative p-2 rounded-lg text-secondary-600 hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-secondary-800"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
              </Link>
              <Link
                to={role === 'stylist' ? '/stylist/profile' : role === 'admin' ? '/admin/settings' : '/profile'}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700"
              >
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium">{profile?.full_name?.[0] || 'U'}</span>
                  )}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-secondary-700 dark:text-secondary-300">
                  {profile?.full_name?.split(' ')[0] || 'User'}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
