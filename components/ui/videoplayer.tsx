"use client";
import React from 'react';
import ReactPlayer from 'react-player';



// Define props interface
interface VideoPlayerProps {
  videoUrl: string;
}

// Functional component definition
const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => (
  <div className="overflow-hidden">
    <ReactPlayer
      url={videoUrl}
      playing
      loop
      muted
      playsInline
      width="100%"
      height="100%"
      className="relative -bottom-1 aspect-video"
    />
  </div>
);

export default VideoPlayer;
