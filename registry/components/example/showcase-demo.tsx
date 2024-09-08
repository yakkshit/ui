"use client"

import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface CardData {
  image: string
  miniCard: {
    title: string
    description: string
  }
}

interface GradientCardDemoProps {
  cards?: CardData[]
  backgroundColors?: string[]
  cardWidth?: number
  cardHeight?: number
  miniCardWidth?: number
  scrollDuration?: number
  avatarSrc?: string
  avatarFallback?: string
}

const defaultCards: CardData[] = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-06%20at%2000.13.56-vjmSqgk7jrPJY4xlNcER1Rx1xuxixn.png",
    miniCard: { title: "New Feature", description: "Check out our latest update!" }
  },
  {
    image: "/placeholder.svg?height=400&width=400",
    miniCard: { title: "Tip", description: "Swipe for more cards" }
  },
  {
    image: "/placeholder.svg?height=400&width=400",
    miniCard: { title: "Feedback", description: "We'd love to hear from you" }
  },
]

export default function GradientCardDemo({
  cards = defaultCards,
  cardWidth = 350,
  cardHeight = 600,
  miniCardWidth = 200,
  scrollDuration = 10,
  avatarSrc = "/placeholder.svg?height=40&width=40",
  avatarFallback = "JD",
}: GradientCardDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(cards.length - 1) * 100}%`])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      container.scrollLeft += e.deltaY
    }
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        transition={{ duration: scrollDuration, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="relative z-10 h-screen flex items-center">
        <div ref={containerRef} className="w-full overflow-x-scroll scrollbar-hide">
          <motion.div 
            className="flex space-x-8 px-8"
            style={{ x }}
          >
            {cards.map((card, index) => (
              <div key={index} className="flex flex-col items-center">
                <Card className={`relative bg-card backdrop-blur-md shadow-xl rounded-3xl overflow-hidden flex-shrink-0`} style={{ width: cardWidth, height: cardHeight }}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <Star className="text-yellow-400" />
                      <Menu className="text-muted-foreground" />
                    </div>
                    <div className="flex-grow flex flex-col space-y-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={avatarSrc} alt="User avatar" />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-muted rounded"></div>
                        <div className="h-4 w-1/2 bg-muted rounded"></div>
                      </div>
                      <div className="bg-primary/10 text-primary p-3 rounded-lg">
                        How about a new image instead?
                      </div>
                      <div className="bg-primary/10 text-primary p-3 rounded-lg self-end">
                        Maybe something blue
                      </div>
                      <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                        Wow! I already worked on one
                      </div>
                      <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                        Check this out 🌈
                      </div>
                      <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                        <img src={card.image} alt={`Demo ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={avatarSrc} alt="User avatar" />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                      </Avatar>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
          <motion.div 
            className="flex space-x-4 px-8 mt-8"
            style={{ x }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="bg-card shadow-lg rounded-lg p-4 flex-shrink-0"
                style={{ width: miniCardWidth }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <h3 className="font-semibold">{card.miniCard.title}</h3>
                <p className="text-sm text-muted-foreground">{card.miniCard.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="h-0.5 bg-primary mt-4"
            style={{ 
              width: `${cards.length * (miniCardWidth + 16)}px`,
              x,
              scaleX: scrollYProgress 
            }}
          />
        </div>
      </div>
    </div>
  )
}