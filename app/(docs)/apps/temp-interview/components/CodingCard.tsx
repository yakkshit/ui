import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function CodingCard() {
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')

  // TODO: Implement JDoodle API integration here

  const runCode = () => {
    // Mock compilation
    setOutput('Code compilation output will appear here.')
  }

  return (
    <div className="space-y-4">
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Write your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
      />
      <Button onClick={runCode}>Run Code</Button>
      <div className="bg-muted p-2 rounded">
        <pre>{output}</pre>
      </div>
    </div>
  )
}