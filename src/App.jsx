import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PublicLayout, DashboardLayout } from './components/layout'
import { LoadingSpinner } from './components/ui'
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";


// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const StylistsPage = lazy(() => import('./pages/stylists/StylistsPage'))
const StylistDetailPage = lazy(() => import('./pages/stylists/StylistDetailPage'))
const BookStylistPage = lazy(() => import('./pages/stylists/BookStylistPage'))
const BecomeStylistPage = lazy(() => import('./pages/BecomeStylistPage'))

// Auth pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'))
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage'))
const RoleSelectionPage = lazy(() => import('./pages/auth/RoleSelectionPage'))

// Customer Dashboard pages
const CustomerDashboard = lazy(() => import('./pages/dashboard/CustomerDashboard'))
const BookingsPage = lazy(() => import('./pages/dashboard/BookingsPage'))
const BookingDetailPage = lazy(() => import('./pages/dashboard/BookingDetailPage'))
const FavoritesPage = lazy(() => import('./pages/dashboard/FavoritesPage'))
const MessagesPage = lazy(() => import('./pages/dashboard/MessagesPage'))
const NotificationsPage = lazy(() => import('./pages/dashboard/NotificationsPage'))
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'))
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'))
const ReviewsPage = lazy(() => import('./pages/dashboard/ReviewsPage'))
const WalletPage = lazy(() => import('./pages/dashboard/WalletPage'))

// Stylist Dashboard pages
const StylistDashboard = lazy(() => import('./pages/dashboard/stylist/StylistDashboard'))
const StylistBookingsPage = lazy(() => import('./pages/dashboard/stylist/StylistBookingsPage'))
const StylistCalendarPage = lazy(() => import('./pages/dashboard/stylist/StylistCalendarPage'))
const StylistServicesPage = lazy(() => import('./pages/dashboard/stylist/StylistServicesPage'))
const StylistPortfolioPage = lazy(() => import('./pages/dashboard/stylist/StylistPortfolioPage'))
const StylistReviewsPage = lazy(() => import('./pages/dashboard/stylist/StylistReviewsPage'))
const StylistEarningsPage = lazy(() => import('./pages/dashboard/stylist/StylistEarningsPage'))
const StylistProfilePage = lazy(() => import('./pages/dashboard/stylist/StylistProfilePage'))

// Admin Dashboard pages
const AdminDashboard = lazy(() => import('./pages/dashboard/admin/AdminDashboard'))
const AdminCustomersPage = lazy(() => import('./pages/dashboard/admin/AdminCustomersPage'))
const AdminStylistsPage = lazy(() => import('./pages/dashboard/admin/AdminStylistsPage'))
const AdminBookingsPage = lazy(() => import('./pages/dashboard/admin/AdminBookingsPage'))
const AdminPaymentsPage = lazy(() => import('./pages/dashboard/admin/AdminPaymentsPage'))
const AdminReviewsPage = lazy(() => import('./pages/dashboard/admin/AdminReviewsPage'))
const AdminSupportPage = lazy(() => import('./pages/dashboard/admin/AdminSupportPage'))
const AdminCategoriesPage = lazy(() => import('./pages/dashboard/admin/AdminCategoriesPage'))
const AdminSettingsPage = lazy(() => import('./pages/dashboard/admin/AdminSettingsPage'))

// 404 Page
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/stylists" element={<StylistsPage />} />
          <Route path="/stylists/:id" element={<StylistDetailPage />} />
          <Route path="/stylists/:id/book" element={<BookStylistPage />} />
          <Route path="/become-stylist" element={<BecomeStylistPage />} />
        </Route>

        {/* Auth routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/role" element={<RoleSelectionPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Route>

        {/* Customer Dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookings/:id" element={<BookingDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Route>

        {/* Stylist Dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/stylist/dashboard" element={<StylistDashboard />} />
          <Route path="/stylist/bookings" element={<StylistBookingsPage />} />
          <Route path="/stylist/calendar" element={<StylistCalendarPage />} />
          <Route path="/stylist/services" element={<StylistServicesPage />} />
          <Route path="/stylist/portfolio" element={<StylistPortfolioPage />} />
          <Route path="/stylist/reviews" element={<StylistReviewsPage />} />
          <Route path="/stylist/earnings" element={<StylistEarningsPage />} />
          <Route path="/stylist/profile" element={<StylistProfilePage />} />
        </Route>

        {/* Admin Dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<AdminCustomersPage />} />
          <Route path="/admin/stylists" element={<AdminStylistsPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/admin/support" element={<AdminSupportPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
