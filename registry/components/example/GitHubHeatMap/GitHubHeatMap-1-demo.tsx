// components/GlassmorphicCard.js
import { motion } from "framer-motion";
import { useState } from "react";
import GitHubHeatMap from "../../backend/GitHubHeatMap/GitHubHeatMap";

const GitHubHeatMap1Demo = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e:any) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <motion.div
      className="flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <div className="relative inline-flex group">
        <div
          className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
        ></div>
        <div className="relative inline-flex items-center justify-center text-lg font-bold dark:text-white text-black transition-all duration-200 dark:bg-gray-900 bg-white font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
          <GitHubHeatMap
            username="yakkshit"
            colorScheme="dark"
            theme={{
              light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
              dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
            }}
            style={{ border: 'bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg ' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GitHubHeatMap1Demo;
