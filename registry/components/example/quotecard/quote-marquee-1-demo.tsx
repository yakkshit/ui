import React from 'react';
import QuoteMarqueeDemo from './quote-marquee-demo';

const QuoteMarquee1Demo = () => {
  return (
    <>
      <QuoteMarqueeDemo
        gradientColors={{ light: ["#ff0000", "#ffff00"], dark: ["#ff0000", "#ffff00"] }} // Red to Yellow
        default_velocity={0.5}
        className="font-display text-center text-[5rem] font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:leading-[5rem]"
        parallax={true}
        numQuotes={3}
        marqueeType="scrollmarquee"
        updateInterval={10}
        font={{ family: "Roboto", style: "italic" }}
      />
      <QuoteMarqueeDemo
        gradientColors={{ light: ["#0000ff", "#800080"], dark: ["#0000ff", "#800080"] }} // Blue to Purple
        default_velocity={0.5}
        className="font-display text-center text-9xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        parallax={true}
        numQuotes={3}
        marqueeType="marqueeleft"
        updateInterval={10}
        font={{ family: "Arial", style: "bold" }}
      />
      <QuoteMarqueeDemo
        gradientColors={{ light: ["#00ff00", "#0000ff"], dark: ["#00ff00", "#0000ff"] }} // Green to Blue
        default_velocity={0.5}
        className="font-display text-center text-9xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        parallax={true}
        numQuotes={3}
        marqueeType="marqueeright"
        updateInterval={10}
        font={{ family: "Times New Roman", style: "normal" }}
      />
      <QuoteMarqueeDemo
        gradientColors={{ light: ["#ff69b4", "#ff4500"], dark: ["#ff69b4", "#ff4500"] }} // Pink to Orange
        default_velocity={0.5}
        className="font-display text-center text-9xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        parallax={true}
        numQuotes={3}
        marqueeType="scrollmarquee"
        updateInterval={10}
        font={{ family: "Courier New", style: "italic" }}
      />
      <QuoteMarqueeDemo
        gradientColors={{ light: ["#ff7e5f", "#feb47b", "#86a8e7", "#91eae4"], dark: ["#ff7e5f", "#feb47b", "#86a8e7", "#91eae4"] }} // Custom Gradient
        default_velocity={0.5}
        className="font-display text-center text-2xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
        parallax={false}
        numQuotes={1} // Specify the number of quotes to display when parallax is false
        marqueeType="nomarquee"
        updateInterval={10}
        font={{ family: "Verdana", style: "bold" }}
      />
    </>
  );
}

export default QuoteMarquee1Demo;
