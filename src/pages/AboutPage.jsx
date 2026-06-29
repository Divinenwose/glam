import { motion } from 'framer-motion'
import { Users, Heart, Shield, Award, Target, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const teamMembers = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO & Co-Founder',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Former beauty industry executive with 15+ years of experience.',
  },
  {
    name: 'Marcus Chen',
    role: 'CTO & Co-Founder',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Tech entrepreneur passionate about building scalable platforms.',
  },
  {
    name: 'Aisha Williams',
    role: 'Head of Stylist Relations',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Former salon owner and hairstylist with deep industry connections.',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Community First',
    description: 'We believe in building genuine connections between stylists and clients, fostering a supportive community.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Every stylist is verified, every transaction is secure, and every booking is protected by our guarantee.',
  },
  {
    icon: Users,
    title: 'Inclusivity',
    description: 'We celebrate all hair types, textures, and styles. Everyone deserves access to skilled professionals.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We curate the best talent and maintain high standards for quality and professionalism.',
  },
]

const stats = [
  { value: '10K+', label: 'Verified Stylists' },
  { value: '50+', label: 'Cities Covered' },
  { value: '100K+', label: 'Happy Clients' },
  { value: '4.8', label: 'Average Rating' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-secondary-950 dark:to-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary-900 dark:text-white mb-6">
              Our Story
            </h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-400">
              GlamBook was born from a simple idea: everyone deserves access to skilled hairstylists who understand their unique hair needs. We're building the bridge between talent and clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-6">
                Empowering Beauty Professionals Everywhere
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-6">
                We believe that talented hairstylists deserve a platform where they can showcase their skills, grow their business, and connect with clients who appreciate their craft.
              </p>
              <p className="text-secondary-600 dark:text-secondary-400">
                At the same time, clients deserve access to verified, skilled professionals who can bring their hair visions to life. We make this connection seamless, safe, and satisfying for everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 text-sm font-medium mb-4">
                <Eye className="w-4 h-4" />
                Our Vision
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-6">
                A World Where Beauty Has No Barriers
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-6">
                We envision a future where finding the perfect hairstylist is as easy as a tap on your phone, regardless of where you live or your hair type.
              </p>
              <p className="text-secondary-600 dark:text-secondary-400">
                By breaking down barriers and creating equal opportunities, we're building a more inclusive and connected beauty community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-600 dark:bg-primary-900">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              These principles guide everything we do at GlamBook.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-secondary-800 rounded-2xl p-6 text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 mb-4">
                  <value.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              The passionate people behind GlamBook.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white mb-4">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
              Whether you're looking for a stylist or ready to grow your business, we're here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/stylists" className="btn-primary btn-lg">
                Find a Stylist
              </Link>
              <Link to="/become-stylist" className="btn-outline btn-lg">
                Become a Stylist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
