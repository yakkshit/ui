"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Video {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    name: string;
    url: string;
  };
  video_files: {
    link: string;
    quality: string;
  }[];
}

interface VideoWidgetProps {
  query: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  size?: 'large' | 'medium' | 'small';
  locale?: string;
  page?: number;
  perPage?: number;
}

const VideoWidget: React.FC<VideoWidgetProps> = ({
  query,
  orientation,
  size,
  locale,
  page = 1,
  perPage = 1,
}) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          query,
          per_page: perPage.toString(),
          page: page.toString(),
          ...(orientation && { orientation }),
          ...(size && { size }),
          ...(locale && { locale }),
        });

        console.log('Request URL:', `https://api.pexels.com/videos/search?${params.toString()}`);

        const response = await axios.get(
          `https://api.pexels.com/videos/search?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PEXELS_API_KEY}`,
            },
          }
        );

        console.log('API Response:', response.data);

        setVideo(response.data.videos[0]);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Error fetching video. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [query, orientation, size, locale, page, perPage]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const videoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-4">Video Widget</h2>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </motion.div>
        )}
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-center"
          >
            {error}
          </motion.div>
        )}
        {!loading && !error && video && (
          <motion.div
            key="video"
            variants={videoVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <video
              src={video.video_files[0].link}
              poster={video.image}
              controls
              className="w-full rounded-lg shadow-md"
            >
              Your browser does not support the video tag.
            </video>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{video.user.name}</h3>
              <p className="text-sm opacity-75">
                Duration: {video.duration} seconds
              </p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                View on Pexels
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoWidget;
