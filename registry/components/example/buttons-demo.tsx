"use client";

import { FC } from "react";
import Button from "../frontend/buttons";

const buttonVariants = [
    'bg-blue-500 hover:bg-blue-700 text-white',
    'bg-green-500 hover:bg-green-700 text-white',
    'bg-red-500 hover:bg-red-700 text-white',
    'bg-yellow-500 hover:bg-yellow-700 text-black',
    'bg-purple-500 hover:bg-purple-700 text-white',
    'bg-pink-500 hover:bg-pink-700 text-white',
    'bg-indigo-500 hover:bg-indigo-700 text-white',
    'bg-gray-500 hover:bg-gray-700 text-white',
    'bg-teal-500 hover:bg-teal-700 text-white',
    'bg-orange-500 hover:bg-orange-700 text-white',
    'bg-cyan-500 hover:bg-cyan-700 text-black',
    'bg-lime-500 hover:bg-lime-700 text-black',
  ];

const ButtonsDemo: FC = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      {buttonVariants.map((variant, index) => (
        <Button key={index} variant={variant}>
          Button {index + 1}
        </Button>
      ))}
    </div>
  );
  
  export default ButtonsDemo;