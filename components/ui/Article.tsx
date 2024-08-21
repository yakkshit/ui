"use client";

import React, { useEffect, useState } from "react";
import { FadeIn } from "@/registry/components/frontend/fade-in";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { BorderBeam } from "./borderbeam";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ComponentWrapper from "../component-wrapper";
import ReactPlayer from "react-player";
import { LinkPreview } from "../link-preview";

interface ArticleProps {
  post: {
    _id: string;
    video?: string;
    title: string;
    date?: string;
    author?: string;
    summary?: string;
    url: string;
    image?: string;
    previewimg?: string;
    tags?: string[]; // Add tags field
  };
  index: number;
}

const gradients = [
  "linear-gradient(45deg, #44BCFF, #FF44EC, #FF675E)",
  "linear-gradient(45deg, #FF44EC, #FF675E, #44BCFF)",
  "linear-gradient(45deg, #FF675E, #44BCFF, #FF44EC)",
  "linear-gradient(45deg, #44BCFF, #FF675E, #FF44EC)",
  "linear-gradient(45deg, #FF44EC, #44BCFF, #FF675E)",
  "linear-gradient(45deg, #FF675E, #FF44EC, #44BCFF)"
];

const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const Article: React.FC<ArticleProps> = ({ post, index }) => {
  const [gradient, setGradient] = useState(getRandomGradient());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setGradient(getRandomGradient());
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handlePreviewClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <FadeIn key={post._id} delay={index * 0.1}>
      <div className="relative">
        <div className="absolute top-0 left-0 z-10 flex p-2 gap-1">
          <div className="" onClick={handleButtonClick}>
            <span className="bg-pink-500 inline-block center w-3 h-3 rounded-full"></span>{/* close button */}
          </div>
          <div className="circle" onClick={handlePreviewClick}>
            <span className="bg-yellow-500 inline-block center w-3 h-3 rounded-full"></span>{/*Preview button */}
          </div>
          <div className="circle" onClick={handleButtonClick}>
            {post.previewimg && (
              <LinkPreview url={post.previewimg}>
                <span className="bg-green-500 box inline-block center w-3 h-3 rounded-full"></span>
              </LinkPreview>
            )} {/* url button */}
          </div>
        </div>
        <Link href={post.url} passHref>
          <motion.article
            key={post._id}
            className="group relative flex flex-col overflow-hidden w-55 h-64 perspective-1000 shadow-lg rounded-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 15px 10px ${gradient}`, // Corrected syntax
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient Background */}
            <div className="content w-full h-full duration-300 shadow-lg rounded-lg">
              {post.image && (
                <div
                  className="absolute rounded-lg top-0 left-0 w-full h-full group-hover:block group-hover:z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = post.url;
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full justify-center rounded-lg"
                  />
                </div>
              )}
              {/* on hover to hide text */}
              <div className="w-full h-full flex justify-center items-center overflow-hidden rounded-lg group-hover:hidden">
                <div className="absolute w-full h-full p-4 rounded-md flex flex-col justify-start items-start gap-4 bg-black bg-opacity-10 backdrop-blur-lg">
                  <h1
                    className="dark:text-white text-white font-extrabold text-lg"
                    style={{ marginTop: "17px" }}
                  >
                    {post.title}
                  </h1>
                  <p className="dark:text-white text-white text-sm summary">
                    {post.summary}
                  </p>
                  <p className="card-footer text-gray-400 mt-1 text-xs">
                    {formatDate(post.date ?? "")} &nbsp; | &nbsp;
                    <small className="badge dark:text-white text-black font-bold bg-indigo-500 p-1 rounded-md backdrop-blur-sm w-fit">
                      {post.author}
                    </small>
                    {post.tags && (
                      <div className="tags mt-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="tag bg-lime-500 dark:bg-pink-500 text-gray-50 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="tag bg-lime-500 dark:bg-pink-500 text-gray-50 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            ...
                          </span>
                        )}
                      </div>
                    )}
                  </p>
                </div>
              </div>
              <BorderBeam className="group-hover:hidden" />
            </div>
          </motion.article>
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <ReactPlayer url={post.video} playing controls />
            <button
              className="absolute top-2 right-2 text-black"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
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
