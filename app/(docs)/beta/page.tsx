// pages/index.tsx
"use client";

import QuoteMarqueeDemo from "@/registry/components/example/quotecard/quote-marquee-demo";
import Price from "@/registry/components/frontend/price";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Price1Demo from "@/registry/components/example/price/price-1-demo";
import ImageSearchDemo from "@/registry/components/example/image/image-search-demo";
import ImageReelsDemo from "@/registry/components/example/image/image-reels-demo";
import RecipesDemo from "@/registry/components/example/Recipes/recipes-demo";
import TextEffect from "@/registry/components/frontend/3d/blob/test-effects";
import Price2Demo from "@/registry/components/example/price/price-2-demo";
import QRComponent from "@/registry/components/example/qr/file-qr-demo";
import CommentDemo from "@/registry/components/example/comment/comment-demo";

const queryClient = new QueryClient();

const Beta: React.FC = () => {
  return (
    <div className="space-y-8 p-8 justify-center items-centerbg-background text-foreground">
      {/* <TextEffect text="Gradient Text" style="gradient" />
      <TextEffect text="Neon Glow" style="neon" color="text-green-500" />
      <TextEffect text="Glitch Effect" style="glitch" color="text-red-500" />
      <TextEffect text="Typewriter Effect" style="typewriter" color="text-blue-500" />
      <TextEffect text="Wavy Animation" style="wavy" color="text-purple-500" />
      <TextEffect text="Highlight Effect" style="highlight" color="text-gray-800" />
      <TextEffect 
        text="Custom Tailwind" 
        tailwind="italic underline decoration-wavy decoration-pink-500 underline-offset-8" 
      /> */}
      {/* <QRComponent/> */}
      {/* <Price1Demo/> */}
      {/* <GeminiChatBot/> */}
      <CommentDemo type={"upload"} limit={2}/>
    </div>
  );
};

export default Beta;
