import { FC } from 'react';
import { motion } from 'framer-motion';

interface TextScrollProps {
  text: string;
  speed?: number; // Speed of the scrolling effect
  className?: string; // Additional styles for the text
}

interface TextZoomImageProps {
  imageUrl: string;
  text: string;
  className?: string; // Additional styles for the text
  imageClassName?: string; // Additional styles for the image
}

const TextScroll: FC<TextScrollProps> = ({ text, speed = 50, className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: ['100%', '-100%'] }}
        transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
        className="inline-block"
      >
        {text}
      </motion.div>
    </div>
  );
};

const TextZoomImage: FC<TextZoomImageProps> = ({ imageUrl, text, className = '', imageClassName = '' }) => {
  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
      <img src={imageUrl} alt="Background" className={`absolute inset-0 w-full h-full object-cover ${imageClassName}`} />
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ${className}`}
      >
        <span className="text-white text-2xl font-bold">{text}</span>
      </motion.div>
    </div>
  );
};

export { TextScroll, TextZoomImage };
