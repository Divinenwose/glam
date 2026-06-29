import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Globe, Bell, Shield, Database } from 'lucide-react'
import { Card, Button } from '../../../components/ui'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          System Settings
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Configure platform-wide settings and preferences.
        </p>
      </motion.div>

      {/* Settings Cards */}
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <Database className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Database Settings</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Configure database backups, maintenance, and storage settings.
              </p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-accent-100 dark:bg-accent-900/30">
              <Globe className="w-6 h-6 text-accent-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Platform Settings</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Configure supported cities, currencies, and languages.
              </p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-warning-100 dark:bg-warning-900/30">
              <Bell className="w-6 h-6 text-warning-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Notifications</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Configure email templates and notification settings.
              </p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-success-100 dark:bg-success-900/30">
              <Shield className="w-6 h-6 text-success-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-secondary-900 dark:text-white">Security & Compliance</h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Configure two-factor authentication, session settings, and compliance.
              </p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
