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
import Calander1Demo from "@/registry/components/backend/GCalander/calander";
import MapComponentDemo from "@/registry/components/example/map/map-box-demo";
import RecipeSearchDemo from "@/registry/components/example/Recipes/recipes-search-demo";
import LinkedInProfile from "@/registry/components/example/linkedin/profile-demo";
import PriceCalculator1 from "@/registry/components/example/price/price-3-demo";
import PriceCalculator2 from "@/registry/components/example/price/price-4-demo";
import VideoWidget from "@/registry/components/example/video/video-widget";
import WeatherWidget1Demo from "@/registry/components/example/WeatherCard/weather-card-1-demo";
import ComingSoon from "@/registry/components/example/WeatherCard/weather-card-1-demo";
import Component from "@/registry/components/example/showcase-demo";
import GradientCardDemo from "@/registry/components/example/showcase-demo";
import ParallaxScrollSection from "@/registry/components/example/mockup/mock-up-demo";
import EnhancedParallaxScrollSection from "@/registry/components/example/mockup/mock-up-demo";
import APIRequestBuilder from "@/registry/components/example/apifetch/api-fetch";

const queryClient = new QueryClient();

const Beta: React.FC = () => {
  const screens = [
    { content: <div>Music Player</div>, image: '/music-player.jpg' },
    { content: <div>Stock Market</div>, image: '/stock-market.jpg' },
    { content: <div>Social Feed</div>, image: '/social-feed.jpg' },
    { content: <div>Weather App</div>, image: '/weather-app.jpg' },
  ]

  const backgroundText = ['Innovative', 'Powerful', 'Intuitive', 'Seamless']

  return (
      <div className="m-2 h-full flex-col justify-center items-center overflow-auto">
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
      {/* <CommentDemo type={"upload"} limit={2}/> */}
      {/* <Calander1Demo/> */}
      {/* <MapComponentDemo/> */}
      {/* <RecipeSearchDemo/> */}
      {/* <LinkedInProfile/> */}
      {/* <PriceCalculator1 /> */}
      {/* <PriceCalculator2 /> */}
      {/* <ComingSoon/> */}
        {/* <GradientCardDemo/> */}
        {/* <ParallaxScrollSection
        screens={screens}
        cardWidth="300px"
        cardHeight="600px"
        backgroundTextSize="100px"
        scrollSpeed={0.7} backgroundText={[]}    /> */}
        <APIRequestBuilder/>
        {/* <StreakCheckerDemo/> */}
    </div>
  );
};

export default Beta;
