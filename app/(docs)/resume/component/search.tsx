import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SearchProps {
  isOpen: boolean
  onClose: () => void
  formData: {
    skills: string[]
    experience: Array<{ company: string; position: string }>
    projects: Array<{ name: string }>
    education: Array<{ institution: string }>
  }
}

export default function EnhancedSearchUI({ isOpen, onClose, formData }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredResults, setFilteredResults] = useState<Array<{ type: string; content: string }>>([])

  useEffect(() => {
    const results: Array<{ type: string; content: string }> = []
    if (searchTerm) {
      formData.skills.forEach(skill => {
        if (skill.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: 'Skill', content: skill })
        }
      })
      formData.experience.forEach(exp => {
        if (exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.position.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: 'Experience', content: `${exp.company} - ${exp.position}` })
        }
      })
      formData.projects.forEach(project => {
        if (project.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: 'Project', content: project.name })
        }
      })
      formData.education.forEach(edu => {
        if (edu.institution.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({ type: 'Education', content: edu.institution })
        }
      })
    }
    setFilteredResults(results)
  }, [searchTerm, formData])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-800 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md relative"
          >
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search skills, experience, projects, etc."
                  className="pl-10 pr-4 py-2"
                  autoFocus
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <ScrollArea className="h-[300px] p-4">
              <motion.ul layout className="space-y-2">
                <AnimatePresence>
                  {filteredResults.length === 0 ? (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      No results found.
                    </motion.li>
                  ) : (
                    filteredResults.map((result, index) => (
                      <motion.li
                        key={`${result.type}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded dark:text-gray-200"
                        onClick={() => alert(`${result.type}: ${result.content}`)}
                      >
                        <span className="font-semibold">{result.type}:</span> {result.content}
                      </motion.li>
                    ))
                  )}
                </AnimatePresence>
              </motion.ul>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}