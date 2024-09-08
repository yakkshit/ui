"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface AnimatedGradientBackgroundProps {
  type?: 'default' | 'pink-green' | 'blue-purple' | 'orange-yellow' | 'turbo-bg'
  duration?: number
  className?: string
}

const gradients = {
  light: {
    default: [
      "radial-gradient(circle, #ff9a9e 0%, #fad0c4 100%)",
      "radial-gradient(circle, #a1c4fd 0%, #c2e9fb 100%)",
      "radial-gradient(circle, #fbc2eb 0%, #a6c1ee 100%)",
    ],
    'pink-green': [
      "radial-gradient(circle, #ff758c 0%, #ff7eb3 50%, #a8e063 100%)",
      "radial-gradient(circle, #f6d365 0%, #fda085 50%, #a8e063 100%)",
      "radial-gradient(circle, #ff9a9e 0%, #fecfef 50%, #a8e063 100%)",
    ],
    'blue-purple': [
      "radial-gradient(circle, #4facfe 0%, #00f2fe 50%, #b465da 100%)",
      "radial-gradient(circle, #667eea 0%, #764ba2 50%, #6B8DD6 100%)",
      "radial-gradient(circle, #48c6ef 0%, #6f86d6 50%, #b465da 100%)",
    ],
    'orange-yellow': [
      "radial-gradient(circle, #f6d365 0%, #fda085 50%, #ffb347 100%)",
      "radial-gradient(circle, #fbc2eb 0%, #fda085 50%, #f6d365 100%)",
      "radial-gradient(circle, #ffecd2 0%, #fcb69f 50%, #ffb347 100%)",
    ],
    'turbo-bg': [
      "linear-gradient(to bottom right, #f9fafb, #f3f4f6, #e5e7eb, #d1d5db, #9ca3af)",
      "linear-gradient(to bottom right, #f3f4f6, #e5e7eb, #d1d5db, #9ca3af, #6b7280)",
      "linear-gradient(to bottom right, #e5e7eb, #d1d5db, #9ca3af, #6b7280, #4b5563)",
    ],
  },
  dark: {
    default: [
      "radial-gradient(circle, #434343 0%, #000000 100%)",
      "radial-gradient(circle, #4b6cb7 0%, #182848 100%)",
      "radial-gradient(circle, #3f4c6b 0%, #606c88 100%)",
    ],
    'pink-green': [
      "radial-gradient(circle, #660033 0%, #993366 50%, #006633 100%)",
      "radial-gradient(circle, #330033 0%, #660066 50%, #003300 100%)",
      "radial-gradient(circle, #990033 0%, #660066 50%, #006633 100%)",
    ],
    'blue-purple': [
      "radial-gradient(circle, #000033 0%, #000066 50%, #330033 100%)",
      "radial-gradient(circle, #000066 0%, #3300ff 50%, #660066 100%)",
      "radial-gradient(circle, #000099 0%, #3300cc 50%, #660099 100%)",
    ],
    'orange-yellow': [
      "radial-gradient(circle, #663300 0%, #996633 50%, #cc9900 100%)",
      "radial-gradient(circle, #993300 0%, #cc6600 50%, #ffcc00 100%)",
      "radial-gradient(circle, #663300 0%, #996600 50%, #cc9900 100%)",
    ],
    'turbo-bg': [
      "linear-gradient(to bottom right, #1f2937, #111827, #0f172a, #0d1120, #0a0a0a)",
      "linear-gradient(to bottom right, #111827, #0f172a, #0d1120, #0a0a0a, #050505)",
      "linear-gradient(to bottom right, #0f172a, #0d1120, #0a0a0a, #050505, #000000)",
    ],
  },
}

export default function AnimatedGradientBackground({
  type = 'default',
  duration = 10,
  className = "",
}: AnimatedGradientBackgroundProps) {
  const { theme } = useTheme()
  const currentTheme = theme === 'dark' ? 'dark' : 'light'
  const colors = gradients[currentTheme][type]

  return (
    <motion.div
      className={`absolute inset-0 z-0 ${className}`}
      animate={{
        background: colors,
      }}
      transition={{ duration, repeat: Infinity, repeatType: "reverse" }}
    />
  )
}