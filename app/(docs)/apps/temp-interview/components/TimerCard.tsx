import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function TimerCard() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [inputTime, setInputTime] = useState('')

  useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const startTimer = () => {
    if (inputTime) {
      setTime(parseInt(inputTime) * 60)
      setInputTime('')
    }
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setTime(0)
    setIsRunning(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <div className="text-4xl font-bold text-center">{formatTime(time)}</div>
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="Set time (minutes)"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <Button onClick={startTimer} disabled={isRunning}>Start</Button>
        <Button onClick={stopTimer} disabled={!isRunning}>Stop</Button>
        <Button onClick={resetTimer}>Reset</Button>
      </div>
    </div>
  )
}