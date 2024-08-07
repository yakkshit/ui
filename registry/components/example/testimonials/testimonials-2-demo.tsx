'use client';

import { MarqueeTestimonials } from "../../backend/testimonials/Testimonials";

export default function Testimonials2Demo() {
    return (
      <div className="container p-4 justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
        <MarqueeTestimonials
          duration={20}
          ease="linear"
          repeat={Infinity}
          bgColor="bg-white dark:bg-gray-800"
          textColor="text-gray-700 dark:text-gray-300"
          borderColor="border-gray-300 dark:border-gray-600"
          starColor="text-yellow-500"
          starEmptyColor="text-gray-300"
        />
      </div>
    );
}
