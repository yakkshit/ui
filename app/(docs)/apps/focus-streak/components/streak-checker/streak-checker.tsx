"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Calendar } from '@/components/ui/calendar'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_STREAK!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_STREAK!;

export const supabase = createClient(supabaseUrl, supabaseKey);

interface UserProfile {
  username: string
  email: string
  bio: string
  streak: number
  last_check_in: string
  is_admin: boolean
  password: string
}

interface CheckIn {
  username: string
  check_in_date: string
  summary: string
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

interface SimplifiedUserProfile {
  username: string
  streak: number
}

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  streak_days: z.number().min(1, "Streak days must be at least 1"),
})

export default function StreakCheckerDemo() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [summary, setSummary] = useState<string>('')
  const [streak, setStreak] = useState<number>(0)
  const [lastCheckIn, setLastCheckIn] = useState<Date | null>(null)
  const [error, setError] = useState<string>('')
  const [following, setFollowing] = useState<string[]>([])
  const [followers, setFollowers] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [dailySummary, setDailySummary] = useState<string>('')
  const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(false)
  const [newProfile, setNewProfile] = useState<UserProfile>({
    username: '',
    email: '',
    bio: '',
    streak: 0,
    last_check_in: new Date().toISOString(),
    is_admin: false,
    password: ''
  })
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'username' | 'current_streak' | 'completed'>>({
    title: '',
    description: '',
    streak_days: 1
  })
  const [topProfiles, setTopProfiles] = useState<SimplifiedUserProfile[]>([])
  const [followUsername, setFollowUsername] = useState<string>('')
  const [personalUserId, setPersonalUserId] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
      setIsLoggedIn(true)
      fetchUserData(storedUsername)
    }
    fetchTopProfiles()
  }, [])

  const fetchUserData = async (username: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (error) {
      setError('User not found. Please check the username or create a new profile.')
    } else {
      setStreak(data.streak)
      setLastCheckIn(new Date(data.last_check_in))
      setIsAdmin(data.is_admin)
      fetchFollowing(username)
      fetchFollowers(username)
      fetchCheckIns(username)
      fetchTasks(username)
    }
  }

  const fetchFollowing = async (username: string) => {
    const { data, error } = await supabase
      .from('following')
      .select('followed_username')
      .eq('follower_username', username)

    if (!error && data) {
      setFollowing(data.map(f => f.followed_username))
    }
  }

  const fetchFollowers = async (username: string) => {
    const { data, error } = await supabase
      .from('following')
      .select('follower_username')
      .eq('followed_username', username)

    if (!error && data) {
      setFollowers(data.map(f => f.follower_username))
    }
  }

  const fetchCheckIns = async (username: string) => {
    const { data, error } = await supabase
      .from('check_ins')
      .select('*')
      .eq('username', username)
      .order('check_in_date', { ascending: false })

    if (!error && data) {
      setCheckIns(data)
    }
  }

  const fetchTasks = async (username: string) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('username', username)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setTasks(data)
    }
  }

  const fetchTopProfiles = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('username, streak')
      .order('streak', { ascending: false })
      .limit(10)
  
    if (!error && data) {
      setTopProfiles(data as SimplifiedUserProfile[]) // Use the new simplified interface
    }
  }

  const handleLogin = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (error) {
      setError('User not found. Please check your username.')
    } else if (data.password === password) {
      setIsLoggedIn(true)
      setIsAdmin(data.is_admin)
      localStorage.setItem('username', username)
      fetchUserData(username)
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setUsername('')
    setPassword('')
    localStorage.removeItem('username')
  }

  const handleCheckIn = async () => {
    const today = new Date()
    const { data, error } = await supabase
      .from('check_ins')
      .insert({
        username,
        check_in_date: today.toISOString(),
        summary
      })

    if (error) {
      setError('Failed to check in. Please try again.')
    } else {
      const newStreak = isConsecutiveDay(lastCheckIn, today) ? streak + 1 : 1
      await supabase
        .from('users')
        .update({ streak: newStreak, last_check_in: today.toISOString() })
        .eq('username', username)

      setStreak(newStreak)
      setLastCheckIn(today)
      setSummary('')
      fetchCheckIns(username)
      updateTaskStreaks()
    }
  }

  const updateTaskStreaks = async () => {
    const updatedTasks = tasks.map(task => {
      if (!task.completed) {
        const newStreak = task.current_streak + 1
        if (newStreak >= task.streak_days) {
          return { ...task, current_streak: newStreak, completed: true }
        }
        return { ...task, current_streak: newStreak }
      }
      return task
    })

    const { error } = await supabase.from('tasks').upsert(updatedTasks)

    if (!error) {
      setTasks(updatedTasks)
    }
  }

  const isConsecutiveDay = (lastDate: Date | null, currentDate: Date): boolean => {
    if (!lastDate) return false
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1
  }

  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date)
    const { data, error } = await supabase
      .from('check_ins')
      .select('summary')
      .eq('username', username)
      .eq('check_in_date', date.toISOString().split('T')[0])
      .single()

    if (data) {
      setDailySummary(data.summary)
    } else {
      setDailySummary('')
    }
  }

  const handleFollow = async () => {
    if (!personalUserId) {
      setError('Please enter your personal user ID to follow.')
      return
    }

    const { error } = await supabase
      .from('following')
      .insert({ follower_username: personalUserId, followed_username: followUsername })

    if (error) {
      setError('Failed to follow user. Please try again.')
    } else {
      setFollowing([...following, followUsername])
      setFollowUsername('')
      setPersonalUserId('')
    }
  }

  const handleUnfollow = async (unfollowedUsername: string) => {
    if (!personalUserId) {
      setError('Please enter your personal user ID to unfollow.')
      return
    }

    const { error } = await supabase
      .from('following')
      .delete()
      .eq('follower_username', personalUserId)
      .eq('followed_username', unfollowedUsername)

    if (error) {
      setError('Failed to unfollow user. Please try again.')
    } else {
      setFollowing(following.filter(f => f !== unfollowedUsername))
    }
  }

  const handleCreateProfile = async () => {
    const { data, error } = await supabase
      .from('users')
      .insert({
        username: newProfile.username,
        email: newProfile.email,
        bio: newProfile.bio,
        streak: 0,
        last_check_in: new Date().toISOString(),
        is_admin: newProfile.is_admin,
        password: newProfile.password
      })

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        const { data: suggestion } = await supabase.rpc('check_username', { desired_username: newProfile.username })
        setError(`Username already exists. Suggested alternative: ${suggestion[0].suggestion}`)
      } else {
        setError('Failed to create profile. Please try again.')
      }
    } else {
      setUsername(newProfile.username)
      setPassword(newProfile.password)
      setIsAdmin(newProfile.is_admin)
      localStorage.setItem('username', newProfile.username)
      setIsCreatingProfile(false)
      setIsLoggedIn(true)
      fetchUserData(newProfile.username)
    }
  }

  const handleCreateTask = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...newTask,
        username,
        current_streak: 0,
        completed: false
      })

    if (error) {
      setError('Failed to create task. Please try again.')
    } else {
      fetchTasks(username)
      setNewTask({ title: '', description: '', streak_days: 1 })
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
  }

  const handleUpdateTask = async (updatedTask: Task) => {
    const { error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .eq('id', updatedTask.id)

    if (error) {
      setError('Failed to update task. Please try again.')
    } else {
      setEditingTask(null)
      fetchTasks(username)
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      setError('Failed to delete task. Please try again.')
    } else {
      fetchTasks(username)
    }
  }

  const handleUnblockFollower = async (followerUsername: string) => {
    // In this example, we're just removing the follower from the list
    // In a real application, you might want to update a 'blocked' status in the database
    const { error } = await supabase
      .from('following')
      .delete()
      .eq('follower_username', followerUsername)
      .eq('followed_username', username)

    if (error) {
      setError('Failed to unblock follower. Please try again.')
    } else {
      fetchFollowers(username)
    }
  }

  const getCalendarData = () => {
    const data: { date: string; count: number }[] = []
    const today = new Date()
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

    for (let d = oneYearAgo; d <= today; d.setDate(d.getDate() + 1)) {
      const date = d.toISOString().split('T')[0]
      const count = checkIns.filter(ci => ci.check_in_date.startsWith(date)).length
      data.push({ date, count })
    }

    return data
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto p-4"
    >
      {!isLoggedIn ? (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Login or Create Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {!isCreatingProfile ? (
              <>
                <Input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mb-2"
                />
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-2"
                />
                <div className="flex space-x-2">
                  <Button onClick={handleLogin}>Login</Button>
                  <Button variant="outline" onClick={() => setIsCreatingProfile(true)}>Create Profile</Button>
                </div>
                <Button variant="link" onClick={() => setShowForgotPassword(true)} className="mt-2">
                  Forgot Password?
                </Button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-lg font-semibold mb-2">Create New Profile</h3>
                <div className="space-y-2">
                  <Label htmlFor="new-username">Username</Label>
                  <Input
                    id="new-username"
                    type="text"
                    placeholder="Enter desired username"
                    value={newProfile.username}
                    onChange={(e) => setNewProfile({...newProfile, username: e.target.value})}
                  />
                  <Label htmlFor="new-email">Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    placeholder="Enter your email"
                    value={newProfile.email}
                    onChange={(e) => setNewProfile({...newProfile, email: e.target.value})}
                  />
                  <Label htmlFor="new-password">Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter your password"
                    value={newProfile.password}
                    onChange={(e) => setNewProfile({...newProfile, password: e.target.value})}
                  />
                  <Label htmlFor="new-bio">Bio</Label>
                  <Textarea
                    id="new-bio"
                    placeholder="Tell us about yourself"
                    value={newProfile.bio}
                    onChange={(e) => setNewProfile({...newProfile, bio: e.target.value})}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-admin"
                      checked={newProfile.is_admin}
                      onCheckedChange={(checked) => setNewProfile({...newProfile, is_admin: checked})}
                    />
                    <Label htmlFor="is-admin">Admin Account</Label>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Button onClick={handleCreateProfile}>Create Profile</Button>
                    <Button variant="outline" onClick={() => setIsCreatingProfile(false)}>Cancel</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Welcome, {username}!</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleLogout}>Logout</Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="personal" className="mb-4">
            <TabsList>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="public">Public</TabsTrigger>
              {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
            </TabsList>
            <TabsContent value="personal">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Current Streak: {streak} days</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    placeholder="Enter today's summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={handleCheckIn}>Check In</Button>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Streak Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {getCalendarData().map((day, index) => (
                      <motion.div
                        key={day.date}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.005 }}
                        className={`w-3 h-3 rounded-sm ${
                          day.count === 0 ? 'bg-gray-100' :
                          day.count < 3 ? 'bg-green-200' :
                          day.count < 5 ? 'bg-green-300' :
                          day.count < 7 ? 'bg-green-400' : 'bg-green-500'
                        }`}
                        title={`${day.date}: ${day.count} check-in${day.count !== 1 ? 's' : ''}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Daily Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && handleDateSelect(date)}
                    className="rounded-md border"
                  />
                  {dailySummary && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <h3 className="font-semibold">Summary for {selectedDate.toDateString()}:</h3>
                      <p>{dailySummary}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <Input
                      type="text"
                      placeholder="Task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                    <Textarea
                      placeholder="Task description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Streak days"
                      value={newTask.streak_days}
                      onChange={(e) => setNewTask({...newTask, streak_days: parseInt(e.target.value)})}
                    />
                    <Button onClick={handleCreateTask}>Create Task</Button>
                  </div>
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
                      {tasks.map((task) => (
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
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="public">
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Top Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Streak</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProfiles.map((profile) => (
                        <TableRow key={profile.username}>
                          <TableCell>{profile.username}</TableCell>
                          <TableCell>{profile.streak}</TableCell>
                          <TableCell>
                            {following.includes(profile.username) ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUnfollow(profile.username)}
                              >
                                Unfollow
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setFollowUsername(profile.username)
                                  setPersonalUserId('')
                                }}
                              >
                                Follow
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Follow User</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <Input
                      type="text"
                      placeholder="Your personal user ID"
                      value={personalUserId}
                      onChange={(e) => setPersonalUserId(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Username to follow"
                      value={followUsername}
                      onChange={(e) => setFollowUsername(e.target.value)}
                    />
                    <Button onClick={handleFollow}>Follow</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {isAdmin && (
    <TabsContent value="admin">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">All Tasks</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Streak Days</TableHead>
                <TableHead>Current Streak</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.username}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.streak_days}</TableCell>
                  <TableCell>{task.current_streak}</TableCell>
                  <TableCell>{task.completed ? 'Completed' : 'In Progress'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleEditTask(task)}>Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Edit Task Dialog */}
          <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              {editingTask && (
                <EditTaskForm task={editingTask} onSubmit={handleUpdateTask} />
              )}
            </DialogContent>
          </Dialog>
                    <h3 className="text-lg font-semibold mb-2 mt-4">Followers</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {followers.map((follower) => (
                          <TableRow key={follower}>
                            <TableCell>{follower}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => handleUnblockFollower(follower)}>Unblock</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </motion.div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
          </DialogHeader>
          <p>Please contact our support team in chat for assistance with resetting your password.</p>
          <Button onClick={() => setShowForgotPassword(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}


// StreakCalendar componet 

interface CalendarData {
  date: string
  count: number
}

interface StreakCalendarProps {
  data: CalendarData[]
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ data }) => {
  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-100'
    if (count < 3) return 'bg-green-200'
    if (count < 5) return 'bg-green-300'
    if (count < 7) return 'bg-green-400'
    return 'bg-green-500'
  }

  return (
    <div className="flex flex-wrap gap-1">
      {data.map((day, index) => (
        <motion.div
          key={day.date}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.005 }}
          className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
          title={`${day.date}: ${day.count} check-in${day.count !== 1 ? 's' : ''}`}
        />
      ))}
    </div>
  )
}


interface EditTaskFormProps {
  task: Task
  onSubmit: (updatedTask: Task) => void
}

function EditTaskForm({ task, onSubmit }: EditTaskFormProps) {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      streak_days: task.streak_days,
    },
  })

  const handleSubmit = (values: z.infer<typeof taskSchema>) => {
    onSubmit({ ...task, ...values })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="streak_days"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Streak Days</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

// sql command 

// -- Create users table
// CREATE TABLE users (
//   username TEXT PRIMARY KEY,
//   email TEXT UNIQUE NOT NULL,
//   bio TEXT,
//   streak INTEGER DEFAULT 0,
//   last_check_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Create check_ins table
// CREATE TABLE check_ins (
//   id SERIAL PRIMARY KEY,
//   username TEXT REFERENCES users(username),
//   check_in_date DATE,
//   summary TEXT,
//   UNIQUE(username, check_in_date)
// );

// -- Create following table
// CREATE TABLE following (
//   id SERIAL PRIMARY KEY,
//   follower_username TEXT REFERENCES users(username),
//   followed_username TEXT REFERENCES users(username),
//   UNIQUE(follower_username, followed_username)
// );

// -- Create a function to check for existing usernames and suggest alternatives
// CREATE OR REPLACE FUNCTION check_username(desired_username TEXT)
// RETURNS TABLE (
//   is_available BOOLEAN,
//   suggestion TEXT
// ) AS $$
// DECLARE
//   base_username TEXT;
//   counter INTEGER := 1;
// BEGIN
//   IF NOT EXISTS (SELECT 1 FROM users WHERE username = desired_username) THEN
//     RETURN QUERY SELECT TRUE, desired_username::TEXT;
//     RETURN;
//   END IF;

//   base_username := regexp_replace(desired_username, '\d+$', '');
  
//   WHILE EXISTS (SELECT 1 FROM users WHERE username = (base_username || counter::TEXT)) LOOP
//     counter := counter + 1;
//   END LOOP;

//   RETURN QUERY SELECT FALSE, (base_username || counter::TEXT)::TEXT;
// END;
// $$ LANGUAGE plpgsql;

// -- Create a trigger to check username availability on insert
// CREATE OR REPLACE FUNCTION check_username_on_insert()
// RETURNS TRIGGER AS $$
// DECLARE
//   username_check RECORD;
// BEGIN
//   SELECT * INTO username_check FROM check_username(NEW.username);
  
//   IF NOT username_check.is_available THEN
//     RAISE EXCEPTION 'Username % is already taken. Suggested alternative: %', NEW.username, username_check.suggestion;
//   END IF;

//   RETURN NEW;
// END;
// $$ LANGUAGE plpgsql;

// CREATE TRIGGER username_check_trigger
// BEFORE INSERT ON users
// FOR EACH ROW
// EXECUTE FUNCTION check_username_on_insert();

// -- Create indexes for better query performance
// CREATE INDEX idx_check_ins_username ON check_ins(username);
// CREATE INDEX idx_check_ins_date ON check_ins(check_in_date);
// CREATE INDEX idx_following_follower ON following(follower_username);
// CREATE INDEX idx_following_followed ON following(followed_username);

// -- Create a view for user profiles with streak information
// CREATE VIEW user_profiles AS
// SELECT 
//   u.username,
//   u.email,
//   u.bio,
//   u.streak,
//   u.last_check_in,
//   COUNT(DISTINCT f.followed_username) AS following_count,
//   COUNT(DISTINCT f2.follower_username) AS followers_count
// FROM 
//   users u
// LEFT JOIN following f ON u.username = f.follower_username
// LEFT JOIN following f2 ON u.username = f2.followed_username
// GROUP BY 
//   u.username, u.email, u.bio, u.streak, u.last_check_in;

// -- Create a function to get user streak information
// CREATE OR REPLACE FUNCTION get_user_streak(p_username TEXT)
// RETURNS TABLE (
//   current_streak INTEGER,
//   longest_streak INTEGER,
//   total_check_ins INTEGER
// ) AS $$
// DECLARE
//   last_check_in DATE;
//   streak_start DATE;
//   current_streak INTEGER := 0;
//   longest_streak INTEGER := 0;
//   total_check_ins INTEGER := 0;
// BEGIN
//   SELECT MAX(check_in_date) INTO last_check_in
//   FROM check_ins
//   WHERE username = p_username;

//   IF last_check_in IS NULL THEN
//     RETURN QUERY SELECT 0::INTEGER, 0::INTEGER, 0::INTEGER;
//     RETURN;
//   END IF;

//   streak_start := last_check_in;
  
//   FOR i IN REVERSE 0..365 LOOP
//     IF EXISTS (
//       SELECT 1 
//       FROM check_ins 
//       WHERE username = p_username AND check_in_date = last_check_in - i
//     ) THEN
//       current_streak := current_streak + 1;
//       total_check_ins := total_check_ins + 1;
//     ELSE
//       IF current_streak > longest_streak THEN
//         longest_streak := current_streak;
//       END IF;
//       IF i > 0 THEN
//         current_streak := 0;
//       END IF;
//     END IF;
//   END LOOP;

//   IF current_streak > longest_streak THEN
//     longest_streak := current_streak;
//   END IF;

//   RETURN QUERY SELECT current_streak, longest_streak, total_check_ins;
// END;
// $$ LANGUAGE plpgsql;

// -- Example usage of the get_user_streak function:
// -- SELECT * FROM get_user_streak('username');