// components/Article.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/registry/components/frontend/fade-in";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { BorderBeam } from "./borderbeam";
import { motion } from "framer-motion";

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
        <motion.article
          key={post._id}
          className="group relative flex flex-col overflow-visible w-55 h-64 perspective-1000 shadow-lg rounded-md "
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px 10px rgba(255,255,255,0.3)",
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="content w-full h-full  duration-300 shadow-lg rounded-lg group-hover:rotate-y-180 rotate-animation">
            {post.video && (
              <div className="absolute rounded-lg top-0 left-0 w-full h-full hidden group-hover:block">
                <ReactPlayer
                  url={post.video}
                  playing={true}
                  loop
                  muted
                  controls={false}
                  width="100%"
                  height="100%"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            )}
            {/* on hover to visible with glassmorphic background */}
            <div className="w-full h-full flex justify-center items-center overflow-hidden rounded-lg rotate-y-180 backface-hidden float-animation group-hover:hidden">
              <div className="absolute w-full h-full p-4 rounded-md flex flex-col justify-start items-start gap-4 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 ">
                <h1 className="dark:text-white text-black font-extrabold text-lg">
                  {post.title}
                </h1>
                <p className="dark:text-white text-black text-sm">
                  {post.summary}
                </p>
                <p className="card-footer text-gray-400 mt-1 text-xs">
                  {formatDate(post.date ?? "")} &nbsp; | &nbsp;
                  <small className="badge dark:text-white text-black font-bold bg-indigo-500 p-1 rounded-md backdrop-blur-sm w-fit">
                    {post.author}
                  </small>
                </p>
              </div>
            </div>
            <BorderBeam />
          </div>
        </motion.article>
      </Link>
    </FadeIn>
  );
};

export default Article;

//{
/* <article
          key={post._id}
          className="relative group flex flex-col overflow-hidden rounded-xl border hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 transition-all duration-300 cursor-pointer">
          {post.video && (
            <ReactPlayer
              url={post.video}
              playing={true}
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
        </article> */
//}

//{
/* the above code is used to place the video as bg */
// <p className="card-footer text-gray-400 mt-1 text-xs">
//                 {formatDate(post.date ?? "")} &nbsp; | &nbsp; new
//               </p>
//}
