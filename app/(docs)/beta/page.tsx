// pages/index.tsx
"use client";

import QuoteMarqueeDemo from "@/registry/components/example/quotecard/quote-marquee-demo";
import Price from "@/registry/components/frontend/price";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Price1Demo from "@/registry/components/example/price/price-1-demo";

const queryClient = new QueryClient();

const Beta: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen mx-auto p-4">
      <QueryClientProvider client={queryClient}>
        <Price1Demo />
      </QueryClientProvider>
    </div>
  );
};

export default Beta;
