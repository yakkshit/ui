"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Quote {
  quote: string;
  author: string;
}

const QuotationDemo: React.FC = () => {
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
    <div className="flex items-center justify-center w-auto">
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
      </motion.div>
    </div>
  );
};

export default QuotationDemo;
