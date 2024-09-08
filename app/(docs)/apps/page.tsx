// pages/apps.tsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const appLinks = [
  { name: "Resume", url: "/resume" },
  { name: "Calander", url: "/calander" },
  { name: "Focus Streak", url: "/apps/focus-streak" },
  { name: "Yakkshit", url: "/yakkshit" }
];

const Apps: React.FC = () => {
  const router = useRouter();

  return (
    <div className="m-2 h-full flex-col justify-center items-center overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold mb-4">Welcome to Apps</h1>
        <p className="text-lg">Select an app to navigate to:</p>
      </motion.div>

      <div className="flex gap-3 justify-center items-center">
        {appLinks.map((app, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-4"
          >
            <button
              onClick={() => router.push(app.url)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              {app.name}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
