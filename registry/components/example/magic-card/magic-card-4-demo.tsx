"use client";

import { MagicCard, MagicContainer } from "../../frontend/magic-card";

export default function MagicCardWithGradient() {
  return (
    <MagicContainer
      className={
        "grid w-full lg:grid-cols-2 grid-cols-1 gap-4 min-h-[500px] lg:min-h-[250px]"
      }
    >
      <MagicCard
        className="cursor-pointer shadow-2xl flex flex-col justify-center items-center overflow-hidden bg-background p-6"
        borderColor={[
          "linear-gradient(45deg, rgba(255,0,0,0.8), rgba(255,165,0,0.9))",
          "radial-gradient(circle, rgba(255,0,0,0.8), rgba(255,165,0,0.9))"
        ]}
        spotlightColor={[
          "linear-gradient(45deg, rgba(255,0,0,0.2), rgba(255,165,0,0.2))",
          "radial-gradient(circle, rgba(255,0,0,0.2), rgba(255,165,0,0.2))"
        ]}
        background={[
          "linear-gradient(45deg, rgba(255,0,0,0.1), rgba(255,165,0,0.1))",
          "radial-gradient(circle, rgba(255,0,0,0.1), rgba(255,165,0,0.1))"
        ]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Magic
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={[
          "linear-gradient(45deg, rgba(0,255,0,0.8), rgba(0,0,255,0.8))",
          "radial-gradient(circle, rgba(0,255,0,0.8), rgba(0,0,255,0.8))"
        ]}
        spotlightColor={[
          "linear-gradient(45deg, rgba(0,255,0,0.2), rgba(0,0,255,0.2))",
          "radial-gradient(circle, rgba(0,255,0,0.2), rgba(0,0,255,0.2))"
        ]}
        background={[
          "linear-gradient(45deg, rgba(0,255,0,0.1), rgba(0,0,255,0.1))",
          "radial-gradient(circle, rgba(0,255,0,0.1), rgba(0,0,255,0.1))"
        ]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Card
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={[
          "linear-gradient(45deg, rgba(255,255,0,0.8), rgba(255,0,255,0.8))",
          "radial-gradient(circle, rgba(255,255,0,0.8), rgba(255,0,255,0.8))"
        ]}
        spotlightColor={[
          "linear-gradient(45deg, rgba(255,255,0,0.2), rgba(255,0,255,0.2))",
          "radial-gradient(circle, rgba(255,255,0,0.2), rgba(255,0,255,0.2))"
        ]}
        background={[
          "linear-gradient(45deg, rgba(255,255,0,0.1), rgba(255,0,255,0.1))",
          "radial-gradient(circle, rgba(255,255,0,0.1), rgba(255,0,255,0.1))"
        ]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Showcase
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={[
          "linear-gradient(45deg, rgba(0,255,255,0.8), rgba(255,0,0,0.8))",
          "radial-gradient(circle, rgba(0,255,255,0.8), rgba(255,0,0,0.8))"
        ]}
        spotlightColor={[
          "linear-gradient(45deg, rgba(0,255,255,0.2), rgba(255,0,0,0.2))",
          "radial-gradient(circle, rgba(0,255,255,0.2), rgba(255,0,0,0.2))"
        ]}
        background={[
          "linear-gradient(45deg, rgba(0,255,255,0.1), rgba(255,0,0,0.1))",
          "radial-gradient(circle, rgba(0,255,255,0.1), rgba(255,0,0,0.1))"
        ]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Platform
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={[
          "linear-gradient(45deg, rgba(255,0,255,0.8), rgba(0,255,0,0.8))",
          "radial-gradient(circle, rgba(255,0,255,0.8), rgba(0,255,0,0.8))"
        ]}
        spotlightColor={[
          "linear-gradient(45deg, rgba(255,0,255,0.2), rgba(0,255,0,0.2))",
          "radial-gradient(circle, rgba(255,0,255,0.2), rgba(0,255,0,0.2))"
        ]}
        background={[
          "linear-gradient(45deg, rgba(255,0,255,0.1), rgba(0,255,0,0.1))",
          "radial-gradient(circle, rgba(255,0,255,0.1), rgba(0,255,0,0.1))"
        ]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Innovation
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={[
          "linear-gradient(45deg, rgba(0,0,255,0.8), rgba(255,255,0,0.8))",
          "radial-gradient(circle, rgba(0,0,255,0.8), rgba(255,255,0,0.8))"
        ]}
        spotlightColor={[
          "linear-gradient(45deg, rgba(0,0,255,0.2), rgba(255,255,0,0.2))",
          "radial-gradient(circle, rgba(0,0,255,0.2), rgba(255,255,0,0.2))"
        ]}
        background={[
          "linear-gradient(45deg, rgba(0,0,255,0.1), rgba(255,255,0,0.1))",
          "radial-gradient(circle, rgba(0,0,255,0.1), rgba(255,255,0,0.1))"
        ]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Creativity
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={[
          "linear-gradient(45deg, rgba(128,0,128,0.8), rgba(255,192,203,0.8))",
          "radial-gradient(circle, rgba(128,0,128,0.8), rgba(255,192,203,0.8))"
        ]}
        spotlightColor={[
          "linear-gradient(45deg, rgba(128,0,128,0.2), rgba(255,192,203,0.2))",
          "radial-gradient(circle, rgba(128,0,128,0.2), rgba(255,192,203,0.2))"
        ]}
        background={[
          "linear-gradient(45deg, rgba(128,0,128,0.1), rgba(255,192,203,0.1))",
          "radial-gradient(circle, rgba(128,0,128,0.1), rgba(255,192,203,0.1))"
        ]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Harmony
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={[
          "linear-gradient(45deg, rgba(255,69,0,0.8), rgba(75,0,130,0.8))",
          "radial-gradient(circle, rgba(255,69,0,0.8), rgba(75,0,130,0.8))"
        ]}
        spotlightColor={[
          "linear-gradient(45deg, rgba(255,69,0,0.2), rgba(75,0,130,0.2))",
          "radial-gradient(circle, rgba(255,69,0,0.2), rgba(75,0,130,0.2))"
        ]}
        background={[
          "linear-gradient(45deg, rgba(255,69,0,0.1), rgba(75,0,130,0.1))",
          "radial-gradient(circle, rgba(255,69,0,0.1), rgba(75,0,130,0.1))"
        ]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Passion
        </p>
      </MagicCard>
    </MagicContainer>
  );
}
