"use client";

import { MagicCard, MagicContainer } from "../../frontend/magic-card";

export default function MagicCard3Demo() {
  return (
    <MagicContainer
      className={
        "grid w-full lg:grid-cols-2 grid-cols-1 gap-4 min-h-[500px] lg:min-h-[250px]"
      }
    >
      <MagicCard
        className="cursor-pointer shadow-2xl flex flex-col justify-center items-center overflow-hidden bg-background p-6"
        borderColor={["rgba(255,0,0,1)"]}
        background={["rgba(255,0,0,0.3)"]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Magic
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={["rgba(0,255,0,1)"]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Card
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={["rgba(0,0,255,1)"]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Showcase
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={["rgba(255,255,0,1)"]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Platform
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={["rgba(255,0,255,1)"]}
        background={["rgba(255,0,255,0.3)"]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Innovation
        </p>
      </MagicCard>
      <MagicCard
        className="cursor-pointer shadow-2xl flex justify-center items-center overflow-hidden bg-background"
        borderColor={["rgba(0,255,255,1)"]}
        background={["rgba(0,255,255,0.3)"]}
      >
        <p className="text-4xl font-medium whitespace-nowrap text-gray-800 dark:text-gray-200 z-10">
          Creativity
        </p>
      </MagicCard>
    </MagicContainer>
  );
}
