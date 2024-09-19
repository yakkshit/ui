"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

type Exam = 'IELTS' | 'TOEFL' | 'GRE' | 'GMAT'

type ExamSection = {
  name: string
  min: number
  max: number
}

const examSections: Record<Exam, ExamSection[]> = {
  IELTS: [
    { name: 'Listening', min: 0, max: 9 },
    { name: 'Reading', min: 0, max: 9 },
    { name: 'Writing', min: 0, max: 9 },
    { name: 'Speaking', min: 0, max: 9 },
  ],
  TOEFL: [
    { name: 'Reading', min: 0, max: 30 },
    { name: 'Listening', min: 0, max: 30 },
    { name: 'Speaking', min: 0, max: 30 },
    { name: 'Writing', min: 0, max: 30 },
  ],
  GRE: [
    { name: 'Verbal', min: 130, max: 170 },
    { name: 'Quantitative', min: 130, max: 170 },
    { name: 'Analytical Writing', min: 0, max: 6 },
  ],
  GMAT: [
    { name: 'Verbal', min: 0, max: 60 },
    { name: 'Quantitative', min: 0, max: 60 },
    { name: 'Integrated Reasoning', min: 1, max: 8 },
    { name: 'Analytical Writing', min: 0, max: 6 },
  ],
}

export default function Component() {
  const [selectedExam, setSelectedExam] = useState<Exam>('IELTS')
  const [scores, setScores] = useState<Record<string, number>>({})
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const calculateScore = () => {
    if (selectedExam === 'IELTS') {
      const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
      return (total / 4).toFixed(1)
    } else if (selectedExam === 'TOEFL') {
      return Object.values(scores).reduce((sum, score) => sum + score, 0)
    } else if (selectedExam === 'GRE') {
      const { 'Analytical Writing': aw, ...rest } = scores
      const total = Object.values(rest).reduce((sum, score) => sum + score, 0)
      return `${total} / ${aw}`
    } else if (selectedExam === 'GMAT') {
      const { 'Integrated Reasoning': ir, 'Analytical Writing': aw, ...rest } = scores
      const total = Object.values(rest).reduce((sum, score) => sum + score, 0)
      return `${total} / ${ir} / ${aw}`
    }
    return 'N/A'
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Exam Score Calculator</h1>
        <div className="mb-6">
          <label htmlFor="exam-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Exam
          </label>
          <select
            id="exam-select"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value as Exam)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {Object.keys(examSections).map((exam) => (
              <option key={exam} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedExam}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {examSections[selectedExam].map((section) => (
              <div key={section.name} className="mb-4">
                <label htmlFor={section.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {section.name}
                </label>
                <input
                  type="number"
                  id={section.name}
                  min={section.min}
                  max={section.max}
                  value={scores[section.name] || ''}
                  onChange={(e) => setScores({ ...scores, [section.name]: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-md"
        >
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">Total Score</h2>
          <p className="text-3xl font-bold text-center mt-2 text-blue-600 dark:text-blue-400">{calculateScore()}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}