"use client"


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Airesume from '@/app/(docs)/resume/component/resume/NetflixResumeForGoogle';
import ResumeGenerator from '@/app/(docs)/resume/component/resume/resume';
import AiResume from './component/ai-resume';
import CoverLetterGenerator from './component/cover-letter/coverletter';
import { FileTextIcon, FileMinus } from 'lucide-react'; // Lucid React icons

const ResumeComponent: React.FC = () => {
  const [view, setView] = useState<'resume' | 'coverLetter'>('resume');

  const handleToggle = () => {
    setView((prevView) => (prevView === 'resume' ? 'coverLetter' : 'resume'));
  };

  return (
    <div className="dark:bg-black bg-white min-h-screen relative">
      {/* Animated content */}
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen max-w-screen mx-auto "
      >
        {view === 'resume' ? (
          <AiResume /> // You can switch this with Airesume or AiResume
        ) : (
          <CoverLetterGenerator />
        )}
      </motion.div>

      {/* Floating Toggle Button Dock */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggle}
          className="bg-gray-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          {view === 'resume' ? (
            <FileMinus className="w-6 h-6" />
          ) : (
            <FileTextIcon className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ResumeComponent;
