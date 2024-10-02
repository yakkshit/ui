import { Registry } from "@/registry/schema";
import * as React from "react";

const ui: Registry = {
  "magic-card": {
    name: "magic-card",
    type: "components:ui",
    registryDependencies: ["magic-card"],
    files: ["registry/components/frontend/magic-card.tsx"],
  },
  "linear-gradient": {
    name: "linear-gradient",
    type: "components:ui",
    files: ["registry/components/frontend/linear-gradient.tsx"],
  },
  "gradient": {
    name: "gradient",
    type: "components:ui",
    files: ["registry/components/frontend/gradient.tsx"],
  },
  "wait-list": {
    name: "wait-list",
    type: "components:ui",
    files: ["registry/components/backend/waitlist/waitlist.tsx"],
  },
  "blob": {
    name: "blob",
    type: "components:ui",
    files: ["registry/components/frontend/3d/blob/blob.tsx"],
  },
  "slider": {
    name: "slider",
    type: "components:ui",
    files: ["registry/components/frontend/slider.tsx"],
  },
  "maps-location": {
    name: "maps-location",
    type: "components:ui",
    files: ["registry/components/backend/map/maplocation.tsx"],
  },
  "buttons": {
    name: "buttons",
    type: "components:ui",
    files: ["registry/components/frontend/buttons.tsx"],
  },
  "text": {
    name: "text",
    type: "components:ui",
    files: ["registry/components/frontend/text.tsx"],
  },
  "github-heat-map": {
    name: "github-heat-map",
    type: "components:ui",
    files: ["registry/components/backend/GitHubHeatMap/GitHubHeatMap.tsx"],
  },
  "testimonials": {
    name: "testimonials",
    type: "components:ui",
    files: ["registry/components/backend/testimonials/Testimonials.tsx"],
  },
  "auth": {
    name: "auth",
    type: "components:ui",
    files: ["registry/components/backend/auth/AuthComponent.tsx"],
  },
  "weathercard":{
    name: "weathercard",
    type: "components:ui",
    files: ["registry/components/backend/WeatherCard/WeatherCard.tsx"],
  },
  "recipes":{
    name: "recipes",
    type: "components:ui",
    files: ["registry/components/backend/Recipes/Recipes.tsx"],
  },
  "quote-card":{
    name: "quote-card",
    type: "components:ui",
    files: ["registry/components/backend/quotecard/quotecard.tsx"],
  }
};

