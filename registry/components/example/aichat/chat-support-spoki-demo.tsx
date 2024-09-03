import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Calendar, Phone, Mail, Paperclip, Star, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey)

const preConversationPrompts = [
  "Share your contact details",
  "Book an appointment",
  "Chat with an agent",
  "Learn more about our services"
]

interface Message {
  role: 'user' | 'bot';
  content: string;
  attachment?: string;
}

interface Feedback {
  serviceRating: number;
  textFeedback: string;
}

export default function SpokiChatbotDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>({ serviceRating: 0, textFeedback: '' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = async () => {
    if (input.trim() === '' && !file) return

    let newMessage: Message = { role: 'user', content: input }
    if (file) {
      newMessage.attachment = file.name
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    setFile(null)

    // Mock API call to Supabase or your backend
    const response = await mockApiCall(input, file)
    setMessages(prev => [...prev, { role: 'bot', content: response }])

    // Save conversation to Supabase
    await saveConversationToSupabase([...messages, newMessage, { role: 'bot', content: response }])
  }

  const handlePromptClick = (prompt: string) => {
    setMessages(prev => [...prev, { role: 'user', content: prompt }])
    handlePromptAction(prompt)
  }

  const handlePromptAction = (prompt: string) => {
    switch (prompt) {
      case "Book an appointment":
        handleBookAppointment()
        break
      case "Chat with an agent":
        handleWhatsAppChat()
        break
      // Add more cases for other prompts as needed
      default:
        // Handle general prompts
        break
    }
  }

  const handleBookAppointment = () => {
    setMessages(prev => [...prev, { role: 'bot', content: "Great! You can book an appointment at cal.com/yakkshit. Would you like me to open that for you?" }])
  }

  const handleWhatsAppChat = async () => {
    setMessages(prev => [...prev, { role: 'bot', content: "Sure, I can help you start a WhatsApp chat. Please provide your phone number to begin." }])
    // In a real application, you'd wait for the user to provide their phone number before making this call
    await initiateWhatsAppChat('+1234567890') // Replace with actual user's phone number
  }

  const handleSendConversationEmail = () => {
    const subject = "Chat Conversation Summary"
    const body = messages.map(m => `${m.role}: ${m.content}`).join('\n\n')
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const saveConversationToSupabase = async (conversation: Message[]) => {
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        user_id: 'current-user-id', // Replace with actual user ID
        messages: conversation
      })

    if (error) console.error('Error saving conversation:', error)
  }

  const handleEndConversation = () => {
    setShowFeedback(true)
  }

  const handleStartNewConversation = () => {
    setMessages([])
    setShowFeedback(false)
    setFeedback({ serviceRating: 0, textFeedback: '' })
  }

  const handleFeedbackSubmit = async () => {
    // Save feedback to Supabase
    const { data, error } = await supabase
      .from('user_feedback')
      .insert({
        user_id: 'current-user-id', // Replace with actual user ID
        conversation_id: 'current-conversation-id', // Replace with actual conversation ID
        service_rating: feedback.serviceRating,
        text_feedback: feedback.textFeedback
      })

    if (error) {
      console.error('Error saving feedback:', error)
    } else {
      console.log('Feedback saved successfully')
      setShowFeedback(false)
      handleStartNewConversation()
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-full max-w-md z-50"
          >
            <Card className="h-[80vh] flex flex-col">
              <CardHeader className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Chat with us</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={handleStartNewConversation}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto">
                {messages.length === 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">How can we help you today?</p>
                    <ul className="space-y-2">
                      {preConversationPrompts.map((prompt, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => handlePromptClick(prompt)}
                          >
                            {prompt}
                          </Button>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                      {message.content}
                      {message.attachment && (
                        <div className="mt-1 text-xs">
                          Attached: {message.attachment}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                {showFeedback ? (
                  <div className="w-full space-y-2">
                    <div className="flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          onClick={() => setFeedback(prev => ({ ...prev, serviceRating: star }))}
                        >
                          <Star
                            className={`h-6 w-6 ${star <= feedback.serviceRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        </Button>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Please provide any additional feedback..."
                      value={feedback.textFeedback}
                      onChange={(e) => setFeedback(prev => ({ ...prev, textFeedback: e.target.value }))}
                      className="w-full"
                    />
                    <Button onClick={handleFeedbackSubmit} className="w-full">
                      Submit Feedback
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex w-full gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-grow"
                      />
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    {file && (
                      <div className="text-sm text-muted-foreground">
                        File attached: {file.name}
                      </div>
                    )}
                    <div className="flex w-full justify-between">
                      <Button variant="outline" size="sm" onClick={() => window.open('https://cal.com/yakkshit', '_blank')}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Book
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleWhatsAppChat}>
                        <Phone className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleSendConversationEmail}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email Chat
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleEndConversation}>
                        End Chat
                      </Button>
                    </div>
                  </>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="rounded-full w-12 h-12"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </motion.div>
    </>
  )
}

// Mock API call (replace with actual Supabase or backend call)
async function mockApiCall(input: string, file: File | null) {
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  let response = `Thank you for your message: "${input}".`
  if (file) {
    response += ` I've received your file: ${file.name}.`
  }
  return response + " How else can I assist you?"
}

// WhatsApp webhook integration
async function initiateWhatsAppChat(phoneNumber: string) {
  try {
    const response = await fetch('https://app.spoki.it/wh/ap/ee99f85a-dba2-4ced-81bd-de14441ca6c7/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: '1c788ac5a44f471486c21503cc95acce',
        phone: phoneNumber,
        first_name: 'User', // Replace with actual user data
        last_name: 'Name',
        email: 'user@example.com',
        custom_fields: {
          // Add any custom fields here
        }
      }),
    })

    if (response.ok) {
      console.log('WhatsApp chat initiated successfully')
      // Handle successful initiation (e.g., show a success message to the user)
    } else {
      console.error('Failed to initiate WhatsApp chat')
      // Handle error (e.g., show an error message to the user)
    }
  } catch (error) {
    console.error('Error initiating WhatsApp chat:', error)
    // Handle error (e.g., show an error message to the user)
  }
}



// sql commad for supabase

// -- Create a table to store chat conversations
// CREATE TABLE chat_conversations (
//   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   user_id UUID,
//   messages JSONB,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// -- Create an index on the user_id column for faster queries
// CREATE INDEX idx_chat_conversations_user_id ON chat_conversations(user_id);

// -- Enable Row Level Security (RLS)
// ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

// -- Create a policy that allows users to insert and select their own conversations
// CREATE POLICY "Users can insert their own conversations" ON chat_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
// CREATE POLICY "Users can view their own conversations" ON chat_conversations FOR SELECT USING (auth.uid() = user_id);


// sql for feeback 

// -- Create a table to store user feedback
// CREATE TABLE user_feedback (
//   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   user_id UUID,
//   conversation_id UUID,
//   service_rating INT CHECK (service_rating >= 1 AND service_rating <= 5),
//   text_feedback TEXT,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// -- Create an index on the user_id column for faster queries
// CREATE INDEX idx_user_feedback_user_id ON user_feedback(user_id);

// -- Enable Row Level Security (RLS)
// ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

// -- Create a policy that allows users to insert their own feedback
// CREATE POLICY "Users can insert their own feedback" ON user_feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
// CREATE POLICY "Users can view their own feedback" ON user_feedback FOR SELECT USING (auth.uid() = user_id);