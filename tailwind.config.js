const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./registry/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'gradient-start': '#ff7e5f',
        'gradient-end': '#feb47b',
        'gray-900': '#151515',
        'gray-800': '#1f1f1f',
        'gray-700': '#2a2a2a',
        'sky':'#38bdf8',
        'indigot':'#4f46e5',
        gray: {
          900: '#1a202c', //weather card
          700: '#2d3748',
          300: '#e2e8f0',
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        boxShadow: {
          'white-glow': '0 0 15px 5px rgba(255, 255, 255, 0.5)',
          'grey-glow': '0 0 15px 5px rgba(128, 128, 128, 0.5)',
          glow: '0 0 15px 10px rgba(255, 255, 255, 0.3)',
          'dark-glow': '0 0 15px 10px rgba(255, 255, 255, 0.1)',
          'lg': '0px 0px 10px 1px #000000ee',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backdropFilter: { //quote card
        'none': 'none',
        'blur': 'blur(20px)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 8s linear infinite",
        showcontent: 'showcontent 1s ease-in-out forwards',
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        marquee: "marquee 15s linear infinite",
        rotateGlow: 'rotateGlow 3s linear infinite', //weather card
        'gradient-x': 'gradient-x 3s ease infinite',
        'rotate-y-180': 'rotateY 0.5s ease-in-out', //articles
        'rotate-gradient': 'rotate-gradient 5s linear infinite',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        rotateY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' }, //articles
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        'rotate-gradient': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        rotateGlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        showcontent: {
          '0%': { opacity: 0, transform: 'translate(0, 100px)', filter: 'blur(33px)' },
          '100%': { opacity: 1, transform: 'translate(0, 0)', filter: 'blur(0)' },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
        marquee: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      transformStyle: ['hover', 'focus'],
      transitionProperty: {
        'transform': 'transform',
      },
      transitionDuration: {
        '300': '300ms',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover', 'group-hover'], 
      backdropFilter: ['responsive'], // quote card
      animation: ['group-hover'], // articles
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), require('tailwindcss-filters')],
};
