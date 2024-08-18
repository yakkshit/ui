import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface VelocityScrollProps {
  default_velocity?: number;
  className?: string;
  gradientColors?: { light: string[], dark: string[] };
  gradientType?: "linear" | "radial";
  parallax?: boolean;
  numQuotes?: number;
  marqueeType?: "marqueeleft" | "marqueeright" | "scrollmarquee" | "nomarquee";
  updateInterval?: number;
  font?: { family: string; style: string };
  textSize?: string; // Add textSize prop
}

interface ParallaxProps {
  children: string[];
  baseVelocity: number;
  className?: string;
  gradientColors?: { light: string[], dark: string[] };
  gradientType?: "linear" | "radial";
  directionFactor: number;
  font?: { family: string; style: string };
  textSize?: string; // Add textSize prop
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const QuoteMarqueeDemo: React.FC<VelocityScrollProps> = ({
  default_velocity = 0.5,
  className = "font-display text-center text-9xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]",
  gradientColors = { light: ["#000000", "#000000"], dark: ["#ffffff", "#ffffff"] },
  gradientType = "linear",
  parallax = true,
  numQuotes = 3,
  marqueeType = "scrollmarquee",
  updateInterval = 10,
  font = { family: "Roboto", style: "normal" },
  textSize = "text-9xl", // Default text size
}) => {
  const [quotes, setQuotes] = useState<string[]>(["Loading..."]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const responses = await Promise.all(
          Array.from({ length: numQuotes }).map(() => fetch('https://dummyjson.com/quotes/random'))
        );
        const data = await Promise.all(responses.map(res => res.json()));
        const formattedQuotes = data.map(d => `${d.quote} - by ${d.author}`);
        setQuotes(formattedQuotes);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setQuotes(["Failed to load quotes"]);
      }
    };

    fetchQuotes();

    const intervalId = setInterval(fetchQuotes, updateInterval * 1000);

    return () => clearInterval(intervalId);
  }, [numQuotes, updateInterval]);

  function ParallaxText({
    children,
    baseVelocity = 0.5,
    className,
    gradientColors = { light: ["#000000", "#000000"], dark: ["#ffffff", "#ffffff"] },
    gradientType = "linear",
    directionFactor,
    font = { family: "Roboto", style: "normal" },
    textSize = "text-9xl", // Default text size
  }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });

    const [repetitions, setRepetitions] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const calculateRepetitions = () => {
        if (containerRef.current && textRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const textWidth = textRef.current.offsetWidth;
          const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
          setRepetitions(newRepetitions);
        }
      };

      calculateRepetitions();

      window.addEventListener("resize", calculateRepetitions);
      return () => window.removeEventListener("resize", calculateRepetitions);
    }, [children]);

    const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor * baseVelocity * (delta / 1000);

      if (marqueeType === "scrollmarquee") {
        if (velocityFactor.get() < 0) {
          directionFactor = -1;
        } else if (velocityFactor.get() > 0) {
          directionFactor = 1;
        }
      }

      moveBy += directionFactor * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    const gradientStyle = {
      background: `${gradientType}-gradient(${gradientColors.light.join(", ")})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontFamily: font.family,
      fontStyle: font.style,
      fontSize: textSize, // Apply text size
    };

    const darkGradientStyle = {
      background: `${gradientType}-gradient(${gradientColors.dark.join(", ")})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontFamily: font.family,
      fontStyle: font.style,
      fontSize: textSize, // Apply text size
    };

    console.log("Gradient Style:", gradientStyle);
    console.log("Dark Gradient Style:", darkGradientStyle);

    return (
      <div
        className="w-full overflow-hidden whitespace-nowrap"
        ref={containerRef}
      >
        <motion.div className={cn("inline-block", className)} style={{ x }}>
          {Array.from({ length: repetitions }).map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? textRef : null}
              className="dark:hidden"
              style={gradientStyle}
            >
              {children.join(" ")}{" "}
            </span>
          ))}
          {Array.from({ length: repetitions }).map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? textRef : null}
              className="hidden dark:inline"
              style={darkGradientStyle}
            >
              {children.join(" ")}{" "}
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  const directionFactor = marqueeType === "marqueeright" ? -1 : 1;

  return (
    <section className="relative w-full">
      {parallax && marqueeType !== "nomarquee" ? (
        <ParallaxText
          baseVelocity={default_velocity}
          className={className}
          gradientColors={gradientColors}
          gradientType={gradientType}
          directionFactor={directionFactor}
          font={font}
          textSize={textSize} // Pass textSize prop
        >
          {quotes}
        </ParallaxText>
      ) : (
        <div
          className={cn("inline-block", className)}
          style={{
            background: `${gradientType}-gradient(${gradientColors.light.join(", ")})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: font.family,
            fontStyle: font.style,
            fontSize: textSize, // Apply text size
          }}
        >
          {quotes.join(" ")}
        </div>
      )}
    </section>
  );
};

export default QuoteMarqueeDemo;
