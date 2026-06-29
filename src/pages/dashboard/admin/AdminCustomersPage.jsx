import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MoreVertical, Check, X, AlertTriangle, User } from 'lucide-react'
import { Card, Badge, Avatar, Button } from '../../../components/ui'

const mockCustomers = [
  { id: 1, name: 'Aisha M.', email: 'aisha@example.com', bookings: 12, spend: 1200, status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Patricia L.', email: 'patricia@example.com', bookings: 8, spend: 850, status: 'active', joined: '2024-01-10' },
  { id: 3, name: 'Tanya W.', email: 'tanya@example.com', bookings: 5, spend: 500, status: 'inactive', joined: '2023-12-20' },
  { id: 4, name: 'Sarah K.', email: 'sarah@example.com', bookings: 25, spend: 2500, status: 'active', joined: '2023-11-05' },
]

export default function AdminCustomersPage() {
  const [customers] = useState(mockCustomers)
  const [search, setSearch] = useState('')

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Customer Management
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          View and manage all customer accounts.
        </p>
      </motion.div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Customers Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 dark:bg-secondary-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Total Spend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-800">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={customer.name} size="sm" />
                      <div>
                        <p className="font-medium text-secondary-900 dark:text-white">{customer.name}</p>
                        <p className="text-sm text-secondary-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">{customer.bookings}</td>
                  <td className="px-6 py-4 text-secondary-900 dark:text-white">${customer.spend.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={customer.status === 'active' ? 'success' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">
                    {new Date(customer.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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
