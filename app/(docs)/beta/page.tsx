// pages/index.tsx
"use client";

import QuoteMarqueeDemo from "@/registry/components/example/quotecard/quote-marquee-demo";
import Price from "@/registry/components/frontend/price";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Price1Demo from "@/registry/components/example/price/price-1-demo";
import ImageSearchDemo from "@/registry/components/example/image/image-search-demo";
import ImageReelsDemo from "@/registry/components/example/image/image-reels-demo";
import RecipesDemo from "@/registry/components/example/Recipes/recipes-demo";

const queryClient = new QueryClient();

const Beta: React.FC = () => {
  return (
    <div className="flex min-h-screen justify-center items-center h-screen mx-auto p-4">
      <QueryClientProvider client={queryClient}>
        <RecipesDemo />
      </QueryClientProvider>
    </div>
  );
};

export default Beta;
