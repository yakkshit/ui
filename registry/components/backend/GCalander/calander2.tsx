// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/A4uaWaA9taJ
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// "use client"

// import { JSX, SVGProps, useState } from "react"
// import Link from "next/link"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Calendar } from "@/components/ui/calendar"
// import { Textarea } from "@/components/ui/textarea"
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

// export default function Component() {
//   const [events, setEvents] = useState([
//     {
//       id: 1,
//       title: "Weekly Team Meeting",
//       date: "2024-09-05",
//       time: "14:00",
//       location: "Conference Room A",
//       attendees: ["john@example.com", "jane@example.com", "bob@example.com"],
//     },
//     {
//       id: 2,
//       title: "Client Presentation",
//       date: "2024-09-10",
//       time: "10:00",
//       location: "Main Office",
//       attendees: ["client@example.com", "john@example.com", "jane@example.com"],
//     },
//     {
//       id: 3,
//       title: "Quarterly Review",
//       date: "2024-09-20",
//       time: "16:00",
//       location: "Virtual",
//       attendees: ["john@example.com", "jane@example.com", "bob@example.com", "alice@example.com"],
//     },
//   ])
//   const [user, setUser] = useState({
//     name: "John Doe",
//     email: "john@example.com",
//     avatar: "/placeholder-user.jpg",
//     preferences: {
//       notifications: true,
//       darkMode: false,
//     },
//   })
//   const [search, setSearch] = useState("")
//   const [searchResults, setSearchResults] = useState([])
//   const [feedback, setFeedback] = useState("")
//   const handleEventCreate = (event) => {
//     setEvents([...events, event])
//   }
//   const handleEventUpdate = (eventId, updatedEvent) => {
//     setEvents(events.map((event) => (event.id === eventId ? updatedEvent : event)))
//   }
//   const handleEventDelete = (eventId) => {
//     setEvents(events.filter((event) => event.id !== eventId))
//   }
//   const handleUserUpdate = (updatedUser) => {
//     setUser(updatedUser)
//   }
//   const handleSearch = (query) => {
//     setSearch(query)
//     setSearchResults([
//       ...events.filter((event) => event.title.toLowerCase().includes(query.toLowerCase())),
//       ...(user.name.toLowerCase().includes(query.toLowerCase()) ? [user] : []),
//     ])
//   }
//   const handleFeedback = (feedback) => {
//     setFeedback(feedback)
//   }
//   return (
//     <div className="flex h-screen w-full flex-col">
//       <header className="bg-background border-b border-muted-foreground/10 px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Link href="#" className="flex items-center gap-2" prefetch={false}>
//             <MessageSquareIcon className="w-6 h-6" />
//             <span className="font-bold text-lg">Chat App</span>
//           </Link>
//           <div className="relative">
//             <Input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="pl-8 pr-4 py-2 rounded-md bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
//             />
//             <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon">
//             <BellIcon className="w-6 h-6" />
//             <span className="sr-only">Notifications</span>
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Avatar className="w-8 h-8">
//                   <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
//                   <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
//                 </Avatar>
//                 <span className="sr-only">User menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuItem>
//                 <Link href="#" className="flex items-center gap-2" prefetch={false}>
//                   <UserIcon className="w-4 h-4" />
//                   <span>Profile</span>
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Link href="#" className="flex items-center gap-2" prefetch={false}>
//                   <SettingsIcon className="w-4 h-4" />
//                   <span>Settings</span>
//                 </Link>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start"
//                   onClick={() =>
//                     handleUserUpdate({
//                       ...user,
//                       preferences: { ...user.preferences, darkMode: !user.preferences.darkMode },
//                     })
//                   }
//                 >
//                   <SunMoonIcon className="w-4 h-4" />
//                   <span>{user.preferences.darkMode ? "Light Mode" : "Dark Mode"}</span>
//                 </Button>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-red-500"
//                   onClick={() => alert("Logged out")}
//                 >
//                   <LogOutIcon className="w-4 h-4" />
//                   <span>Logout</span>
//                 </Button>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </header>
//       <div className="flex-1 grid grid-cols-[300px_1fr] gap-4 p-4">
//         <div className="bg-background rounded-lg shadow-sm">
//           <div className="border-b border-muted-foreground/10 px-4 py-3 flex items-center justify-between">
//             <h2 className="text-lg font-medium">Events</h2>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() =>
//                 handleEventCreate({
//                   id: events.length + 1,
//                   title: "New Event",
//                   date: "2024-09-01",
//                   time: "10:00",
//                   location: "",
//                   attendees: [],
//                 })
//               }
//             >
//               <PlusIcon className="w-5 h-5" />
//               <span className="sr-only">Create Event</span>
//             </Button>
//           </div>
//           <div className="p-4 space-y-4">
//             {events.map((event) => (
//               <div key={event.id} className="bg-muted rounded-md p-4 flex flex-col gap-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-medium">{event.title}</h3>
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleEventUpdate(event.id, { ...event, date: "2024-09-12", time: "14:00" })}
//                     >
//                       <FilePenIcon className="w-4 h-4" />
//                       <span className="sr-only">Edit Event</span>
//                     </Button>
//                     <Button variant="ghost" size="icon" onClick={() => handleEventDelete(event.id)}>
//                       <TrashIcon className="w-4 h-4" />
//                       <span className="sr-only">Delete Event</span>
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="text-muted-foreground text-sm">
//                   {event.date} at {event.time} - {event.location}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm">
//                   <UserIcon className="w-4 h-4" />
//                   {event.attendees.join(", ")}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="bg-background rounded-lg shadow-sm">
//           <div className="border-b border-muted-foreground/10 px-4 py-3 flex items-center justify-between">
//             <h2 className="text-lg font-medium">Calendar</h2>
//             <Button variant="ghost" size="icon">
//               <FilterIcon className="w-5 h-5" />
//               <span className="sr-only">Filter Events</span>
//             </Button>
//           </div>
//           <div className="p-4">
//             <Calendar
//               initialFocus
//               events={events.map((event) => ({
//                 id: event.id,
//                 title: event.title,
//                 date: event.date,
//                 time: event.time,
//               }))}
//               onEventClick={(event: { id: any }) => handleEventUpdate(event.id, event)}
//             />
//           </div>
//         </div>
//       </div>
//       <footer className="bg-background border-t border-muted-foreground/10 px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon">
//             <PaperclipIcon className="w-5 h-5" />
//             <span className="sr-only">Attach File</span>
//           </Button>
//           <Button variant="ghost" size="icon">
//             <SmileIcon className="w-5 h-5" />
//             <span className="sr-only">Add Emoji</span>
//           </Button>
//         </div>
//         <div className="relative flex-1">
//           <Textarea
//             placeholder="Type your message..."
//             className="pl-8 pr-16 py-2 rounded-md bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
//           />
//           <Button className="absolute right-2 top-1/2 -translate-y-1/2">
//             <SendIcon className="w-5 h-5" />
//             <span className="sr-only">Send Message</span>
//           </Button>
//         </div>
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon">
//             <MicIcon className="w-5 h-5" />
//             <span className="sr-only">Record Audio</span>
//           </Button>
//           <Button variant="ghost" size="icon">
//             <VideoIcon className="w-5 h-5" />
//             <span className="sr-only">Start Video</span>
//           </Button>
//         </div>
//       </footer>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="ghost" size="icon" className="fixed bottom-4 right-4">
//             <MessageSquareIcon className="w-6 h-6" />
//             <span className="sr-only">Feedback</span>
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-96 p-4">
//           <h3 className="text-lg font-medium mb-4">Feedback</h3>
//           <Textarea
//             placeholder="Let us know how we can improve the chat app..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             className="mb-4"
//           />
//           <div className="flex justify-end gap-2">
//             <Button variant="ghost">Cancel</Button>
//             <Button onClick={() => handleFeedback(feedback)}>Submit</Button>
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }

