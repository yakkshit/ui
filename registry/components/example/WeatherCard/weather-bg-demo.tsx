'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import axios from 'axios'
import { MapPin, Sun, Moon } from 'lucide-react'

// Note: Replace 'YOUR_WEATHER_API_KEY' and 'YOUR_PIXABAY_API_KEY' with actual API keys
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY

interface WeatherData {
  temperature: number
  description: string
  icon: string
  location: string
  main: string
}

interface VideoBackgroundProps {
  videoUrls: string[]
  effect: 'normal' | 'glassmorphic'
  opacity: number
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrls, effect, opacity }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [videoUrls.length])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.play().catch(error => console.error('Error playing video:', error))
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [currentVideoIndex])

  const videoClassName = "absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
  const overlayClassName = `absolute inset-0 ${effect === 'glassmorphic' ? 'backdrop-blur-md' : ''}`

  return (
    <>
      {videoUrls.map((url, index) => (
        <video
          key={url}
          ref={el => videoRefs.current[index] = el}
          src={url}
          loop
          muted
          playsInline
          className={videoClassName}
          style={{
            opacity: index === currentVideoIndex ? opacity / 100 : 0,
            zIndex: index === currentVideoIndex ? 1 : 0
          }}
        />
      ))}
      <div className={overlayClassName} style={{ backgroundColor: `rgba(0, 0, 0, ${(100 - opacity) / 200})` }} />
    </>
  )
}

interface WeatherHeroProps {
  children: React.ReactNode
  effect?: 'normal' | 'glassmorphic'
  opacity?: number
}

const WeatherHero: React.FC<WeatherHeroProps> = ({ children, effect = 'normal', opacity = 100 }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [isNight, setIsNight] = useState<boolean>(false)
  const controls = useAnimation()

  const fetchVideos = useCallback(async (query: string) => {
    try {
      const pixabayResponse = await axios.get(
        `https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=5&video_type=all&category=nature`
      )
      if (pixabayResponse.data.hits && pixabayResponse.data.hits.length > 0) {
        return pixabayResponse.data.hits.map((hit: any) => hit.videos.large.url)
      }
      return []
    } catch (error) {
      console.error('Error fetching videos:', error)
      return []
    }
  }, [])

  const fetchWeatherData = useCallback(async (latitude: number, longitude: number) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      )

      const currentHour = new Date().getHours()
      const isNightTime = currentHour < 6 || currentHour >= 18
      setIsNight(isNightTime)

      const weatherData: WeatherData = {
        temperature: weatherResponse.data.main.temp,
        description: weatherResponse.data.weather[0].description,
        icon: weatherResponse.data.weather[0].icon,
        location: weatherResponse.data.name,
        main: weatherResponse.data.weather[0].main
      }
      setWeather(weatherData)

      const timeOfDay = isNightTime ? 'night' : 'day'
      const weatherCondition = weatherData.main.toLowerCase()
      let videoQuery = `${timeOfDay} ${weatherCondition} weather`

      let videos = await fetchVideos(videoQuery)
      if (videos.length === 0) {
        videos = await fetchVideos(`${timeOfDay} nature`)
      }
      if (videos.length === 0) {
        videos = await fetchVideos('nature landscape')
      }
      if (videos.length > 0) {
        setVideoUrls(videos)
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }, [fetchVideos])

  const handleLocationChange = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  }, [fetchWeatherData])

  useEffect(() => {
    handleLocationChange()
  }, [handleLocationChange])

  useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 0.5 } })
  }, [controls, weather])

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {videoUrls.length > 0 && <VideoBackground videoUrls={videoUrls} effect={effect} opacity={opacity} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        className="relative z-10 w-full h-full flex flex-col"
      >
        {weather && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 p-4 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center space-x-2">
              {weather.location} {isNight ? <Moon size={24} /> : <Sun size={24} />}
            </h2>            <div className="flex items-center">
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="w-12 h-12 mr-2"
              />
              <div>
                <p className="text-2xl sm:text-3xl font-bold">{weather.temperature.toFixed(1)}°C</p>
                <p className="text-sm sm:text-base capitalize">{weather.description}</p>
              </div>
            </div>
          </div>
        )}
        <div className="relative z-20 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

export default WeatherHero;