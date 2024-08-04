'use client';

import React from 'react';
import InfiniteImageSlider from '../frontend/slider';

const images = [
  'https://github.com/yakkshit/canonical-assignmnet/blob/main/images/DSC_0064.JPG?raw=true',
  'https://github.com/yakkshit/canonical-assignmnet/blob/main/images/movies-hollywood-movies-wallpaper-preview.jpg?raw=true',
];

const SliderDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <InfiniteImageSlider
        images={images}
        autoPlay={true}
        autoPlayInterval={5000}
        showArrows={true}
        showIndicators={true}
        className="w-full h-64"
      />
    </div>
  );
};

export default SliderDemo;
