import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/components/linear-gradient",
    },
    {
      title: "Cedzlabs",
      href: "https://cedzlabs.com",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [
            {
              title: "React.js",
              href: `/docs/installation/react`,
              items: [],
            },
            {
              title: "Vue.js",
              href: `/docs/installation/vue`,
              items: [],
            },
            {
              title: "Svelte",
              href: `/docs/installation/svelte`,
              items: [],
            },
          ],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
      ],
    },
    {
      title: "Frontend",
      items: [
        {
          title: "Linear Gradient",
          href: `/components/linear-gradient`,
          items: [],
        },
        {
          title: "Magic-card",
          href: `/components/magic-card`,
          items: [],
          label: "new",
        },
        {
          title: "Blob",
          href: `/components/blob`,
          items: [],
          label: "3D",
        },
        {
          title: "Slider",
          href: `/components/slider`,
          items: [],
        },
        {
          title: "Buttons",
          href: `/components/buttons`,
          items: [],
        },
        {
          title: "Text Effects",
          href: `/components/text`,
          items: [],
        },
        {
          title: "Github Heat Map",
          href: `/components/github-heat-map`,
          items: [],
        },
      ],
    },
    {
      title: "Backend",
      items: [
        {
          title: "Wait list",
          href: `/components/wait-list`,
          items: [],
        },
        {
          title: "Maps Location",
          href: `/components/map-location`,
          items: [],
        },
        {
          title: "Testimonials",
          href: `/components/testimonials`,
          items: [],
          label: "new",
        },
      ],
    },
  ],
};
