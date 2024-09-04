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
    {
      title: "Apps",
      href: "/components",
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
        {
          title: "Beta",
          href: "/components/beta",
          label:"beta",
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
          tags: ['background', 'gradient', 'CSS', 'design', 'UI']
        },
        {
          title: "Magic-card",
          href: `/components/magic-card`,
          items: [],
          tags: ['hover effect', 'spotlight', 'UI', 'magic card', 'hover cards']
        },
        {
          title: "Blob",
          href: `/beta`,
          items: [],
          label: "soon ..",
        },
        {
          title: "Buttons",
          href: `/components/buttons`,
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
      title: "Apps",
      items: [
        {
          title: "Calander",
          href: `/calander`,
          items: [],
          disabled: true,
          label:'soon..',
          tags: ['Shadcn', 'Framer Motion', 'Supabase', 'Waitlist']
        },
        {
          title: "Ai Resume",
          href: `/resume`,
          label:'soon',
          items: [],
          tags: ['Shadcn', 'Framer Motion', 'Supabase', 'Waitlist']
        },
      ],
    },
    {
      title: "API Connected",
      items: [
        {
          title: "Wait list",
          href: `/components/wait-list`,
          items: [],
          tags: ['Shadcn', 'Framer Motion', 'Supabase', 'Waitlist']
        },
        {
          title: "Weather",
          href: `/components/weathercard`,
          items: [],
          tags:["WeatherCard","OpenWeatherAPI","NextJS","FramerMotion","TailwindCSS","LucideReact","Axios","LingoUI","CedzLabs","WebDevelopment","JavaScript","ReactJS","FrontendDevelopment","UIComponents","OpenSource","CodingTutorial","WebDesign","APIs","Programming","TechTutorial"]
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
          tags: ['Shadcn', 'Framer Motion', 'Supabase', 'Testimonials', 'marquee']
        },
        {
          title: "Github Heat Map",
          href: `/components/github-heat-map`,
          items: [],
          tags: ['lucid icons', 'Framer Motion', 'Github Calendar']
        },
        {
          title: "Recipes",
          href: `/components/recipes`,
          items: [],
          label:'AI'
        },
        {
          title: "Quote card",
          href: `/components/quote-card`,
          items: [],
          tags: ['dummyjson','framer motion', 'Quote']
        },
        {
          title: "Price Templates",
          href: `/components/price`,
          items: [],
          label: 'beta',
          tags: ['fixer','framer motion', 'currency update', 'price', 'React', 'Currency', 'Pricing', 'API', 'Component', 'Fixer Api', 'Real time Currency Converter']
        },
        {
          title: "Image Search",
          href: `/components/images`,
          items: [],
          tags: ['Unsplash api','framer motion', 'images', 'API', 'image scroll', 'image feed', 'random']
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
