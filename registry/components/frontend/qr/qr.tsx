"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { QRCodeSVG } from "qrcode.react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Link, QrCode } from "lucide-react"

export default function QRComponent() {
  const [file, setFile] = useState<File | null>(null)
  const [link, setLink] = useState("")
  const [showQR, setShowQR] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setLink(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-10 p-6 bg-background rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">File Upload & QR Generator</h1>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="file">Upload File</Label>
          <div className="flex mt-1">
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" /> Choose File
            </Button>
          </div>
          {file && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-muted-foreground"
            >
              Selected file: {file.name}
            </motion.p>
          )}
        </div>

        <div>
          <Label htmlFor="link">Link</Label>
          <Input
            id="link"
            type="text"
            value={link}
            onChange={handleLinkChange}
            placeholder="Enter or paste a link"
            className="mt-1"
          />
        </div>

        <Button onClick={() => setShowQR(!showQR)} className="w-full">
          <QrCode className="mr-2 h-4 w-4" />
          {showQR ? "Hide" : "Generate"} QR Code
        </Button>

        <AnimatePresence>
          {showQR && link && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-center mt-4"
            >
              <QRCodeSVG
                value={link}
                size={200}
                bgColor={theme === "dark" ? "#1F2937" : "#FFFFFF"}
                fgColor={theme === "dark" ? "#FFFFFF" : "#000000"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}