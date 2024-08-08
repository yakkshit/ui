"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Set the default theme to system on initial load
  useEffect(() => {
    if (!theme) {
      setTheme("system");
    }
  }, [theme, setTheme]);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <motion.div
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: resolvedTheme === "dark" ? 90 : 0, scale: resolvedTheme === "dark" ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
      <motion.div
        initial={{ rotate: 90, scale: 0 }}
        animate={{ rotate: resolvedTheme === "dark" ? 0 : 90, scale: resolvedTheme === "dark" ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
