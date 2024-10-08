import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import "@/styles/mdx.css";


interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container flex-1 items-center md:grid md:grid-cols-[minmax(0,1fr)_220px] md:gap-6 lg:grid-cols-[minmax(0,2.5fr)_50px] lg:gap-5">
      {children}
      <SpeedInsights />
        {/* <ScrollArea className="h-full py-7 lg:py-8 pr-2 pl-6 pt-16">
          <DocsSidebarNav items={docsConfig.sidebarNav} />
        </ScrollArea> */}
    </div>
  );
}
