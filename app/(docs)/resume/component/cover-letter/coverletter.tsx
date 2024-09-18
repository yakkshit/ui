'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { ChevronDown, Upload, Download, Maximize2, Minimize2, Sun, Moon, Plus, Minus, Eye, Bold, Italic, Underline } from 'lucide-react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

interface FormData {
  [key: string]: string
}

const generateCoverLetter = async (data: FormData): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
  const { name, email, phone, location, jobDescription, body } = data
  return `
    <h1>${name || 'Your Name'}</h1>
    <p>${email || 'your.email@example.com'}<br/>
    ${phone || 'Your Phone Number'}<br/>
    ${location || 'Your Location'}</p>

    <p>Dear Hiring Team,</p>

    <p>${body || 'Your cover letter body goes here...'}</p>

    <p>Job Description: ${jobDescription || 'No job description provided.'}</p>

    <p>Sincerely,<br/>
    ${name || 'Your Name'}</p>
  `
}

const defaultInputs = [
  { key: 'name', label: 'Full Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Phone', type: 'tel' },
  { key: 'location', label: 'Location', type: 'text' },
]

const colorPresets = [
  { name: 'Classic', bg: ['#3B82F6', '#8B5CF6'], text: '#FFFFFF', heading: '#FFFFFF' },
  { name: 'Sunset', bg: ['#F97316', '#EC4899'], text: '#FFFFFF', heading: '#FFFFFF' },
  { name: 'Forest', bg: ['#4ADE80', '#3B82F6'], text: '#FFFFFF', heading: '#FFFFFF' },
  { name: 'Monochrome', bg: ['#374151', '#111827'], text: '#FFFFFF', heading: '#FFFFFF' },
  { name: 'Ocean', bg: ['#22D3EE', '#3B82F6'], text: '#FFFFFF', heading: '#FFFFFF' },
  { name: 'Autumn', bg: ['#FACC15', '#EF4444'], text: '#FFFFFF', heading: '#FFFFFF' },
  { name: 'Spring', bg: ['#86EFAC', '#FACC15'], text: '#111827', heading: '#111827' },
  { name: 'Lavender', bg: ['#C084FC', '#F472B6'], text: '#111827', heading: '#111827' },
]

const blurTypes = [
  { name: 'None', value: 'blur-none' },
  { name: 'Sm', value: 'blur-sm' },
  { name: 'Md', value: 'blur-md' },
  { name: 'Lg', value: 'blur-lg' },
  { name: 'Xl', value: 'blur-xl' },
  { name: '2xl', value: 'blur-2xl' },
  { name: '3xl', value: 'blur-3xl' },
]

const fontSizes = [
  { name: 'XS', value: 'text-xs' },
  { name: 'SM', value: 'text-sm' },
  { name: 'Base', value: 'text-base' },
  { name: 'LG', value: 'text-lg' },
  { name: 'XL', value: 'text-xl' },
  { name: '2XL', value: 'text-2xl' },
  { name: '3XL', value: 'text-3xl' },
]

const fontFamilies = [
    { name: 'Sans', value: 'font-sans' }, // Default sans-serif
    { name: 'Serif', value: 'font-serif' }, // Default serif
    { name: 'Mono', value: 'font-mono' }, // Default monospace
    { name: 'Arial', value: 'font-arial' }, // Arial
    { name: 'Helvetica', value: 'font-helvetica' }, // Helvetica
    { name: 'Georgia', value: 'font-georgia' }, // Georgia
    { name: 'Times New Roman', value: 'font-times' }, // Times New Roman
    { name: 'Courier New', value: 'font-courier' }, // Courier New
    { name: 'Comic Sans MS', value: 'font-comic' }, // Comic Sans MS
    { name: 'Verdana', value: 'font-verdana' }, // Verdana
    { name: 'Trebuchet MS', value: 'font-trebuchet' }, // Trebuchet MS
    { name: 'Roboto', value: 'font-roboto' }, // Roboto
    { name: 'Open Sans', value: 'font-opensans' }, // Open Sans
    { name: 'Lato', value: 'font-lato' }, // Lato
    { name: 'Montserrat', value: 'font-montserrat' }, // Montserrat
    { name: 'Oswald', value: 'font-oswald' }, // Oswald
    { name: 'Poppins', value: 'font-poppins' }, // Poppins
    { name: 'Raleway', value: 'font-raleway' }, // Raleway
    { name: 'Nunito', value: 'font-nunito' }, // Nunito
    { name: 'Ubuntu', value: 'font-ubuntu' }, // Ubuntu
    { name: 'Merriweather', value: 'font-merriweather' }, // Merriweather
    { name: 'Inconsolata', value: 'font-inconsolata' }, // Inconsolata (Monospace)
];
  

