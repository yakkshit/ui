"use client";

import React, { FC } from 'react';
import WeatherCard from '../../backend/WeatherCard/WeatherCard';

const WeatherCardDemo: FC = () => {
    return (
      <div className="justify-center items-center m-8">
        <WeatherCard city="Tokyo" />
      </div>
    );
  }

export default WeatherCardDemo;
