"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Edit2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

type RequestData = {
  method: string
  authType: string
  authKey: string
  url: string
  response: string
}

export default function APIRequestBuilder() {
  const [step, setStep] = useState(1)
  const [requestData, setRequestData] = useState<RequestData>({
    method: '',
    authType: '',
    authKey: '',
    url: '',
    response: ''
  })
  const [savedRequests, setSavedRequests] = useState<RequestData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<RequestData>(requestData)

  useEffect(() => {
    const saved = localStorage.getItem('savedRequests')
    if (saved) {
      setSavedRequests(JSON.parse(saved))
    }
  }, [])

  const saveRequest = () => {
    const updatedRequests = [...savedRequests, requestData]
    setSavedRequests(updatedRequests)
    localStorage.setItem('savedRequests', JSON.stringify(updatedRequests))
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const updateRequestData = (data: Partial<RequestData>) => {
    setRequestData({ ...requestData, ...data })
  }

  const makeRequest = async (data: RequestData = requestData) => {
    setIsLoading(true)
    try {
      const response = await fetch(data.url, {
        method: data.method,
        headers: {
          'Authorization': `${data.authType} ${data.authKey}`
        }
      })
      const responseData = await response.json()
      updateRequestData({ ...data, response: JSON.stringify(responseData, null, 2) })
    } catch (error) {
      if (error instanceof Error) {
        updateRequestData({ ...data, response: `Error: ${error.message}` })
      } else {
        updateRequestData({ ...data, response: 'An unknown error occurred' })
      }
    }
    setIsLoading(false)
  }
  

  const Step1RequestMethod = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 1: Choose Request Method</h2>
      <div className="space-y-2">
        <Label htmlFor="method">Select a request method:</Label>
        <Select value={requestData.method} onValueChange={(method) => updateRequestData({ method })}>
          <SelectTrigger id="method">
            <SelectValue placeholder="Select a method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="curl">cURL</SelectItem>
            <SelectItem value="xmlhttp">XMLHttpRequest</SelectItem>
            <SelectItem value="fetch">Fetch API</SelectItem>
            <SelectItem value="axios">Axios</SelectItem>
            <SelectItem value="jquery">jQuery</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const Step2Authorization = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 2: Authorization</h2>
      <div className="space-y-2">
        <Label htmlFor="authType">Authorization Type:</Label>
        <Select value={requestData.authType} onValueChange={(authType) => updateRequestData({ authType })}>
          <SelectTrigger id="authType">
            <SelectValue placeholder="Select auth type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bearer">Bearer Token</SelectItem>
            <SelectItem value="Basic">Basic Auth</SelectItem>
            <SelectItem value="API Key">API Key</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="authKey">Authorization Key:</Label>
        <Input
          id="authKey"
          value={requestData.authKey}
          onChange={(e) => updateRequestData({ authKey: e.target.value })}
          placeholder="Enter your authorization key"
        />
      </div>
    </div>
  )

  const Step3FetchURL = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Step 3: Fetch URL</h2>
      <div className="space-y-2">
        <Label htmlFor="url">API URL:</Label>
        <Input
          id="url"
          value={requestData.url}
          onChange={(e) => updateRequestData({ url: e.target.value })}
          placeholder="Enter the API URL"
        />
      </div>
      <Button onClick={() => makeRequest()} disabled={isLoading}>
        {isLoading ? 'Fetching...' : 'Make Request'}
      </Button>
    </div>
  )

  const FinalStep = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Final Step: Results</h2>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Request Details:</h3>
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="edit-method">Method:</Label>
              <Select value={editedData.method} onValueChange={(method) => setEditedData({ ...editedData, method })}>
                <SelectTrigger id="edit-method">
                  <SelectValue placeholder="Select a method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="curl">cURL</SelectItem>
                  <SelectItem value="xmlhttp">XMLHttpRequest</SelectItem>
                  <SelectItem value="fetch">Fetch API</SelectItem>
                  <SelectItem value="axios">Axios</SelectItem>
                  <SelectItem value="jquery">jQuery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-authType">Auth Type:</Label>
              <Select value={editedData.authType} onValueChange={(authType) => setEditedData({ ...editedData, authType })}>
                <SelectTrigger id="edit-authType">
                  <SelectValue placeholder="Select auth type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bearer">Bearer Token</SelectItem>
                  <SelectItem value="Basic">Basic Auth</SelectItem>
                  <SelectItem value="API Key">API Key</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-authKey">Auth Key:</Label>
              <Input
                id="edit-authKey"
                value={editedData.authKey}
                onChange={(e) => setEditedData({ ...editedData, authKey: e.target.value })}
                placeholder="Enter your authorization key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-url">URL:</Label>
              <Input
                id="edit-url"
                value={editedData.url}
                onChange={(e) => setEditedData({ ...editedData, url: e.target.value })}
                placeholder="Enter the API URL"
              />
            </div>
          </>
        ) : (
          <>
            <p>Method: {requestData.method}</p>
            <p>Auth Type: {requestData.authType}</p>
            <p>URL: {requestData.url}</p>
          </>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Response:</h3>
        <Textarea
          value={requestData.response}
          readOnly
          className="h-40"
        />
      </div>
      <div className="space-y-2">
        {isEditing ? (
          <>
            <Button onClick={() => {
              setRequestData(editedData)
              setIsEditing(false)
              makeRequest(editedData)
            }} disabled={isLoading}>
              <Check className="mr-2 h-4 w-4" />
              {isLoading ? 'Updating...' : 'Update and Re-run'}
            </Button>
            <Button variant="outline" onClick={() => setIsEditing(false)} className="ml-2">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => {
              setEditedData(requestData)
              setIsEditing(true)
            }}>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Request
            </Button>
            <Button onClick={saveRequest} className="ml-2">Save Request</Button>
            <Button variant="outline" onClick={() => setShowSaved(!showSaved)} className="ml-2">
              {showSaved ? 'Hide' : 'Show'} Saved Requests
            </Button>
          </>
        )}
      </div>
      {showSaved && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Saved Requests:</h3>
          {savedRequests.map((request, index) => (
            <div key={index} className="border p-2 rounded">
              <p>Method: {request.method}</p>
              <p>URL: {request.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1RequestMethod />
      case 2:
        return <Step2Authorization />
      case 3:
        return <Step3FetchURL />
      case 4:
        return <FinalStep />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <Button onClick={prevStep} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            {step < 4 && (
              <Button onClick={nextStep} className="ml-auto">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}