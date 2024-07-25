import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselCardProps {
  images: string[];
}

const Slider: FC<CarouselCardProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prevImage}
          className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={nextImage}
          className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Slider;
