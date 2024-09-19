// pages/components.tsx

import Article from "@/components/ui/Article";
import { constructMetadata, formatDate } from "@/lib/utils";
import ComponentLibraryDemo from "@/registry/components/example/component-libary-demo";
import AnimatedGradientBackground from "@/registry/components/example/gradient/gradient-bg-demo";
import { allComponents } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export const metadata = constructMetadata({
  title: "Components - Lingo UI",
  description:
    "Beautiful API connected UI components to make your landing page look stunning.",
    image: "icon.png",
});

export default async function StatusPage() {
  const posts = allComponents
    .filter((post) => post.date && post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="container max-w-full py-6 lg:py-10 overflow-x-hidden">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 ">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-medium text-4xl lg:text-5xl">
            Components
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of components that can be used in your own projects.
          </p>
        </div>
      </div>
      <hr className="my-8" />
        <div className="max-w-screen max-h-screen justify-center items-center flex">
          <ComponentLibraryDemo/>
        </div>
    </div>
  );
}