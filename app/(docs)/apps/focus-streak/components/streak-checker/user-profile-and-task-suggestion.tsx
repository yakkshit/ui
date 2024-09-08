"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_STREAK!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_STREAK!;

export const supabase = createClient(supabaseUrl, supabaseKey);

interface UserProfile {
  username: string
  bio: string
  streak: number
  last_check_in: string
}

interface Task {
  id: number
  username: string
  title: string
  description: string
  streak_days: number
  current_streak: number
  completed: boolean
}

export default function UserProfileAndTaskSuggestion() {
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userTasks, setUserTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'username' | 'current_streak' | 'completed'>>({
    title: '',
    description: '',
    streak_days: 1
  })
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  useEffect(() => {
    if (selectedUser) {
      fetchUserProfile()
      fetchUserTasks()
    }
  }, [selectedUser])

  const fetchUserProfile = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('username, bio, streak, last_check_in')
      .eq('username', selectedUser)
      .single()

    if (error) {
      setError('Failed to fetch user profile. Please try again.')
    } else {
      setUserProfile(data)
    }
  }

  const fetchUserTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('username', selectedUser)
      .order('created_at', { ascending: false })

    if (error) {
      setError('Failed to fetch user tasks. Please try again.')
    } else {
      setUserTasks(data)
    }
  }

  const handleSuggestTask = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...newTask,
        username: selectedUser,
        current_streak: 0,
        completed: false
      })

    if (error) {
      setError('Failed to suggest task. Please try again.')
    } else {
      setSuccess('Task suggested successfully!')
      setNewTask({ title: '', description: '', streak_days: 1 })
      fetchUserTasks()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto p-4"
    >
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>User Profile and Task Suggestion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="username">Enter username to view profile</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mb-2"
            />
            <Button onClick={() => {
              fetchUserProfile()
              fetchUserTasks()
            }}>
              Load Profile
            </Button>
          </div>

          {userProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <h2 className="text-2xl font-bold mb-2">User Profile</h2>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${userProfile.username}`} />
                  <AvatarFallback>{userProfile.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{userProfile.username}</h3>
                  <p className="text-sm text-gray-500">Streak: {userProfile.streak} days</p>
                  <p className="text-sm text-gray-500">Last check-in: {new Date(userProfile.last_check_in).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="mb-4">{userProfile.bio}</p>
            </motion.div>
          )}

          {userTasks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <h2 className="text-2xl font-bold mb-2">Current Tasks</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Streak Days</TableHead>
                    <TableHead>Current Streak</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.streak_days}</TableCell>
                      <TableCell>{task.current_streak}</TableCell>
                      <TableCell>{task.completed ? 'Completed' : 'In Progress'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}

          {userProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <h2 className="text-2xl font-bold mb-2">Suggest a Task</h2>
              <div className="space-y-2 mb-4">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  type="text"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
                <Label htmlFor="task-description">Task Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
                <Label htmlFor="streak-days">Streak Days</Label>
                <Input
                  id="streak-days"
                  type="number"
                  placeholder="Streak days"
                  value={newTask.streak_days}
                  onChange={(e) => setNewTask({...newTask, streak_days: parseInt(e.target.value)})}
                />
                <Button onClick={handleSuggestTask}>Suggest Task</Button>
              </div>
            </motion.div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default" className="mb-4">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}