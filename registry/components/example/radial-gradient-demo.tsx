"use client";

import RadialGradient from "@/registry/components/frontend/radial-gradient";

export default function RadialGradientDemo() {
  return (
    <div className="border rounded-lg h-full w-full relative flex justify-center items-center bg-background">
      <p className="text-5xl font-medium tracking-tighter whitespace-nowrap text-white z-10">
        Radial Gradient
      </p>
      <RadialGradient />
    </div>
  );
}
