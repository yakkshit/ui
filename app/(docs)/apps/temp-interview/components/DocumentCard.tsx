import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"

export function DocumentCard() {
  const [content, setContent] = useState('')

  // TODO: Implement Notion API integration here

  return (
    <div>
      <Textarea
        placeholder="Start typing your document..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
      />
    </div>
  )
}