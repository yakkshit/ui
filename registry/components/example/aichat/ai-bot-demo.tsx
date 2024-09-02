'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MessageSquare, Send, X } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

type Message = {
  id: number
  text: string
  sender: 'user' | 'support'
  category: string
}

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [category, setCategory] = useState('feedback')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Fetch existing messages from Supabase
    if (isOpen) {
      fetchMessages()
    }
  }, [isOpen])

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('category', category)

    if (error) {
      console.error(error)
    } else {
      setMessages(data)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      category: category
    }

    // Save the message to Supabase
    const { error } = await supabase
      .from('messages')
      .insert([newMessage])

    if (error) {
      console.error(error)
    } else {
      setMessages([...messages, newMessage])
      setInputMessage('')

      // Simulate a support response
      setTimeout(async () => {
        const supportResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your message. Our team will get back to you soon.",
          sender: 'support',
          category: category
        }

        const { error } = await supabase
          .from('messages')
          .insert([supportResponse])

        if (error) {
          console.error(error)
        } else {
          setMessages(prevMessages => [...prevMessages, supportResponse])
        }
      }, 1000)
    }
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

          <div className="p-4">
            <label className="block text-sm font-medium text-muted-foreground">
              Select Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md bg-muted text-muted-foreground border-border focus:border-primary focus:ring focus:ring-primary"
            >
              <option value="feedback">Feedback</option>
              <option value="chat">Chat</option>
              <option value="support">Support</option>
            </select>
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


// sql command 

// CREATE TABLE messages (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL,
//   sender VARCHAR(10) CHECK (sender IN ('user', 'support')) NOT NULL,
//   category VARCHAR(50) NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
