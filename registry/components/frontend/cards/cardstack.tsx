"use client";

import { motion } from 'framer-motion';
import WeatherCardDemo from '../../example/WeatherCard/WeatherCard-demo';
import GitHubHeatMapDemo from '../../example/GitHubHeatMap/GitHubHeatMap-demo';
import Waitlist1Demo from '../../example/wait-list/wait-list-1-demo';
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CardsSection = () => {
  return (
    <div className={cn("container", "mx-auto", "p-4", "hidden", "md:block")}>
      <ul className={cn("grid", "grid-cols-1", "gap-16", "pb-16", "mb-16")}>
        <motion.li className={cn("sticky", "top-0", "pt-6")} id="card1">
          <div className={cn("card-body", "glassmorphic")}>
            <Waitlist1Demo/>
          </div>
        </motion.li>
        <motion.li className={cn("sticky", "top-0", "pt-12")} id="card2">
          <div className={cn("card-body", "glassmorphic")}>
            <GitHubHeatMapDemo/>
          </div>
        </motion.li>
        <motion.li className={cn("sticky", "top-0", "pt-24")} id="card3">
          <div className={cn("card-body", "glassmorphic")}>
            <WeatherCardDemo/>
          </div>
        </motion.li>
        <motion.li className={cn("sticky", "top-0", "pt-32")} id="card4">
          <div className={cn("card-body", "glassmorphic")}>
            <h2>Card 4</h2>
          </div>
        </motion.li>
      </ul>
    </div>
  );
};

export default CardsSection;
