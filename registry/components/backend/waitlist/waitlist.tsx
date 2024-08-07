"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useToast } from "@/components/ui/use-toast"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl!, supabaseKey!)

interface WaitlistProps {
  emailPlaceholder?: string;
  buttonText?: string;
  successRedirectUrl?: string;
  inputClassName?: string;
  buttonClassName?: string;
  formClassName?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function Waitlist({
  emailPlaceholder = "Email",
  buttonText = "Subscribe",
  successRedirectUrl = "https://www.cedzlabs.com",
  inputClassName = "",
  buttonClassName = "",
  formClassName = "",
  onSuccess,
  onError,
}: WaitlistProps) {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (error) {
      console.error('Error subscribing:', error)
      toast({
        description: "Error subscribing: " + error.message,
      })
      if (onError) onError(error)
    } else {
      toast({
        description: "Successfully subscribed! You're added to the waitlist.",
      })
      setEmail('')
      if (onSuccess) onSuccess()
      router.push(successRedirectUrl) // Redirect after successful subscription
    }
  }

  return (
    <form onSubmit={handleSubscribe} className={`flex gap-2 ${formClassName}`}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={emailPlaceholder}
        className={`rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10 mt-4 bg-neutral-950 placeholder:text-neutral-700 ${inputClassName}`}
      />
      <Button
        type="submit"
        className={`rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10 mt-4 placeholder:text-neutral-700 ${buttonClassName}`}
      >
        {buttonText}
      </Button>
    </form>
  )
}

export default Waitlist;
