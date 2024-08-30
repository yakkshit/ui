'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { usePDF } from 'react-to-pdf'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ResumeGenerator() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
    linkedin: '',
    github: '',
    achievements: '',
  })
  const [jobDescription, setJobDescription] = useState('')
  const [generatedResume, setGeneratedResume] = useState('')
  const [uploadStatus, setUploadStatus] = useState({ success: false, message: '' })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const { toPDF, targetRef } = usePDF({ filename: 'resume.pdf' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCvFile(e.target.files[0])
    }
  }

  const generateResume = () => {
    const resume = `
      ${userData.name}
      ${userData.email} | ${userData.phone}
      LinkedIn: ${userData.linkedin}
      GitHub: ${userData.github}

      Experience:
      ${userData.experience}

      Education:
      ${userData.education}

      Skills:
      ${userData.skills}

      Achievements:
      ${userData.achievements}

      Tailored for Job Description:
      ${jobDescription}
    `
    setGeneratedResume(resume)
  }

  const uploadToLinkedIn = async () => {
    console.log('Uploading to LinkedIn...')
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setUploadStatus({ success: true, message: 'Successfully uploaded to LinkedIn!' })
    } catch (error) {
      setUploadStatus({ success: false, message: 'Failed to upload to LinkedIn. Please try again.' })
    }
  }

  const uploadToGitHub = async () => {
    console.log('Uploading to GitHub...')
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setUploadStatus({ success: true, message: 'Successfully uploaded to GitHub!' })
    } catch (error) {
      setUploadStatus({ success: false, message: 'Failed to upload to GitHub. Please try again.' })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Resume Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={userData.name} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={userData.email} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" value={userData.linkedin} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" name="github" value={userData.github} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Textarea id="experience" name="experience" value={userData.experience} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="education">Education</Label>
              <Textarea id="education" name="education" value={userData.education} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Textarea id="skills" name="skills" value={userData.skills} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="achievements">Achievements</Label>
              <Textarea id="achievements" name="achievements" value={userData.achievements} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea 
                id="jobDescription" 
                value={jobDescription} 
                onChange={(e) => setJobDescription(e.target.value)} 
              />
            </div>
            <div>
              <Label htmlFor="cvUpload">Upload CV (PDF)</Label>
              <Input id="cvUpload" type="file" accept=".pdf" onChange={handleFileUpload} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generateResume}>Generate Resume</Button>
        </CardFooter>
      </Card>

      {generatedResume && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Generated Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={targetRef}>
              <pre className="whitespace-pre-wrap">{generatedResume}</pre>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Button onClick={() => toPDF()}>Download PDF</Button>
            <Button onClick={uploadToLinkedIn}>Upload to LinkedIn</Button>
            <Button onClick={uploadToGitHub}>Upload to GitHub</Button>
          </CardFooter>
        </Card>
      )}

      {uploadStatus.message && (
        <Alert variant={uploadStatus.success ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{uploadStatus.success ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>
            {uploadStatus.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
