import React from 'react';
import { motion } from 'framer-motion';

interface MapLocationProps {
  title: string;
  description: string;
  api: string;
  features: string;
}

const MapLocation: React.FC<MapLocationProps> = ({ title, description, api, features }) => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <motion.div
      className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <iframe
            className="h-48 w-full object-cover md:w-48"
            src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=place_id:ChIJN1t_tDeuEmsRUsoyG83frY4`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
          <p className="mt-2 text-gray-500">{description}</p>
          <p className="mt-2 text-gray-500"><strong className='mt-2 text-gray-500'>API:</strong> {api}</p>
          <p className="mt-2 text-gray-500"><strong className='mt-2 text-gray-500'>Features:</strong> {features}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MapLocation;
