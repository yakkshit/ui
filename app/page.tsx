import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, constructMetadata, formatDate } from "@/lib/utils";
import { FadeIn } from "@/registry/components/frontend/fade-in";
import { Metadata } from "next";
import Link from "next/link";
import { allComponents } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import CardsSection from "@/registry/components/frontend/cards/cardstack";
import Price from "@/registry/components/frontend/price";
import Section2 from "@/components/ui/section2";

export const metadata: Metadata = constructMetadata({
  title: "Lingo UI",
  description:
    "Beautiful API Connected UI components and templates to make your landing page look stunning.",
});

export default function Home() {
  const posts = allComponents
    .filter((post) => post.date && post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 custom-background overflow-x-hidden">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <FadeIn className="z-10 flex flex-col items-center justify-center w-full h-full">
            <Link
              href={siteConfig.links.twitter}
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
              target="_blank"
            >
              Follow along on Twitter
            </Link>
          </FadeIn>
          <FadeIn
            delay={0.1}
            className="z-10 flex flex-col items-center justify-center w-full h-full"
          >
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Create beautiful landing pages in minutes.
            </h1>
          </FadeIn>
          <FadeIn
            className="z-10 flex flex-col items-center justify-center w-full h-full"
            delay={0.2}
          >
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Lingo UI is a curated collection of beautiful landing page
              components built using React + Tailwind CSS + Framer Motion
            </p>
          </FadeIn>
          <FadeIn
            className="z-10 flex flex-col items-center justify-center w-full h-full"
            delay={0.3}
          >
            <div className="space-x-4">
              <Link
                href="/components"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Get Started
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" })
                )}
              >
                Twitter
              </Link>
            </div>
          </FadeIn>
        </div>
        {/* <hr className="my-10" /> */}
        {/* {posts?.length ? (
          <div className="flex">
            {posts.map((post, index) => (
              <Article key={post._id} post={post} index={index} />
            ))}
            <Section2/>
          </div>
        ) : (
          <p>No components yet.</p>
        )} */}
        <div className="flex flex-col">
          <Section2 />
          <Price/>
        </div>
      </section>
    </>
  );
}
