import { Registry } from "@/registry/schema";
import * as React from "react";

const ui: Registry = {
  "magic-card": {
    name: "magic-card",
    type: "components:ui",
    files: ["registry/components/frontend/magic-card.tsx"],
  },
  "linear-gradient": {
    name: "linear-gradient",
    type: "components:ui",
    files: ["registry/components/frontend/linear-gradient.tsx"],
  },
  "radial-gradient": {
    name: "radial-gradient",
    type: "components:ui",
    files: ["registry/components/frontend/radial-gradient.tsx"],
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
  "magic-card-demo": {
    name: "magic-card-demo",
    type: "components:example",
    files: ["registry/components/example/magic-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/magic-card-demo")
    ),
  },
  "linear-gradient-demo": {
    name: "linear-gradient-demo",
    type: "components:example",
    files: ["registry/components/example/linear-gradient-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/linear-gradient-demo")
    ),
  },
  "radial-gradient-demo": {
    name: "radial-gradient-demo",
    type: "components:example",
    files: ["registry/components/example/radial-gradient-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/radial-gradient-demo")
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
  "recipes-demo": {
    name: "recipes-demo",
    type: "components:example",
    files: ["registry/components/example/Recipes/recipes-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/Recipes/recipes-demo")
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
};

export const registry: Registry = {
  ...ui,
  ...example,
};
