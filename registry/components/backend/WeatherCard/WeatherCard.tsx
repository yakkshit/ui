"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudLightning, CloudRain, CloudSnow, Wind, Droplet, MapPin, Search } from 'lucide-react';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WeatherCardProps {
  city: string;
}

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState(city);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        if (!apiKey) {
          throw new Error('API key is missing');
        }
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchCity]);

  if (loading) return <div className="flex items-center justify-center h-48">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-48">Error: {error}</div>;

  const weatherDescription = weatherData?.weather[0].description || 'Unknown';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputCity = (e.target as any).elements.city.value.trim();
    if (inputCity !== "") {
      setSearchCity(inputCity);
    }
    setSearchOpen(false);
  };

  const renderWeatherIcon = (weatherMain: string) => {
    switch (weatherMain) {
      case 'Clear':
        return <Sun className="w-10 h-10 text-yellow-500" />;
      case 'Clouds':
        return <Cloud className="w-10 h-10 text-gray-400" />;
      case 'Rain':
        return <CloudRain className="w-10 h-10 text-blue-500" />;
      case 'Thunderstorm':
        return <CloudLightning className="w-10 h-10 text-yellow-400" />;
      case 'Snow':
        return <CloudSnow className="w-10 h-10 text-white" />;
      case 'Wind':
        return <Wind className="w-10 h-10 text-gray-400" />;
      default:
        return <Cloud className="w-10 h-10 text-gray-400" />;
    }
  };

  return (
    <div className="relative max-w-xs mx-auto">
      <div className="absolute -top-10 right-0 transform translate-y-[-2px] z-10">
        {!searchOpen ? (
          <button
            className={cn(
              "bg-white bg-opacity-30 dark:bg-gray-700 dark:bg-opacity-50",
              "backdrop-filter backdrop-blur-lg rounded-full p-2 shadow-lg",
              "text-black dark:text-yellow-300 hover:text-blue-500 dark:hover:text-yellow-500"
            )}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-6 h-6" />
          </button>
        ) : (
          <form
            className={cn(
              "flex items-center bg-white bg-opacity-70 dark:bg-gray-700 dark:bg-opacity-50",
              "backdrop-filter backdrop-blur-lg rounded-full p-2 shadow-lg"
            )}
            onSubmit={handleSearch}
          >
            <input
              type="text"
              name="city"
              placeholder="Search city..."
              className="bg-transparent border-none text-gray placeholder-gray-500 focus:ring-0 focus:outline-none dark:text-gray-300"
            />
            <button type="submit" className="ml-2 text-white hover:text-blue-300 dark:hover:text-blue-500">
              <Search className="w-5 h-5" />
            </button>
          </form>
        )}
      </div>

      <motion.div
        className={cn(
          "relative p-6 bg-white bg-opacity-10 dark:bg-gray-800 dark:bg-opacity-20",
          "backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg",
          "hover:shadow-[0_0_15px_10px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_15px_10px_rgba(255,255,255,0.1)]",
          "transition-shadow duration-300 animate-rotateGlow"
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.div
            className="text-black dark:text-yellow-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {renderWeatherIcon(weatherData?.weather[0].main || 'Unknown')}
          </motion.div>
          <div className="text-black dark:text-gray-300">
            <div className="text-5xl font-bold relative" style={{ top: '2px' }}>
              {Math.round(weatherData?.main.temp || 0)}°C
            </div>
            <div className="text-lg capitalize">{weatherDescription}</div>
          </div>
        </div>
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" />
            <span>Wind Speed: {weatherData?.wind.speed} m/s</span>
          </div>
          <div className="flex items-center">
            <Droplet className="w-5 h-5 mr-2" />
            <span>Humidity: {weatherData?.main.humidity}%</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{weatherData?.name}</span>
          </div>
          <div className="flex items-center">
            <span>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherCard;
