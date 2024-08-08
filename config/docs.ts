import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

const docsConfig: DocsConfig = {
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
          title: "Image Slider",
          href: `/components/slider`,
          items: [],
        }
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
          title: "Weather",
          href: `/components/weather`,
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
        },
        {
          title: "Github Heat Map",
          href: `/components/github-heat-map`,
          items: [],
        },
      ],
    },
  ],
};

const sortDocsConfig = (docsConfig: DocsConfig): DocsConfig => {
  const { sidebarNav } = docsConfig;

  // Separate the "Getting Started" section
  const gettingStartedSection = sidebarNav.find(section => section.title === "Getting Started");
  const otherSections = sidebarNav.filter(section => section.title !== "Getting Started");

  const sortedOtherSections: SidebarNavItem[] = otherSections.map(section => {
    const items = section.items || [];

    const sortedItems = items
      .sort((a, b) => a.title.localeCompare(b.title));
  
    return {
      ...section,
      items: [
        ...sortedItems,
      ]
    };
  }).sort((a, b) => a.title.localeCompare(b.title));

  // Ensure "Getting Started" section is always first
  const sortedSidebarNav: SidebarNavItem[] = [
    ...(gettingStartedSection ? [gettingStartedSection] : []),
    ...sortedOtherSections,
  ];

  return {
    ...docsConfig,
    sidebarNav: sortedSidebarNav,
  };
};

// Process the docsConfig
const updatedDocsConfig = sortDocsConfig(docsConfig);

// Export the sorted and updated configuration
export { updatedDocsConfig as docsConfig };