export default function CoverLetterGenerator() {
  const [inputs, setInputs] = useState(defaultInputs)
  const [formData, setFormData] = useState<FormData>({})
  const [jobDescription, setJobDescription] = useState('')
  const [body, setBody] = useState('')
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(colorPresets[0])
  const [gradientColors, setGradientColors] = useState(colorPresets[0].bg)
  const [textColor, setTextColor] = useState(colorPresets[0].text)
  const [headingColor, setHeadingColor] = useState(colorPresets[0].heading)
  const [blurType, setBlurType] = useState('blur-none')
  const [blurAmount, setBlurAmount] = useState(0)
  const [jsonInput, setJsonInput] = useState('')
  const [fontSize, setFontSize] = useState('text-base')
  const [fontFamily, setFontFamily] = useState('font-sans')
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resumeInputRef = useRef<HTMLInputElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      jobDescription,
      body
    }))
  }, [jobDescription, body])

  useEffect(() => {
    setJsonInput(JSON.stringify(formData, null, 2))
  }, [formData])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const result = e.target?.result
          if (typeof result === 'string') {
            const json = JSON.parse(result)
            setInputs(Object.entries(json).map(([key, value]) => ({ key, label: key, type: 'text', value: value as string })))
            setFormData(json)
            setJsonInput(JSON.stringify(json, null, 2))
          }
        } catch (error) {
          console.error('Error parsing JSON:', error)
        }
      }
      reader.readAsText(file)
    }
  }, [])

  const handleInputChange = useCallback((key: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [key]: value }
      setJsonInput(JSON.stringify(updated, null, 2))
      return updated
    })
  }, [])

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    try {
      const letter = await generateCoverLetter(formData)
      setGeneratedLetter(letter)
    } catch (error) {
      console.error('Error generating cover letter:', error)
    }
    setIsGenerating(false)
  }, [formData])

  const handleDownload = useCallback(async () => {
    if (!generatedLetter || !letterRef.current) return
    try {
      const canvas = await html2canvas(letterRef.current)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`cover-letter-${new Date().toISOString()}.pdf`)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }, [generatedLetter])

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(prev => !prev)
  }, [])

  const getBackgroundStyle = useCallback(() => {
    return {
      background: `linear-gradient(to right, ${gradientColors.join(', ')})`
    }
  }, [gradientColors])

  const handleJsonDownload = useCallback(() => {
    const blob = new Blob([jsonInput], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cover-letter-data-${new Date().toISOString()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [jsonInput])

  const addGradientColor = useCallback(() => {
    setGradientColors(prev => [...prev, '#FFFFFF'])
  }, [])

  const removeGradientColor = useCallback((index: number) => {
    setGradientColors(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleJsonInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value)
    try {
      const parsed = JSON.parse(e.target.value)
      setFormData(parsed)
      setInputs(Object.entries(parsed).map(([key, value]) => ({ key, label: key, type: 'text', value: value as string })))
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  }, [])

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-200 ease-in-out">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen mx-auto space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">AI Cover Letter Generator</h1>
        </div>

        <div className="flex justify-between items-center">
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload JSON
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button onClick={() => resumeInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Upload Resume
          </Button>
          <input
            ref={resumeInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputs.map((input) => (
                  <div key={input.key}>
                    <Label htmlFor={input.key}>{input.label}</Label>
                    <Input
                      id={input.key}
                      type={input.type}
                      value={formData[input.key] || ''}
                      onChange={(e) => handleInputChange(input.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div>
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="body">Body</Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={5}
                />
              </div>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <div className="flex justify-between items-center mb-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Customize <ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <div>
                          <Label>Color Presets</Label>
                          <Select onValueChange={(value) => {
                            const preset = colorPresets.find(p => p.name === value)
                            if (preset) {
                              setSelectedPreset(preset)
                              setGradientColors(preset.bg)
                              setTextColor(preset.text)
                              setHeadingColor(preset.heading)
                            }
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a color preset" />
                            </SelectTrigger>
                            <SelectContent>
                              {colorPresets.map((preset) => (
                                <SelectItem key={preset.name} value={preset.name}>{preset.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Gradient Colors</Label>
                          {gradientColors.map((color, index) => (
                            <div key={index} className="flex items-center space-x-2 mt-2">
                              <Input
                                type="color"
                                value={color}
                                onChange={(e) => {
                                  const newColors = [...gradientColors]
                                  newColors[index] = e.target.value
                                  setGradientColors(newColors)
                                }}
                              />
                              <Input
                                value={color}
                                onChange={(e) => {
                                  const newColors = [...gradientColors]
                                  newColors[index] = e.target.value
                                  setGradientColors(newColors)
                                }}
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeGradientColor(index)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            className="mt-2"
                            onClick={addGradientColor}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Color
                          </Button>
                        </div>
                        <div>
                          <Label>Text Color</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="color"
                              value={textColor}
                              onChange={(e) => setTextColor(e.target.value)}
                            />
                            <Input
                              value={textColor}
                              onChange={(e) => setTextColor(e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Heading Color</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="color"
                              value={headingColor}
                              onChange={(e) => setHeadingColor(e.target.value)}
                            />
                            <Input
                              value={headingColor}
                              onChange={(e) => setHeadingColor(e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Font Size</Label>
                          <Select onValueChange={setFontSize}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              {fontSizes.map((size) => (
                                <SelectItem key={size.value} value={size.value}>{size.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Font Family</Label>
                          <Select onValueChange={setFontFamily}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select font family" />
                            </SelectTrigger>
                            <SelectContent>
                              {fontFamilies.map((font) => (
                                <SelectItem key={font.value} value={font.value}>{font.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant={isBold ? "default" : "outline"}
                            size="icon"
                            onClick={() => setIsBold(!isBold)}
                          >
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={isItalic ? "default" : "outline"}
                            size="icon"
                            onClick={() => setIsItalic(!isItalic)}
                          >
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button
                            variant={isUnderline ? "default" : "outline"}
                            size="icon"
                            onClick={() => setIsUnderline(!isUnderline)}
                          >
                            <Underline className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Label>Blur Type</Label>
                          <Select onValueChange={setBlurType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blur type" />
                            </SelectTrigger>
                            <SelectContent>
                              {blurTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>{type.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Blur Amount</Label>
                          <Slider
                            min={0}
                            max={20}
                            step={1}
                            value={[blurAmount]}
                            onValueChange={(value) => setBlurAmount(value[0])}
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={toggleFullScreen}
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                </div>
                <motion.div
                  layout
                  className={`rounded-lg p-6 ${isFullScreen ? 'fixed inset-0 z-50 overflow-auto' : 'h-[60vh] overflow-auto'}`}
                  style={{
                    position: 'relative',
                  }}
                >
                  <div
                    className={`absolute inset-0 ${blurType}`}
                    style={{
                      ...getBackgroundStyle(),
                      filter: `blur(${blurAmount}px)`,
                    }}
                  />
                  <div 
                    ref={letterRef}
                    className={`prose max-w-none relative ${fontSize} ${fontFamily} ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}
                    style={{ 
                      color: textColor,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {generatedLetter ? (
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: generatedLetter.replace(
                            /<h1>(.*?)<\/h1>/g, 
                            `<h1 style="color: ${headingColor}">$1</h1>`
                          ) 
                        }} 
                      />
                    ) : (
                      <p>Your generated cover letter will appear here.</p>
                    )}
                  </div>
                </motion.div>
                {isFullScreen && (
                  <div className="fixed bottom-4 right-4 z-50 space-x-2">
                    <Button onClick={toggleFullScreen}>Exit Full Screen</Button>
                    <Button onClick={handleDownload}>Download PDF</Button>
                  </div>
                )}
              </div>
              {generatedLetter && !isFullScreen && (
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">JSON Preview</h2>
              <div className="space-x-2">
                <Button onClick={handleJsonDownload}>
                  <Download className="mr-2 h-4 w-4" /> Download JSON
                </Button>
              </div>
            </div>
            <Textarea
              value={jsonInput}
              onChange={handleJsonInputChange}
              rows={10}
              className="mb-4"
              placeholder="Enter your JSON data here..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Suggestions for Improvement</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tailor your cover letter to the specific job and company</li>
              <li>Highlight your most relevant skills and experiences</li>
              <li>Use concrete examples to demonstrate your achievements</li>
              <li>Keep it concise and focused, ideally one page</li>
              <li>Proofread carefully for grammar and spelling errors</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}