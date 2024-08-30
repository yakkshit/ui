'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { motion } from 'framer-motion'
import { Moon, Sun, ZoomIn, ZoomOut, Compass } from 'lucide-react'
import { useTheme } from 'next-themes'

// Make sure to add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local file
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

export default function MapComponentDemo() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom
    })

    map.current.on('move', () => {
      if (map.current) {
        setLng(parseFloat(map.current.getCenter().lng.toFixed(4)))
        setLat(parseFloat(map.current.getCenter().lat.toFixed(4)))
        setZoom(parseFloat(map.current.getZoom().toFixed(2)))
      }
    })
  }, [theme])

  useEffect(() => {
    if (map.current) {
      map.current.setStyle(theme === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10')
    }
  }, [theme])

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut()
    }
  }

  const handleResetNorth = () => {
    if (map.current) {
      map.current.resetNorth()
    }
  }

  const handleSetTokyo = async () => {
    const tokyoCoords = { lng: 139.6917, lat: 35.6895 }
    if (map.current) {
      map.current.setCenter([tokyoCoords.lng, tokyoCoords.lat])
      setLng(tokyoCoords.lng)
      setLat(tokyoCoords.lat)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-0 left-0 m-4 p-2 bg-background/80 backdrop-blur-sm rounded-md shadow-md">
        <div className="text-sm font-mono">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <motion.div 
        className="absolute bottom-4 right-4 flex flex-col gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={handleZoomIn}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background/100 transition-colors"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background/100 transition-colors"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
        <button
          onClick={handleResetNorth}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background/100 transition-colors"
        >
          <Compass className="w-6 h-6" />
        </button>
        <button
          onClick={handleSetTokyo}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background/100 transition-colors"
        >
          Set Tokyo
        </button>
      </motion.div>
    </div>
  )
}
