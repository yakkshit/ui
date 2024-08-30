'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MessageSquare, Send, X } from 'lucide-react'

type Message = {
  id: number
  text: string
  sender: 'user' | 'support'
}

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Add a welcome message when the chat is first opened
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hello! How can I help you today?",
          sender: 'support'
        }
      ])
    }
  }, [isOpen, messages.length])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    // Simulate a support response
    setTimeout(() => {
      const supportResponse: Message = {
        id: messages.length + 2,
        text: "Thank you for your message. Our team will get back to you soon.",
        sender: 'support'
      }
      setMessages(prevMessages => [...prevMessages, supportResponse])
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Open chat support"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-background border border-border rounded-lg shadow-xl w-80 sm:w-96 flex flex-col max-h-[32rem]">
          <div className="flex justify-between items-center p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Chat Support</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close chat support"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="border-t border-border p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-muted text-muted-foreground rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary/90 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}