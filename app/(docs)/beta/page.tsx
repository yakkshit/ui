// pages/index.tsx
"use client";

import QuoteMarqueeDemo from "@/registry/components/example/quotecard/quote-marquee-demo";

const Beta: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen mx-auto p-4">
      <QuoteMarqueeDemo />
    </div>
  );
};

export default Beta;
