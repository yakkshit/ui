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
    files: ["registry/components/backend/toast/waitlist.tsx"],
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
    files: ["registry/components/frontend/github-heat-map.tsx"],
  },
  "testimonials": {
    name: "testimonials",
    type: "components:ui",
    files: ["registry/components/backend/testimonials/Testimonials.tsx"],
  },
};

const example: Registry = {
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
    files: ["registry/components/example/wait-list-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/wait-list-demo")
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
    files: ["registry/components/example/github-heat-map-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/github-heat-map-demo")
    ),
  },
  "testimonials-demo": {
    name: "testimonials-demo",
    type: "components:example",
    files: ["registry/components/example/testimonials-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/testimonials-demo")
    ),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
};
