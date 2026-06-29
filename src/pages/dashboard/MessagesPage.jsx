import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Send, Paperclip, MoreVertical, Phone, Video, ChevronLeft } from 'lucide-react'
import { Avatar, Card, Button } from '../../components/ui'

const mockConversations = [
  {
    id: '1',
    with: { id: '2', name: 'Jasmine Williams', avatar_url: null },
    last_message: 'Looking forward to seeing you on Friday!',
    last_message_at: '2024-02-12 14:30',
    unread: 2,
  },
  {
    id: '2',
    with: { id: '3', name: 'Marcus Johnson', avatar_url: null },
    last_message: 'Your appointment is confirmed for Saturday.',
    last_message_at: '2024-02-10 09:15',
    unread: 0,
  },
]

const mockMessages = [
  { id: 1, sender_id: 'you', content: 'Hi! I wanted to ask about the box braids service.', created_at: '2024-02-12 14:00' },
  { id: 2, sender_id: '2', content: 'Hello! Of course, I would be happy to help. What would you like to know?', created_at: '2024-02-12 14:05' },
  { id: 3, sender_id: 'you', content: 'What length options do you have for box braids?', created_at: '2024-02-12 14:10' },
  { id: 4, sender_id: '2', content: 'I offer medium length (shoulder) for $150, long length (waist) for $180, and extra long for $200. All include the hair.', created_at: '2024-02-12 14:20' },
  { id: 5, sender_id: 'you', content: 'Perfect! I would like the medium length. When is your next availability?', created_at: '2024-02-12 14:25' },
  { id: 6, sender_id: '2', content: 'Looking forward to seeing you on Friday!', created_at: '2024-02-12 14:30' },
]

export default function MessagesPage() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeConversation, setActiveConversation] = useState(mockConversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [messageInput, setMessageInput] = useState('')
  const [showConversations, setShowConversations] = useState(true)

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    setMessages([
      ...messages,
      { id: messages.length + 1, sender_id: 'you', content: messageInput, created_at: new Date().toISOString() }
    ])
    setMessageInput('')
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:hidden"
      >
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-2">
          Messages
        </h1>
      </motion.div>

      <div className="bg-white dark:bg-secondary-900 rounded-2xl shadow-soft overflow-hidden">
        <div className="grid lg:grid-cols-3 h-[70vh]">
          {/* Conversations List */}
          <div className={`lg:col-span-1 border-r border-secondary-200 dark:border-secondary-700 ${
            showConversations ? 'block' : 'hidden lg:block'
          }`}>
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="input pl-9 py-2 text-sm"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConversation(conv)
                    setShowConversations(false)
                  }}
                  className={`w-full p-4 text-left flex items-center gap-3 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors ${
                    activeConversation?.id === conv.id ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                  }`}
                >
                  <Avatar name={conv.with.name} src={conv.with.avatar_url} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-secondary-900 dark:text-white truncate">
                        {conv.with.name}
                      </h3>
                      <span className="text-xs text-secondary-500">
                        {new Date(conv.last_message_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-secondary-500 truncate">{conv.last_message}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-primary-600 text-white rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`lg:col-span-2 flex flex-col ${!showConversations ? 'block' : 'hidden lg:flex'}`}>
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-secondary-200 dark:border-secondary-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowConversations(true)}
                      className="lg:hidden p-2 -ml-2 text-secondary-600"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <Avatar name={activeConversation.with.name} src={activeConversation.with.avatar_url} />
                    <div>
                      <h3 className="font-medium text-secondary-900 dark:text-white">
                        {activeConversation.with.name}
                      </h3>
                      <p className="text-xs text-success-600">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender_id === 'you' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] lg:max-w-[60%] p-3 rounded-2xl ${
                          msg.sender_id === 'you'
                            ? 'bg-primary-600 text-white rounded-br-none'
                            : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-900 dark:text-white rounded-bl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-xs text-secondary-400 mt-1">
                        {new Date(msg.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="input flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-secondary-500">
                Select a conversation to start messaging.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
