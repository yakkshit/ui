import React from 'react'
import { motion } from 'framer-motion'

type TextEffectStyle = 'gradient' | 'neon' | 'glitch' | 'typewriter' | 'wavy' | 'highlight'

interface TextEffectProps {
  text: string
  style?: TextEffectStyle
  tailwind?: string
  color?: string
  fontSize?: string
  fontWeight?: string
  className?: string
}

export default function TextEffect({
  text,
  style = 'gradient',
  tailwind = '',
  color = 'text-primary',
  fontSize = 'text-4xl',
  fontWeight = 'font-bold',
  className = '',
}: TextEffectProps) {
  const baseStyle = `${fontSize} ${fontWeight} ${color} ${tailwind} ${className}`

  const getTextEffect = () => {
    switch (style) {
      case 'gradient':
        return (
          <motion.span
            className={`${baseStyle} bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {text}
          </motion.span>
        )
      case 'neon':
        return (
          <motion.span
            className={`${baseStyle} relative`}
            initial={{ textShadow: '0 0 5px rgba(255,255,255,0.5)' }}
            animate={{ textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.8)' }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          >
            {text}
          </motion.span>
        )
      case 'glitch':
        return (
          <motion.span
            className={`${baseStyle} relative`}
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -2, 2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop' }}
          >
            <span className="absolute top-0 left-0 -ml-[2px] text-primary-foreground opacity-70">{text}</span>
            <span className="absolute top-0 left-0 ml-[2px] text-secondary opacity-70">{text}</span>
            <span className="relative">{text}</span>
          </motion.span>
        )
      case 'typewriter':
        return (
          <motion.span
            className={`${baseStyle} inline-block overflow-hidden whitespace-nowrap`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            {text}
          </motion.span>
        )
      case 'wavy':
        return (
          <motion.span className={`${baseStyle} inline-block`}>
            {text.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: index * 0.1 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        )
      case 'highlight':
        return (
          <motion.span
            className={`${baseStyle} relative inline-block`}
            initial={{ backgroundSize: '0 100%' }}
            animate={{ backgroundSize: '100% 100%' }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 100%',
            }}
          >
            {text}
          </motion.span>
        )
      default:
        return <span className={baseStyle}>{text}</span>
    }
  }

  return getTextEffect()
}