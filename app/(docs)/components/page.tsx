// pages/components.tsx

import Article from "@/components/ui/Article";
import { constructMetadata, formatDate } from "@/lib/utils";
import { FadeIn } from "@/registry/components/frontend/fade-in";
import { allComponents } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Components - Lingo UI",
  description:
    "Beautiful API connected UI components to make your landing page look stunning.",
    image: "logo.png",
});

export default async function ComponentPage() {
  const posts = allComponents
    .filter((post) => post.date && post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="container max-w-full py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
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
      {posts?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {posts.map((post, index) => (
            <Article key={post._id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <p>No components yet.</p>
      )}
    </div>
  );
}
