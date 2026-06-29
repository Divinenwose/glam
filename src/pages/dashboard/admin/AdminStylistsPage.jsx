import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MoreVertical, Check, X, Star, AlertTriangle } from 'lucide-react'
import { Card, Badge, Avatar, Button } from '../../../components/ui'

const mockStylists = [
  { id: 1, name: 'Jasmine Williams', email: 'jasmine@example.com', services: 5, rating: 4.9, earnings: 15000, status: 'verified', joined: '2023-06-15' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus@example.com', services: 4, rating: 4.8, earnings: 12000, status: 'verified', joined: '2023-07-10' },
  { id: 3, name: 'Kofi Asante', email: 'kofi@example.com', services: 3, rating: 4.85, earnings: 8000, status: 'pending', joined: '2024-02-01' },
  { id: 4, name: 'Taylor Smith', email: 'taylor@example.com', services: 6, rating: 4.92, earnings: 20000, status: 'verified', joined: '2023-05-20' },
]

export default function AdminStylistsPage() {
  const [stylists] = useState(mockStylists)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredStylists = stylists.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || s.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Stylist Management
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Approve, suspend, and manage hairstylist accounts.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search stylists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'verified', 'pending', 'suspended'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stylists Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Stylist</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Services</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredStylists.map((stylist) => (
                <tr key={stylist.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={stylist.name} size="sm" />
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-white">{stylist.name}</p>
                        <p className="text-sm text-secondary-500">{stylist.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{stylist.services}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-warning-500">
                      <Star className="w-4 h-4 fill-warning-500" />
                      <span>{stylist.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">${stylist.earnings.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      stylist.status === 'verified' ? 'success' :
                      stylist.status === 'pending' ? 'warning' : 'error'
                    }>
                      {stylist.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">
                    {new Date(stylist.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {stylist.status === 'pending' && (
                        <>
                          <Button variant="success" size="sm">Approve</Button>
                          <Button variant="outline" size="sm">Reject</Button>
                        </>
                      )}
                      {stylist.status === 'verified' && (
                        <Button variant="ghost" size="sm" className="text-error-500">Suspend</Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
