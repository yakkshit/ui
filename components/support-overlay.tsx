import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { Volume2, VolumeX } from 'lucide-react';
import { BorderBeam } from './ui/borderbeam';


interface VideoContainerProps {
  videoSrc: string;
  supportLink: string;
}

const SupportOverlay: React.FC<VideoContainerProps> = ({ videoSrc, supportLink }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Mute by default
  const [showButton, setShowButton] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    setShowButton(true);
  };

  const handleShow = () => {
    setIsVisible(true);
    setShowButton(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {isVisible ? (
        <motion.div
          className="fixed bottom-4 right-4 flex items-center justify-center w-[150px] h-[120px] p-2 rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <ReactPlayer
            url={videoSrc}
            playing={true}
            muted={isMuted}
            width="100%"
            height="100%"
            controls={false} // Hide default controls
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-600 bg-opacity-70 text-white rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Link href={supportLink}>
              Buy a ☕️
            </Link>
          </motion.div>
          <button
            className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={handleClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute top-2 left-2 text-white bg-gray-800 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <BorderBeam size={80} duration={12} delay={9} />
        </motion.div>
      ) : (
        <button
          className="fixed bottom-4 right-4 text-white bg-blue-500 hover:bg-blue-400 rounded-lg w-20 h-12 flex items-center justify-center"
          onClick={handleShow}
        >
          Buy me a ☕️
        </button>
      )}
    </>
  );
};

export default SupportOverlay;
