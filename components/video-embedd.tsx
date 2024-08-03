import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import Markdown from "markdown-to-jsx";
import { PictureInPicture } from "lucide-react"; // Import the PiP icon from Lucid Icons

interface VideoEmbedProps {
  src: string;
  text: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ src, text }) => {
  const playerRef = useRef<ReactPlayer>(null);

  const handlePiP = async () => {
    if (playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();
      if (videoElement.requestPictureInPicture) {
        try {
          await videoElement.requestPictureInPicture();
        } catch (error) {
          console.error("Failed to enter Picture-in-Picture mode:", error);
        }
      } else {
        console.warn("Picture-in-Picture is not supported by this browser.");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-2 p-4">
      <motion.div
        className="flex-none lg:w-1/2 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-lg shadow-grey-glow dark:shadow-white-glow overflow-hidden">
          <ReactPlayer
            ref={playerRef}
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
          <motion.button
            className="absolute top-2 left-2 p-2 bg-white dark:bg-black rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePiP}
          >
            <PictureInPicture className="w-6 h-6 text-black dark:text-white" />
          </motion.button>
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
