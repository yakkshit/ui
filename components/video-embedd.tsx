import React from "react";

interface VideoEmbedProps {
  src: string;
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ src }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="relative h-full justify-center overflow-hidden">
        {/* dark shadow top  */}
        {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div> */}
        <iframe
          className="rounded-lg" // Add this line to apply rounded corners
          width="520"
          height="300"
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
        {/* dark shadow bottom  */}
        {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div> */}
      </div>
    </div>
  );
};

export default VideoEmbed;
