"use client";

import { LinearGradient, RadialGradient } from "../../frontend/gradient";


export default function LinearGradientDemo() {
  return (
    <div className="flex">
    <div className="border rounded-lg h-full w-full relative m-2 flex justify-center items-center bg-background">
      <p className="text-5xl font-medium tracking-tighter whitespace-nowrap text-white z-10">
        Linear Gradient
      </p>
      <LinearGradient />
    </div>
    <div className="border rounded-lg h-full m-2 w-full relative flex justify-center items-center bg-background">
    <p className="text-5xl font-medium tracking-tighter whitespace-nowrap text-white z-10">
      Radial Gradient
    </p>
    <RadialGradient />
  </div>
  </div>
  );
}
