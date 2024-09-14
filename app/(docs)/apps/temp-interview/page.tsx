'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Maximize2, Minimize2, Eye, EyeOff, GripHorizontal, Share2, RotateCcw, LayoutGrid } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { TimerCard } from './components/TimerCard'
import { CodingCard } from './components/CodingCard'
import { MeetingCard } from './components/MeetingCard'
import { DocumentCard } from './components/DocumentCard'


const cardComponents = {
  document: DocumentCard,
  coding: CodingCard,
  meeting: MeetingCard,
  timer: TimerCard,
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Card {
  id: string;
  type: keyof typeof cardComponents;
  content: Record<string, unknown>;
  width: number;
  height: number;
  x: number;
  y: number;
}

const INITIAL_CARDS: Card[] = [
  { id: 'document', type: 'document', content: {}, width: 300, height: 200, x: 0, y: 0 },
  { id: 'coding', type: 'coding', content: {}, width: 300, height: 200, x: 320, y: 0 },
  { id: 'meeting', type: 'meeting', content: {}, width: 300, height: 200, x: 0, y: 220 },
  { id: 'timer', type: 'timer', content: {}, width: 300, height: 200, x: 320, y: 220 },
]

export default function InterviewPage() {
  const { theme, setTheme } = useTheme()
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/placeholder.svg' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/placeholder.svg' },
  ])
  const [newUserEmail, setNewUserEmail] = useState('')
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS)
  const [hiddenCards, setHiddenCards] = useState<Record<string, boolean>>({})
  const [fullScreenCard, setFullScreenCard] = useState<string | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [isAutoArranged, setIsAutoArranged] = useState(false)
  const resizeRef = useRef<{ cardId: string | null; startX: number; startY: number; startWidth: number; startHeight: number }>({ cardId: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const addUser = () => {
    if (newUserEmail) {
      setUsers([...users, { id: users.length + 1, name: 'Guest', email: newUserEmail, avatar: '/placeholder.svg' }])
      setNewUserEmail('')
    }
  }

  const toggleCardVisibility = (cardId: string) => {
    setHiddenCards(prev => ({ ...prev, [cardId]: !prev[cardId] }))
  }

  const toggleFullScreen = (cardId: string) => {
    setFullScreenCard(fullScreenCard === cardId ? null : cardId)
  }

  const startResize = (e: React.PointerEvent, cardId: string) => {
    const card = cards.find(c => c.id === cardId)
    if (card) {
      setIsResizing(true)
      resizeRef.current = {
        cardId,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: card.width,
        startHeight: card.height
      }
    }
  }

  const handleResize = (e: PointerEvent) => {
    if (isResizing && resizeRef.current.cardId) {
      const dx = e.clientX - resizeRef.current.startX
      const dy = e.clientY - resizeRef.current.startY
      const newCards = cards.map(card => {
        if (card.id === resizeRef.current.cardId) {
          return {
            ...card,
            width: Math.max(200, resizeRef.current.startWidth + dx),
            height: Math.max(100, resizeRef.current.startHeight + dy)
          }
        }
        return card
      })
      adjustAdjacentCards(newCards, resizeRef.current.cardId)
      setCards(newCards)
    }
  }

  const adjustAdjacentCards = (newCards: Card[], resizedCardId: string) => {
    const resizedCard = newCards.find(card => card.id === resizedCardId)
    if (!resizedCard) return

    newCards.forEach(card => {
      if (card.id !== resizedCardId) {
        if (card.x + card.width > resizedCard.x && card.x < resizedCard.x + resizedCard.width) {
          // Vertical overlap
          if (card.y > resizedCard.y) {
            card.y = resizedCard.y + resizedCard.height
          }
        }
        if (card.y + card.height > resizedCard.y && card.y < resizedCard.y + resizedCard.height) {
          // Horizontal overlap
          if (card.x > resizedCard.x) {
            card.x = resizedCard.x + resizedCard.width
          }
        }
      }
    })
  }

  const endResize = () => {
    setIsResizing(false)
    resizeRef.current = { cardId: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0 }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleResize)
    window.addEventListener('pointerup', endResize)
    return () => {
      window.removeEventListener('pointermove', handleResize)
      window.removeEventListener('pointerup', endResize)
    }
  }, [isResizing])

  const shareBoard = () => {
    const boardState = {
      users,
      cards,
      hiddenCards,
    }
    const shareLink = `${window.location.origin}/shared-board?state=${encodeURIComponent(JSON.stringify(boardState))}`
    navigator.clipboard.writeText(shareLink)
    toast({
      title: "Share link copied!",
      description: "The link to this board has been copied to your clipboard.",
    })
  }

  const onDragEnd = (cardId: string, info: { point: { x: number; y: number } }) => {
    const updatedCards = cards.map(card => 
      card.id === cardId
        ? { ...card, x: info.point.x, y: info.point.y }
        : card
    )
    if (isAutoArranged) {
      const draggedCard = updatedCards.find(card => card.id === cardId)
      if (draggedCard) {
        updatedCards.forEach(card => {
          if (card.id !== cardId) {
            if (Math.abs(card.x - draggedCard.x) < 50 && Math.abs(card.y - draggedCard.y) < 50) {
              const tempX = card.x
              const tempY = card.y
              card.x = draggedCard.x
              card.y = draggedCard.y
              draggedCard.x = tempX
              draggedCard.y = tempY
            }
          }
        })
      }
    }
    setCards(updatedCards)
  }

  const resetCards = () => {
    setCards(INITIAL_CARDS)
    setHiddenCards({})
    setFullScreenCard(null)
    setIsAutoArranged(false)
  }

  const toggleAutoArrange = () => {
    setIsAutoArranged(!isAutoArranged)
    if (!isAutoArranged) {
      const containerWidth = containerRef.current?.clientWidth || 0
      const containerHeight = containerRef.current?.clientHeight || 0
      const cardWidth = containerWidth / 2
      const cardHeight = containerHeight / 2
      const newCards = cards.map((card, index) => ({
        ...card,
        width: cardWidth,
        height: cardHeight,
        x: (index % 2) * cardWidth,
        y: Math.floor(index / 2) * cardHeight
      }))
      setCards(newCards)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-background text-foreground">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Interview Collaboration</h1>
          <div className="flex items-center space-x-2">
            <Button onClick={resetCards}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Cards
            </Button>
            <Button onClick={toggleAutoArrange}>
              <LayoutGrid className="h-4 w-4 mr-2" />
              {isAutoArranged ? 'Disable' : 'Enable'} Auto Arrange
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {users.map(user => (
            <Avatar key={user.id}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          ))}
          <div className="flex gap-2 items-center">
            <Input
              type="email"
              placeholder="Add user by email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="mr-2"
            />
            <Button onClick={addUser}><PlusCircle className="h-4 w-4" /></Button>
            <Button onClick={shareBoard}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Board
            </Button>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[calc(100vh-200px)] overflow-hidden border border-gray-200 rounded-lg">
          {cards.map(card => {
            const CardComponent = cardComponents[card.type]
            return (
              <motion.div
                key={card.id}
                layout
                drag
                dragMomentum={false}
                onDragEnd={(_, info) => onDragEnd(card.id, info)}
                dragConstraints={containerRef}
                className={`absolute cursor-move ${fullScreenCard === card.id ? 'fixed inset-0 z-50 p-4 bg-background' : ''} ${hiddenCards[card.id] ? 'hidden' : ''}`}
                style={{ 
                  width: fullScreenCard === card.id ? '100%' : card.width, 
                  height: fullScreenCard === card.id ? '100%' : card.height, 
                  x: fullScreenCard === card.id ? 0 : card.x, 
                  y: fullScreenCard === card.id ? 0 : card.y 
                }}
              >
                <Card className="p-4 h-full overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold capitalize">{card.type}</h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleCardVisibility(card.id)}>
                        <EyeOff className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleFullScreen(card.id)}>
                        {fullScreenCard === card.id ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </Button>
                      <div className="cursor-move">
                        <GripHorizontal className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="h-[calc(100%-2rem)] overflow-auto">
                    <CardComponent />
                  </div>
                  {fullScreenCard !== card.id && (
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                      onPointerDown={(e) => startResize(e, card.id)}
                    />
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="fixed bottom-4 left-4 flex space-x-2">
          {Object.entries(hiddenCards).map(([cardId, isHidden]) => (
            isHidden && (
              <Button key={cardId} onClick={() => toggleCardVisibility(cardId)}>
                <Eye className="h-4 w-4 mr-2" />
                Show {cardId}
              </Button>
            )
          ))}
        </div>
      </div>
    </div>
  )
}