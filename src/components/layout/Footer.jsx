import { Link } from 'react-router-dom'
import { Scissors, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Safety', href: '/safety' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
  community: [
    { name: 'Find Stylists', href: '/stylists' },
    { name: 'Become a Stylist', href: '/become-stylist' },
    { name: 'Stylist Resources', href: '/resources' },
    { name: 'Partner Program', href: '/partners' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold-500/25 text-neutral-300 bg-[#0A0508]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-burgundy-700/25 blur-3xl animate-drift" />
        <div className="absolute -bottom-40 right-0 w-[420px] h-[420px] rounded-full bg-gold-500/10 blur-3xl animate-drift-slow" />
      </div>
      <div className="container-custom relative py-14 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700">
                <Scissors className="w-5 h-5 text-burgundy-950" />
              </div>
              <span className="text-2xl font-display font-semibold text-white">
                Glam<span className="text-gradient">Book</span>
              </span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-xs">
              Connecting beauty professionals with clients seeking exceptional hairstyling services.
            </p>
            <div className="space-y-2">
              <a href="mailto:hello@glambook.com" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-gold-300">
                <Mail className="w-4 h-4" />
                hello@glambook.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-sm text-neutral-400 hover:text-gold-300">
                <Phone className="w-4 h-4" />
                (123) 456-7890
              </a>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin className="w-4 h-4" />
                New York, NY 10001
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display text-lg text-gold-300 mb-5">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-400 hover:text-gold-300 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-display text-lg text-gold-300 mb-5">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-400 hover:text-gold-300 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-display text-lg text-gold-300 mb-5">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-400 hover:text-gold-300 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-display text-lg text-gold-300 mb-5">Community</h3>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-400 hover:text-gold-300 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
          <div className="mt-12 pt-8 border-t border-gold-500/15">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl text-white mb-1">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-neutral-400">
                Get the latest updates, tips, and exclusive offers.
              </p>
            </div>
              <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1 lg:w-80"
              />
              <button type="submit" className="btn-gold whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gold-500/15">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} GlamBook. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2.5 rounded-xl border border-gold-500/20 text-neutral-400 hover:text-burgundy-950 hover:bg-gold-400 hover:border-gold-400 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

