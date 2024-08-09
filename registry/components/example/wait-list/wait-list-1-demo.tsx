'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import 'tailwindcss/tailwind.css';
import Waitlist from '../../backend/waitlist/waitlist';
import { fontSans } from '@/lib/fonts';


const particlesOptions = {
  particles: {
    number: {
      value: 100,
    },
    size: {
      value: 3,
    },
    move: {
      speed: 1,
    },
    line_linked: {
      enable: true,
      distance: 150,
    },
  },
};

const Waitlist1Demo: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <Particles className="absolute inset-0 z-0" options={particlesOptions} />
      <motion.div
        className="relative w-full z-10 p-8 bg-white dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 rounded-lg shadow-lg text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-4xl font-bold mb-4 ${fontSans.className} dark:text-white`}>
          Join Our Waitlist
        </h1>
        <p className="mb-6 text-lg dark:text-gray-300">
          Be the first to know when we launch. Subscribe to our newsletter!
        </p>
        <Waitlist
          emailPlaceholder="Enter your email"
          buttonText="Subscribe"
          successRedirectUrl="https://cedzlabs.com/thank-you"
          inputClassName="custom-input-class"
          buttonClassName="custom-button-class"
          formClassName="custom-form-class"
          onSuccess={() => console.log("Successfully subscribed!")}
          onError={(error) => console.error("Subscription error:", error)}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth) * 100;
          const y = (clientY / window.innerHeight) * 100;
          document.documentElement.style.setProperty('--mouse-x', `${x}%`);
          document.documentElement.style.setProperty('--mouse-y', `${y}%`);
        }}
      />
    </div>
  );
};

export default Waitlist1Demo;
