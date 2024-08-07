'use client';

import { TestimonialsSlider } from "../../backend/testimonials/Testimonials";

export default function Testimonials1Demo() {
    return (
      <div className="container p-4 flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Testimonials</h1>
        <TestimonialsSlider 
          bgColor="bg-white dark:bg-gray-800"
          textColor="text-gray-700 dark:text-gray-300"
          borderColor="border-gray-300 dark:border-gray-600"
          starColor="text-yellow-500"
          starEmptyColor="text-gray-300"
        />
      </div>
    );
}
