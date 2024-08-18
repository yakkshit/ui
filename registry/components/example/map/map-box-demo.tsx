"use client";

import { motion } from 'framer-motion';
import React from 'react';

const Demo: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-green-400 hover:via-blue-500 hover:to-purple-500 mb-4">
          Coming Soon
        </h1>
        <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-green-400 hover:via-blue-500 hover:to-purple-500">
          Stay tuned for something amazing!
        </p>
      </motion.div>
    </div>
  );
};

export default Demo;
