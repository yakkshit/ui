"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const QuoteCard: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://zenquotes.io/api/random');
        const data = response.data[0];
        setQuote(data.q);
        setAuthor(data.a);
      } catch (error) {
        console.error('Error fetching the quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <motion.div
      className="w-full mx-auto p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <Quote name="quote" className="text-gray-400 w-6 h-6" />
        <button
          onClick={() => window.location.reload()}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <RefreshCcw name="refresh-cw" className="w-6 h-6" />
        </button>
      </div>
      <p className="text-lg text-gray-100 mb-4">{quote}</p>
      <p className="text-sm text-gray-400 text-right">- {author}</p>
    </motion.div>
  );
};

export default QuoteCard;
