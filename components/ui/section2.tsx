"use client";

import { FC } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { Star } from 'lucide-react';
import ReactPlayer from 'react-player';
import Price from '@/registry/components/frontend/price';

const Section2: FC = () => {
  return (
    // bg-opacity-10 for glass morphic effect
    <motion.div
      className="mx-auto w-full p-8 bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        {/* About */}
      <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <motion.span
                  className="rounded-full uppercase bg-pink-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  Early Access
                </motion.span>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                    About Us
                  </span>
                </h1>
              </div>
              <p className="text-base text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Immerse yourself in superior audio quality with the StellarGlo Wireless Bluetooth Earbuds. These sleek and lightweight earbuds deliver crystal-clear sound and rich bass.
              </p>
            </div>
            <div className="border-t border-gray-700"></div>
            <div className="flex space-x-4 items-center text-white">
              <div className="flex items-center space-x-2">
                <div className="flex flex-shrink-0 -space-x-1">
                  <img
                    loading="lazy"
                    width="400"
                    height="400"
                    decoding="async"
                    className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                    style={{ color: 'transparent' }}
                    src="https://randomuser.me/api/portraits/men/29.jpg"
                    alt="User 1"
                  />
                  <img
                    loading="lazy"
                    width="400"
                    height="400"
                    decoding="async"
                    className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                    style={{ color: 'transparent' }}
                    src="https://randomuser.me/api/portraits/men/90.jpg"
                    alt="User 2"
                  />
                  <img
                    loading="lazy"
                    width="100"
                    height="100"
                    decoding="async"
                    className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                    style={{ color: 'transparent' }}
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="User 3"
                  />
                  <img
                    loading="lazy"
                    width="200"
                    height="200"
                    decoding="async"
                    className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                    style={{ color: 'transparent' }}
                    src="https://randomuser.me/api/portraits/men/5.jpg"
                    alt="User 4"
                  />
                </div>
                <span className="flex-shrink-0 text-xs font-medium leading-5">+15</span>
              </div>
              <div className="h-4 border-l border-gray-700"></div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                ))}
              </div>
              <div className="h-4 border-l border-gray-700"></div>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://vercel.com/button"
                  className="w-32 h-8 md:w-48 md:h-12 lg:w-64 lg:h-16"
                  width="250"
                  height="54"
                  alt="Product Hunt"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full col-span-6">
          <div className="px-6 h-72 lg:h-full w-full max-w-2xl col-span-6 flex items-center mx-auto">
            <div  className='rounded-lg overflow-hidden' style={{ width: '100%', height: '90%' }}>
              <ReactPlayer
                url="https://www.youtube.com/watch?v=mr15Xzb1Ook"
                width="100%"
                height="100%"
                controls={true}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <motion.div
       className="py-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center"
       initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
        <div className="flex justify-center">
            <img
            src="https://pagedone.io/asset/uploads/1691054543.png"
            alt="Dashboard image"
          />
        </div>
    </motion.div> */}
    </motion.div>
  );
};

export default Section2;
