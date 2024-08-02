import React from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import Markdown from "markdown-to-jsx";

interface VideoEmbedProps {
  src: string;
  text: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ src, text }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-2 p-4">
      <motion.div
        className="flex-none lg:w-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-lg shadow-grey-glow dark:shadow-white-glow overflow-hidden">
          <ReactPlayer
            url={src}
            width="100%"
            height="300px"
            controls={true}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                  rel: 0,
                },
              },
            }}
          />
        </div>
      </motion.div>
      <motion.div
        className="mt-4 lg:mt-0 lg:w-1/2 overflow-y-auto"
        style={{ maxHeight: '300px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 rounded-lg bg-white dark:bg-black shadow-md">
          <Markdown>{text}</Markdown>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoEmbed;
