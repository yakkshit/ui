// components/Article.tsx
"use client"

import React from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/registry/components/frontend/fade-in";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

// Dynamically import ReactPlayer with no SSR
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface ArticleProps {
  post: {
    _id: string;
    video?: string;
    title: string;
    date?: string;
    author?: string;
    summary?: string;
    url: string;
  };
  index: number;
}

const Article: React.FC<ArticleProps> = ({ post, index }) => {
  return (
    <FadeIn key={post._id} delay={index * 0.1}>
      <Link href={post.url} passHref>
        <article
          key={post._id}
          className="relative group flex flex-col overflow-hidden rounded-xl border hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer"
        >
          {post.video && (
            <ReactPlayer
              url={post.video}
              playing={false}
              loop
              muted
              controls={false}
              width="100%"
              height="100%"
              className="absolute top-0 left-0 object-cover w-full h-full"
            />
          )}
          <div className="relative z-10 flex flex-col p-6 bg-black bg-opacity-50 text-white">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            {post.date && post.author && (
              <div className="flex space-x-4 text-sm">
                <p>{formatDate(post.date)}</p>
                <p>{post.author}</p>
              </div>
            )}
            {post.summary && (
              <p className="mt-2 text-sm">{post.summary}</p>
            )}
          </div>
        </article>
      </Link>
    </FadeIn>
  );
};

export default Article;
