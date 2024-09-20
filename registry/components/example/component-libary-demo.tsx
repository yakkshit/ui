"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { Search, Filter, Plus } from "lucide-react"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

type Component = {
  id: number
  name: string
  description: string
  keywords: string[]
  api: string
  status: "done" | "upcoming" | "requested"
  link: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
}

const statusColors = {
  done: "bg-green-500",
  upcoming: "bg-yellow-500",
  requested: "bg-blue-500",
}

export default function ComponentLibraryDemo() {
  const [components, setComponents] = useState<Component[]>([])
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "done" | "upcoming" | "requested">("all")
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    fetchComponents()
  }, [])

  useEffect(() => {
    filterComponents()
  }, [components, searchTerm, filterStatus])

  async function fetchComponents() {
    const { data, error } = await supabase.from("components").select("*")
    if (error) {
      console.error("Error fetching components:", error)
    } else {
      setComponents(data)
    }
  }

  function filterComponents() {
    let filtered = components
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    if (filterStatus !== "all") {
      filtered = filtered.filter((c) => c.status === filterStatus)
    }
    setFilteredComponents(filtered)
  }

  async function handleRequestComponent(name: string, description: string) {
    const { data, error } = await supabase
      .from("components")
      .insert([{ name, description, status: "requested" }])
    if (error) {
      console.error("Error requesting component:", error)
    } else {
      fetchComponents()
      setIsRequestDialogOpen(false)
    }
  }

  async function handleUpdateStatus(id: number, newStatus: "done" | "upcoming" | "requested") {
    const { error } = await supabase.from("components").update({ status: newStatus }).eq("id", id)
    if (error) {
      console.error("Error updating component status:", error)
    } else {
      fetchComponents()
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 dark:text-white text-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
        </div>
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Request Component
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request a New Component</DialogTitle>
              <DialogDescription>Fill in the details for the component you'd like to request.</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target as HTMLFormElement)
              handleRequestComponent(formData.get("name") as string, formData.get("description") as string)
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" name="description" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="all">
        <TabsList className="mb-4 md:mb-6 flex flex-wrap">
          <TabsTrigger value="all" className="flex-grow">All Components</TabsTrigger>
          <TabsTrigger value="done" className="flex-grow">Done</TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-grow">Upcoming</TabsTrigger>
          <TabsTrigger value="requested" className="flex-grow">Requested</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ComponentList components={filteredComponents} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        <TabsContent value="done">
          <ComponentList components={filteredComponents.filter(c => c.status === "done")} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        <TabsContent value="upcoming">
          <ComponentList components={filteredComponents.filter(c => c.status === "upcoming")} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        <TabsContent value="requested">
          <ComponentList components={filteredComponents.filter(c => c.status === "requested")} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ComponentList({ components, onUpdateStatus }: { components: Component[], onUpdateStatus: (id: number, status: "done" | "upcoming" | "requested") => void }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      <AnimatePresence>
        {components.map((component) => (
          <motion.div key={component.id} variants={itemVariants} layout>
            <Card className="relative">
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${statusColors[component.status]} group`}>
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -left-1/2 -translate-x-1/2 -translate-y-full">
                  {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                </span>
              </div>
              <CardHeader>
                <CardTitle>{component.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{component.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {component.keywords?.map((keyword, index) => (
                    <Badge key={index} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
                <p className="text-sm"><strong>API:</strong> {component.api}</p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <a href={component.link} target="_blank" rel="noopener noreferrer">View Component</a>
                </Button>
                {/* <select
                  value={component.status}
                  onChange={(e) => onUpdateStatus(component.id, e.target.value as "done" | "upcoming" | "requested")}
                  className="bg-transparent border border-gray-300 rounded-md p-2 w-full sm:w-auto"
                >
                  <option value="done">Done</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="requested">Requested</option>
                </select> */}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}