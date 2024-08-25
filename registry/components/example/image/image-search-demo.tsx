"use client";

// components/ImageSearch.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchIcon, XIcon } from 'lucide-react';
import { ThemeProvider } from 'next-themes';

interface ImageSearchProps {
  type?: 'visible' | 'invisible';
}

const ImageSearchDemo: React.FC<ImageSearchProps> = ({ type = 'visible' }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cachedImages, setCachedImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [searchBarVisible, setSearchBarVisible] = useState(type === 'visible');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const placeholders = [
    "Search for images...",
    "Find your favorite photos...",
    "Explore beautiful pictures...",
    "Discover amazing visuals...",
    "use ⌘i to hide the search bar",
    "use ctrl+i to hide the search bar",
    "click on image to view larger",
  ];

  useEffect(() => {
    if (cachedImages.length > 0) {
      setImages(cachedImages);
    }
  }, [cachedImages]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    const handleToggleSearchBar = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'i') {
        setSearchBarVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', handleToggleSearchBar);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', handleToggleSearchBar);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTyping) {
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
      }
    }, 3000); // Change placeholder every 3 seconds

    return () => clearInterval(interval);
  }, [placeholders.length, isTyping]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    setHasMore(true);

    if (query.trim() === '') {
      setImages(cachedImages);
      setLoading(false);
      return;
    }

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=1&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();
    setImages(data.results);
    setCachedImages(data.results);
    setLoading(false);
    if (type === 'invisible') {
      setSearchBarVisible(false);
    }
    if (data.results.length === 0) {
      setHasMore(false);
    }
  };

  const loadMoreImages = async () => {
    setLoading(true);
    const nextPage = page + 1;

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${nextPage}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
    const data = await response.json();
    setImages((prevImages) => [...prevImages, ...data.results]);
    setCachedImages((prevImages) => [...prevImages, ...data.results]);
    setPage(nextPage);
    setLoading(false);
    if (data.results.length === 0) {
      setHasMore(false);
    }
  };

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000); // Set isTyping to false after 1 second of inactivity
  };

  return (
    <ThemeProvider attribute="class">
      <div className="container mx-auto p-4">
        {searchBarVisible && (
          <form onSubmit={handleSearch} className="relative flex items-center mb-4 bg-white dark:bg-gray-800 shadow-md rounded-full overflow-hidden max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.input
                key={placeholderIndex}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={placeholders[placeholderIndex]}
                className="flex-grow p-4 text-gray-700 dark:text-gray-300 focus:outline-none bg-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <button type="submit" className="absolute right-0 top-0 h-full flex items-center justify-center px-4 dark:text-white text-gray-500">
              <SearchIcon className="h-6 w-6" />
            </button>
          </form>
        )}

        {loading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh] p-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {images.map((image) => (
                <motion.div key={image.id} className="relative" whileHover={{ scale: 1.05 }} onClick={() => handleImageClick(image)}>
                  <img src={image.urls.small} alt={image.alt_description} className="w-full h-full object-cover rounded-md shadow-md cursor-pointer" />
                </motion.div>
              ))}
            </motion.div>
            {images.length > 0 && hasMore && (
              <div className="text-center mt-4">
                <button
                  onClick={loadMoreImages}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleClosePopup}>
            <div className="relative">
              <button
                className="absolute top-2 right-2 text-white bg-gray-800 bg-opacity-50 rounded-full p-2 shadow-lg"
                onClick={handleClosePopup}
              >
                <XIcon className="h-8 w-8" />
              </button>
              <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} className="max-w-full max-h-full rounded-md shadow-md" />
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ImageSearchDemo;
