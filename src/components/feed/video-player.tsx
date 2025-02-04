// components/VideoPlayer.tsx
import { useEffect, useRef } from "react";
import { HomeRunEntry } from "../../types/types";

interface VideoPlayerProps {
  video: HomeRunEntry;
  isActive: boolean;
  onLoaded: () => void;
}

export function VideoPlayer({ video, isActive, onLoaded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      width="640"
      height="360"
      src={video.video}
      controls
      //   autoPlay={isActive}
      preload="auto"
      muted
      onLoadedData={onLoaded}
      className="w-full h-full object-contain"
    />
  );
}
