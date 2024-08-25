"use client";

// components/Reels.tsx
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Image {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ImageReelsProps {
  content: string;
}

const ImageReelsDemo: React.FC<ImageReelsProps> = ({ content }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${content}&page=${page}&per_page=10&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      const newImages = page === 1 ? data.results : [...images, ...data.results];
      setImages(newImages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
    fetchImages();
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchImages();
    }
  }, [page]);

  if (loading && images.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center overflow-y-scroll h-screen snap-y snap-mandatory scroll-smooth">
      {images.map((image) => (
        <motion.div
          key={image.id}
          className="w-full h-screen flex justify-center items-center snap-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className="object-cover max-w-[1179px] max-h-[2556px] w-full h-full aspect-[7/14] rounded-lg"
          />
        </motion.div>
      ))}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <ChevronDown className="h-10 w-10 text-gray-500 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ImageReelsDemo;
