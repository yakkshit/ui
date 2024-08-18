"use client";

import { LinearGradient, RadialGradient } from "../../frontend/gradient";
import { motion } from "framer-motion";

export default function LinearGradient1Demo() {
  return (
    <div className="flex flex-wrap">
      {/* Linear Gradient Examples */}
      <motion.div
        className="border rounded-lg h-34 w-34 relative m-2 flex justify-center items-center bg-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-2xl font-medium justify-center items-center tracking-tighter whitespace-nowrap text-white z-10">
          Linear Gradient 1
        </p>
        <LinearGradient from="#ff0000" to="#0000ff" direction="top" />
      </motion.div>
      <motion.div
        className="border rounded-lg h-34 w-34 relative m-2 flex justify-center items-center bg-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-2xl font-medium justify-center items-center tracking-tighter whitespace-nowrap text-white z-10">
          Linear Gradient 2
        </p>
        <LinearGradient from="#00ff00" to="#ff00ff" direction="left" />
      </motion.div>
      <motion.div
        className="border rounded-lg h-34 w-34 relative m-2 flex justify-center items-center bg-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-2xl font-medium justify-center items-center tracking-tighter whitespace-nowrap text-white z-10">
          Linear Gradient 3
        </p>
        <LinearGradient from="#ffff00" to="#00ffff" direction="bottom right" />
      </motion.div>
      <motion.div
        className="border rounded-lg h-34 w-34 relative m-2 flex justify-center items-center bg-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-2xl font-medium justify-center items-center tracking-tighter whitespace-nowrap text-white z-10">
          Linear Gradient 4
        </p>
        <LinearGradient from="#ff7f50" to="#1e90ff" direction="bottom left" />
      </motion.div>

      {/* Radial Gradient Examples */}
      <motion.div
        className="border rounded-lg h-34 w-34 relative m-2 flex justify-center items-center bg-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-2xl font-medium justify-center items-center tracking-tighter whitespace-nowrap text-white z-10">
          Radial Gradient 1
        </p>
        <RadialGradient from="#ff0000" to="#0000ff" size={200} origin="center" />
      </motion.div>
      <motion.div
        className="border rounded-lg h-34 w-34 relative m-2 flex justify-center items-center bg-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-2xl font-medium justify-center items-center tracking-tighter whitespace-nowrap text-white z-10">
          Radial Gradient 2
        </p>
        <RadialGradient from="#00ff00" to="#ff00ff" size={300} origin="top left" />
      </motion.div>
      <motion.div
        className="border rounded-lg h-34 w-34 relative m-2 flex justify-center items-center bg-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-2xl font-medium justify-center items-center tracking-tighter whitespace-nowrap text-white z-10">
          Radial Gradient 3
        </p>
        <RadialGradient from="#ffff00" to="#00ffff" size={400} origin="bottom right" />
      </motion.div>
      <motion.div
        className="border rounded-lg h-34 w-34 relative m-2 flex justify-center items-center bg-background"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <p className="text-2xl font-medium justify-center items-center tracking-tighter whitespace-nowrap text-white z-10">
          Radial Gradient 4
        </p>
        <RadialGradient from="#ff69b4" to="#8a2be2" size={250} origin="top right" />
      </motion.div>
    </div>
  );
}
