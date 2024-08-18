"use client";

import { motion } from "framer-motion";

const icon = {
  hidden: {
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)"
  }
};

export default function Framer({
  className,
  fill = "#C0C0C0", // Default fill color set to #C0C0C0
  size = 10, // Default size set to 15
}: {
  className?: string;
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size} // Use size prop for width
      height={size} // Use size prop for height
      viewBox="0 0 100 100" // Adjusted viewBox to fit the new SVG
      className={className}
      fill={fill} // Use fill prop for fill color
    >
      <motion.path
        d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
        variants={icon}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}
