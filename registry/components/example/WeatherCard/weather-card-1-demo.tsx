"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20" />
        <AnimatePresence>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: Math.random(),
                scale: Math.random() * 2,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-4 text-center z-10"
      >
        Coming Soon
      </motion.h1>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl md:text-2xl mb-8 text-center max-w-md z-10"
      >
        We're working hard to bring you something amazing. Stay tuned!
      </motion.p>

      <style jsx global>{`
        :root {
          --primary: ${theme === 'light' ? '#3b82f6' : '#60a5fa'};
          --secondary: ${theme === 'light' ? '#ec4899' : '#f472b6'};
          --background: ${theme === 'light' ? '#ffffff' : '#1f2937'};
          --foreground: ${theme === 'light' ? '#1f2937' : '#ffffff'};
        }

        body {
          background-color: var(--background);
          color: var(--foreground);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .bg-primary {
          background-color: var(--primary);
        }

        .text-primary-foreground {
          color: var(--background);
        }
      `}</style>
    </div>
  )
}