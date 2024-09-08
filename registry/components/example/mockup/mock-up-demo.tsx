'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface Screen {
  content: React.ReactNode
  image: string
}

interface ParallaxScrollSectionProps {
  backgroundText: string[]
  screens: Screen[]
  cardWidth?: string
  cardHeight?: string
  backgroundTextSize?: string
  scrollSpeed?: number
}

export default function ParallaxScrollSection({
  backgroundText = [
    'Innovative Design',
    'Powerful Performance',
    'Seamless Experience',
    'Cutting-edge Technology'
  ],
  screens = [
    { content: <div>Music Player</div>, image: '/dummy1.png' },
    { content: <div>Stock Market</div>, image: '/dummy2.png' },
    { content: <div>Social Feed</div>, image: '/dummy3.png' },
    { content: <div>Weather App</div>, image: '/dummy4.png' }
  ],
  cardWidth = '300px',
  cardHeight = '600px',
  backgroundTextSize = '100px',
  scrollSpeed = 0.5
}: ParallaxScrollSectionProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const backgroundX = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const cardY = useTransform(scrollYProgress, [0, 1], ['50%', '-50%'])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top, height } = sectionRef.current.getBoundingClientRect()
        const scrollPercentage = Math.abs(top) / height
        const screenIndex = Math.min(
          Math.floor(scrollPercentage * screens.length),
          screens.length - 1
        )
        setCurrentScreen(screenIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [screens.length])

  return (
    <section ref={sectionRef} className="relative h-[300vh] overflow-hidden">
      {/* Four lines of background text */}
      {backgroundText.map((text, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center justify-center text-primary/10 dark:text-primary-foreground/10 whitespace-nowrap"
          style={{ x: backgroundX, fontSize: backgroundTextSize, top: `${index * 25}%` }}
        >
          {text.repeat(10)}
        </motion.div>
      ))}

      <motion.div
        className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ y: cardY }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className="overflow-hidden shadow-2xl relative"
          style={{ width: cardWidth, height: cardHeight }}
        >
          <CardContent className="p-0 h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <Image
                  src={screens[currentScreen].image}
                  alt={`Screen ${currentScreen + 1}`}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-md mb-4"
                />
                <div className="text-lg font-semibold text-center">
                  {screens[currentScreen].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>

          {/* Mini-cards floating on both sides on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: -100 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="absolute top-1/2 -translate-y-1/2 left-0"
                >
                  <Card className="w-20 h-20 flex items-center justify-center shadow-lg">
                    <CardContent className="p-2 text-xs text-center">
                      Mini Card 1
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 100 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="absolute top-1/2 -translate-y-1/2 right-0"
                >
                  <Card className="w-20 h-20 flex items-center justify-center shadow-lg">
                    <CardContent className="p-2 text-xs text-center">
                      Mini Card 2
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </section>
  )
}
