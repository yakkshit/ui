import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImagePlus, Send } from "lucide-react"

type Message = {
  type: 'user' | 'bot'
  content: string
  image?: string
}

export default function GeminiChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    // In a real Next.js application, you would use process.env.GEMINI_API_KEY
    // Here, we're simulating reading from .env for demonstration purposes
    setApiKey(process.env.GEMINI_API_KEY || '')
  }, [])

  const handleSend = async () => {
    if (input.trim() || imageUrl) {
      const newMessage: Message = {
        type: 'user',
        content: input,
        image: imageUrl
      }
      setMessages([...messages, newMessage])

      // Here you would typically call the Gemini API
      // This is a placeholder for the API call
      try {
        // Simulating API call
        const response = await new Promise<string>((resolve) => {
          setTimeout(() => resolve(`Response using API key: ${apiKey.slice(0, 5)}...`), 1000)
        })

        const botResponse: Message = {
          type: 'bot',
          content: response
        }
        setMessages(prev => [...prev, botResponse])
      } catch (error) {
        console.error('Error calling Gemini API:', error)
      }

      setInput('')
      setImageUrl('')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex items-start gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <Avatar>
                <AvatarFallback>{message.type === 'user' ? 'U' : 'B'}</AvatarFallback>
                <AvatarImage src={message.type === 'user' ? '/placeholder.svg?height=40&width=40' : '/placeholder.svg?height=40&width=40'} />
              </Avatar>
              <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                {message.image && <img src={message.image} alt="Uploaded" className="max-w-full h-auto rounded mb-2" />}
                <p>{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => document.getElementById('imageUpload')?.click()}>
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Input
            type="file"
            id="imageUpload"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
          <Input
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow"
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {imageUrl && (
          <div className="mt-2">
            <img src={imageUrl} alt="Preview" className="max-h-20 rounded" />
          </div>
        )}
      </div>
    </div>
  )
}