// function BellIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
//       <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
//     </svg>
//   )
// }


// function FilePenIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
//       <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//       <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
//     </svg>
//   )
// }


// function FilterIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//     </svg>
//   )
// }


// function LogOutIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//       <polyline points="16 17 21 12 16 7" />
//       <line x1="21" x2="9" y1="12" y2="12" />
//     </svg>
//   )
// }


// function MessageSquareIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//     </svg>
//   )
// }


// function MicIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
//       <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//       <line x1="12" x2="12" y1="19" y2="22" />
//     </svg>
//   )
// }


// function PaperclipIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
//     </svg>
//   )
// }


// function PlusIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="M12 5v14" />
//     </svg>
//   )
// }


// function SearchIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   )
// }


// function SendIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m22 2-7 20-4-9-9-4Z" />
//       <path d="M22 2 11 13" />
//     </svg>
//   )
// }


// function SettingsIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   )
// }


// function SmileIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <path d="M8 14s1.5 2 4 2 4-2 4-2" />
//       <line x1="9" x2="9.01" y1="9" y2="9" />
//       <line x1="15" x2="15.01" y1="9" y2="9" />
//     </svg>
//   )
// }


// function SunIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="4" />
//       <path d="M12 2v2" />
//       <path d="M12 20v2" />
//       <path d="m4.93 4.93 1.41 1.41" />
//       <path d="m17.66 17.66 1.41 1.41" />
//       <path d="M2 12h2" />
//       <path d="M20 12h2" />
//       <path d="m6.34 17.66-1.41 1.41" />
//       <path d="m19.07 4.93-1.41 1.41" />
//     </svg>
//   )
// }


// function SunMoonIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
//       <path d="M12 2v2" />
//       <path d="M12 20v2" />
//       <path d="m4.9 4.9 1.4 1.4" />
//       <path d="m17.7 17.7 1.4 1.4" />
//       <path d="M2 12h2" />
//       <path d="M20 12h2" />
//       <path d="m6.3 17.7-1.4 1.4" />
//       <path d="m19.1 4.9-1.4 1.4" />
//     </svg>
//   )
// }


// function TrashIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 6h18" />
//       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//     </svg>
//   )
// }


// function UserIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   )
// }


// function VideoIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
//       <rect x="2" y="6" width="14" height="12" rx="2" />
//     </svg>
//   )
// }