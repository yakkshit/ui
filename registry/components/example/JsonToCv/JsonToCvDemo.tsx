"use client"

import { useState, ChangeEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Upload, FileText, Send, ChevronUp, ChevronDown, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Yakkshit from '@/app/(docs)/resume/component/yakkshit-resume'
import { ModeToggle } from '@/components/mode-toggle'

interface ResumeData {
    name: string;
    phone: string;
    email: string;
    linkedin: string;
    location: string;
    linkedinref: string;
    website: string;
    summary: string;
    skills: string[];
    experience: { company: string; position: string; duration: string; location: string; description: string }[];
    projects: { name: string; description: string }[];
    education: { institution: string; degree: string; duration: string; gpa: string }[];
    certificates: string[];
    leadership: string[];
};


export default function JsontocvDemo() {
  const [cvData, setCvData] = useState<ResumeData | null>(null)
  const [cvJson, setCvJson] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false)

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const result = e.target?.result
          if (typeof result === 'string') {
            const json = JSON.parse(result) as ResumeData
            setCvData(json)
            setCvJson(JSON.stringify(json, null, 2))
          }
        } catch (error) {
          console.error('Error parsing JSON:', error)
          alert('Invalid JSON file. Please upload a valid JSON.')
        }
      }
      reader.readAsText(file)
    }
  }

  const generateResume = () => {
    if (!cvData && !cvJson) {
      alert('Please provide CV data either by uploading a file or entering JSON.')
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedResume(cvData || JSON.parse(cvJson))
      setIsLoading(false)
      setShowOutput(true)
      setIsOutputCollapsed(false)
    }, 3000)
  }

  const toggleOutput = () => {
    setIsOutputCollapsed(!isOutputCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Card className="w-full max-w-screen mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Enhanced Resume Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label htmlFor="cv-upload" className="block mb-2 font-medium">
              Upload CV JSON
            </label>
            <div className="flex items-center space-x-2">
              <Button asChild variant="outline">
                <label htmlFor="cv-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </label>
              </Button>
              <span className="text-sm text-gray-500">
                {cvData ? 'File uploaded' : 'No file chosen'}
              </span>
            </div>
            <input
              id="cv-upload"
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label htmlFor="cv-json" className="block mb-2 font-medium">
              CV JSON Data
            </label>
            <Textarea
              id="cv-json"
              placeholder="Enter your CV JSON data here..."
              value={cvJson}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCvJson(e.target.value)}
              rows={5}
              className="font-mono text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label htmlFor="job-description" className="block mb-2 font-medium">
              Job Description
            </label>
            <Textarea
              id="job-description"
              placeholder="Enter the job description here..."
              value={jobDescription}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value)}
              rows={5}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button onClick={generateResume} className="w-full" disabled={isLoading}>
              <Send className="w-4 h-4 mr-2" />
              {isLoading ? 'Generating...' : 'Generate Resume'}
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4 mx-auto"></div>
              <p className="text-xl font-semibold">Generating Resume...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white z-40 overflow-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Generated Resume</h2>
                <div>
                <Button variant="outline" className="mr-2">
                    <ModeToggle />
                  </Button>
                  <Button variant="outline" size="sm" onClick={toggleOutput} className="mr-2">
                    {isOutputCollapsed ? <ChevronDown /> : <ChevronUp />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowOutput(false)}>
                    <X />
                  </Button>
                </div>
              </div>
              {!isOutputCollapsed && generatedResume && (
                <Card>
                  <CardContent className="p-6">
                    <Yakkshit resumeData={generatedResume} />
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}