const example: Registry = {
  "beta-demo": {
    name: "beta-demo",
    type: "components:example",
    files: ["registry/components/beta/beta-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/beta/beta-demo")
    ),
  },
  "ai-chat-demo": {
    name: "ai-chat-demo",
    type: "components:example",
    files: ["registry/components/example/aichat/ai-chat-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/aichat/ai-chat-demo")
    ),
  },
  "image-search-demo": {
    name: "image-search-demo",
    type: "components:example",
    files: ["registry/components/example/image/image-search-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/image/image-search-demo")
    ),
  },
  "image-reels-demo": {
    name: "image-reels-demo",
    type: "components:example",
    files: ["registry/components/example/image/image-reels-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/image/image-reels-demo")
    ),
  },
  "price-demo": {
    name: "price-demo",
    type: "components:example",
    files: ["registry/components/example/price/price-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/price/price-demo")
    ),
  },
  "price-1-demo": {
    name: "price-1-demo",
    type: "components:example",
    files: ["registry/components/example/price/price-1-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/price/price-1-demo")
    ),
  },
  "price-2-demo": {
    name: "price-2-demo",
    type: "components:example",
    files: ["registry/components/example/price/price-2-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/price/price-2-demo")
    ),
  },
  "price-3-demo": {
    name: "price-2-demo",
    type: "components:example",
    files: ["registry/components/example/price/price-3-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/price/price-3-demo")
    ),
  },
  "price-4-demo": {
    name: "price-2-demo",
    type: "components:example",
    files: ["registry/components/example/price/price-4-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/price/price-4-demo")
    ),
  },
  "file-qr-demo": {
    name: "file-qr-demo",
    type: "components:example",
    files: ["registry/components/example/qr/file-qr-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/qr/file-qr-demo")
    ),
  },
  "magic-card-demo": {
    name: "magic-card-demo",
    type: "components:example",
    files: ["registry/components/example/magic-card/magic-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card/magic-card-demo")
    ),
  },
  "magic-card-1-demo": {
    name: "magic-card-1-demo",
    type: "components:example",
    files: ["registry/components/example/magic-card/magic-card-1-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card/magic-card-1-demo")
    ),
  },
  "magic-card-2-demo": {
    name: "magic-card-1-demo",
    type: "components:example",
    files: ["registry/components/example/magic-card/magic-card-2-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card/magic-card-2-demo")
    ),
  },
  "magic-card-3-demo": {
    name: "magic-card-1-demo",
    type: "components:example",
    files: ["registry/components/example/magic-card/magic-card-3-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card/magic-card-3-demo")
    ),
  },
  "magic-card-4-demo": {
    name: "magic-card-4-demo",
    type: "components:example",
    files: ["registry/components/example/magic-card/magic-card-4-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card/magic-card-4-demo")
    ),
  },
  "exam-cal-demo": {
    name: "exam-cal-demo",
    type: "components:example",
    files: ["registry/components/example/examcal/ielts-calaculator.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/examcal/ielts-calaculator")
    ),
  },
  "component-liberary-demo": {
    name: "component-liberary-demo",
    type: "components:example",
    files: ["registry/components/example/component-libary-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/component-libary-demo")
    ),
  },
  "gradient-demo": {
    name: "gradient-demo",
    type: "components:example",
    files: ["registry/components/example/gradient/gradient-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/gradient/gradient-demo")
    ),
  },
  "gradient-1-demo": {
    name: "gradient-1-demo",
    type: "components:example",
    files: ["registry/components/example/gradient/gradient-1-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/gradient/gradient-1-demo")
    ),
  },
  "wait-list-demo": {
    name: "wait-list-demo",
    type: "components:example",
    files: ["registry/components/example/wait-list/wait-list-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/wait-list/wait-list-demo")
    ),
  },
  "wait-list-1-demo": {
    name: "wait-list-1-demo",
    type: "components:example",
    files: ["registry/components/example/wait-list/wait-list-1-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/wait-list/wait-list-1-demo")
    ),
  },
  "blob-demo": {
    name: "blob-demo",
    type: "components:example",
    files: ["registry/components/example/blob-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/blob-demo")
    ),
  },
  "slider-demo": {
    name: "slider-demo",
    type: "components:example",
    files: ["registry/components/example/slider-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/slider-demo")
    ),
  },
  "map-location-demo": {
    name: "map-location-demo",
    type: "components:example",
    files: ["registry/components/example/map-location-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/map-location-demo")
    ),
  },
  "buttons-demo": {
    name: "buttons-demo",
    type: "components:example",
    files: ["registry/components/example/buttons-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/buttons-demo")
    ),
  },
  "text-demo": {
    name: "text-demo",
    type: "components:example",
    files: ["registry/components/example/text-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/text-demo")
    ),
  },
  "github-heat-map-demo": {
    name: "github-heat-map-demo",
    type: "components:example",
    files: ["registry/components/example/GitHubHeatMap/GitHubHeatMap-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/GitHubHeatMap/GitHubHeatMap-demo")
    ),
  },
  "github-heat-map-1-demo": {
    name: "github-heat-map-1-demo",
    type: "components:example",
    files: ["registry/components/example/GitHubHeatMap/GitHubHeatMap-1-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/GitHubHeatMap/GitHubHeatMap-1-demo")
    ),
  },
  "github-heat-map-2-demo": {
    name: "github-heat-map-2-demo",
    type: "components:example",
    files: ["registry/components/example/GitHubHeatMap/GitHubHeatMap-2-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/GitHubHeatMap/GitHubHeatMap-2-demo")
    ),
  },
  "testimonials-demo": {
    name: "testimonials-demo",
    type: "components:example",
    files: ["registry/components/example/testimonials/testimonials-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/testimonials/testimonials-demo")
    ),
  },
  "testimonials-1-demo": {
    name: "testimonials-demo",
    type: "components:example",
    files: ["registry/components/example/testimonials/testimonials-1-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/testimonials/testimonials-1-demo")
    ),
  },
  "testimonials-2-demo": {
    name: "testimonials-demo",
    type: "components:example",
    files: ["registry/components/example/testimonials/testimonials-2-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/testimonials/testimonials-2-demo")
    ),
  },
  "comment-demo": {
    name: "comment-demo",
    type: "components:example",
    files: ["registry/components/example/comment/comment-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/comment/comment-demo")
    ),
  },
  "auth-demo": {
    name: "auth-demo",
    type: "components:example",
    files: ["registry/components/example/auth/auth-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/auth/auth-demo")
    ),
  },
  "auth-supabase-demo": {
    name: "auth-supabase-demo",
    type: "components:example",
    files: ["registry/components/example/auth/supabase-auth-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/auth/supabase-auth-demo")
    ),
  },
  "WeatherCard-demo": {
    name: "WeatherCard-demo",
    type: "components:example",
    files: ["registry/components/example/WeatherCard/WeatherCard-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/WeatherCard/WeatherCard-demo")
    ),
  },
  // "WeatherCard-2-demo": {
  //   name: "WeatherCard-2-demo",
  //   type: "components:example",
  //   files: ["registry/components/example/WeatherCard/weatherCard-2-demo.tsx"],
  //   component: React.lazy(
  //     () => import("@/registry/components/example/WeatherCard/weatherCard-2-demo")
  //   ),
  // },
  "recipes-demo": {
    name: "recipes-demo",
    type: "components:example",
    files: ["registry/components/example/Recipes/recipes-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/Recipes/recipes-demo")
    ),
  },
  "recipes-search-demo": {
    name: "recipes-search-demo",
    type: "components:example",
    files: ["registry/components/example/Recipes/recipes-search-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/Recipes/recipes-search-demo")
    ),
  },
  "ai-bot-demo": {
    name: "ai-bot-demo",
    type: "components:example",
    files: ["registry/components/example/aichat/ai-bot-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/aichat/ai-bot-demo")
    ),
  },
  "quote-card-demo": {
    name: "quote-card-demo",
    type: "components:example",
    files: ["registry/components/example/quotecard/quote-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/quotecard/quote-card-demo")
    ),
  },
  "quote-marquee-demo": {
    name: "quote-marquee-demo",
    type: "components:example",
    files: ["registry/components/example/quotecard/quote-marquee-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/quotecard/quote-marquee-demo")
    ),
  },
  "quote-marquee-1-demo": {
    name: "quote-marquee-demo",
    type: "components:example",
    files: ["registry/components/example/quotecard/quote-marquee-1-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/quotecard/quote-marquee-1-demo")
    ),
  },
  "linkedin-profile-demo": {
    name: "linkedin-profile-demo",
    type: "components:example",
    files: ["registry/components/example/linkedin/profile-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/linkedin/profile-demo")
    ),
  },
  "json-to-cv-demo": {
    name: "json-to-cv-demo",
    type: "components:example",
    files: ["registry/components/example/JsonToCv/JsonToCvDemo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/JsonToCv/JsonToCvDemo")
    ),
  },
  "chat-support-spoki-demo": {
    name: "chat-support-spoki-demo",
    type: "components:example",
    files: ["registry/components/example/aichat/chat-support-spoki-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/aichat/chat-support-spoki-demo")
    ),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
};

const resolvedExamples = Object.entries(example).map(([key, value]) => ({
  ...value,
  component: () => void 0,
}));
const updatedExample: Registry = resolvedExamples.reduce(
  (acc, curr) => ({ ...acc, [curr.name]: curr }),
  {},
);
export const downloadRegistry: Registry = { ...ui, ...updatedExample };

export type ComponentName = keyof (typeof ui & typeof example);