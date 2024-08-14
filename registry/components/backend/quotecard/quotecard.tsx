// components/Quote.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

interface Quote {
  quote: string;
  author: string;
}

const QuoteCard: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const quote = {
        quote: data.quote,
        author: data.author
      };
      setQuote(quote);
      setIsFlipped(true);
      setTimeout(() => setIsFlipped(false), 600); // Reset flip state after animation
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="flex items-center justify-cente">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center backdrop-blur-lg bg-opacity-60 dark:bg-opacity-60"
      >
        {quote ? (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-300"
            >
              "{quote.quote}"
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-400"
            >
              - {quote.author}
            </motion.p>
          </>
        ) : (
          <p className="text-gray-900 dark:text-gray-300">Loading...</p>
        )}
        <motion.button
          onClick={fetchQuote}
          whileHover={{ scale: 1.1, boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.5)' }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <RefreshCw className="mr-2" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default QuoteCard;
