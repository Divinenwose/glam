import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Lock, Globe, ChevronRight, User, Shield } from 'lucide-react'
import { Card, Button } from '../../components/ui'
import toast from 'react-hot-toast'

const settingsGroups = [
  {
    title: 'Notifications',
    icon: Bell,
    settings: [
      { id: 'email_notifications', label: 'Email Notifications', description: 'Receive updates about your bookings via email' },
      { id: 'push_notifications', label: 'Push Notifications', description: 'Receive notifications on your device' },
      { id: 'sms_notifications', label: 'SMS Notifications', description: 'Receive text message updates' },
    ],
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    settings: [
      { id: 'two_factor', label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
      { id: 'login_alerts', label: 'Login Alerts', description: 'Get notified when someone logs into your account' },
    ],
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
    two_factor: false,
    login_alerts: true,
  })

  const handleToggle = (id) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }))
    toast.success('Settings saved')
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold text-white mb-2">
          Settings
        </h1>
        <p className="text-neutral-400">
          Customize your preferences and account settings.
        </p>
      </motion.div>

      {/* Settings Groups */}
      {settingsGroups.map((group, index) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center gap-4 p-4 border-b border-neutral-700">
              <div className="p-2 rounded-lg bg-neutral-800">
                <group.icon className="w-5 h-5 text-neutral-300" />
              </div>
              <div>
                <h3 className="font-medium text-white">{group.title}</h3>
              </div>
            </div>
            <div className="divide-y divide-neutral-700">
              {group.settings.map((setting) => (
                <div
                  key={setting.id}
                  onClick={() => handleToggle(setting.id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-800"
                >
                  <div className="flex-1">
                    <p className="font-medium text-white">{setting.label}</p>
                    <p className="text-sm text-neutral-400">{setting.description}</p>
                  </div>
                  <button
                    type="button"
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      settings[setting.id] ? 'bg-burgundy-600' : 'bg-neutral-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 rounded-full bg-neutral-900 transition-transform ${
                        settings[setting.id] ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}

      {/* Account Actions */}
      <Card className="p-6">
        <h3 className="font-medium text-white mb-4">Account</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-between">
            <span>Change Password</span>
            <Lock className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>Download My Data</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" className="w-full justify-between text-red-500 hover:bg-red-900/10">
            <span>Delete Account</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

