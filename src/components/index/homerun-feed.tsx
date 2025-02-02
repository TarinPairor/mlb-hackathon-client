import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Custom hook for managing video feed
const useVideoFeed = () => {
  return useInfiniteQuery({
    queryKey: ["mlbHomeRuns"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/api/getRandomMLBHomeRun`);
      const data = await res.json();
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (_, pages) => pages.length,
    // Pre-fetch 2 videos ahead
    // staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });
};

// Single video component with optimization
interface Video {
  video: string;
  ExitVelocity: number;
  HitDistance: number;
  LaunchAngle: number;
}

const VideoCard = ({
  video,
  isVisible,
}: {
  video: Video;
  isVisible: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(() => {
          // Handle autoplay failure
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isVisible]);

  return (
    <div className="h-screen w-full snap-start flex items-center justify-center bg-black">
      <div className="relative w-full max-w-lg">
        <video
          ref={videoRef}
          src={video.video}
          className="w-full rounded-lg"
          loop
          playsInline
          preload="metadata"
          muted // Consider user preference for sound
        />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-bold">
            Exit Velocity: {video.ExitVelocity}
          </h3>
          <p>Hit Distance: {video.HitDistance}</p>
          <p>Launch Angle: {video.LaunchAngle}</p>
        </div>
      </div>
    </div>
  );
};

// Main feed component
export default function HomeRunFeed() {
  const [currentIndex] = useState(0);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useVideoFeed();

  const allVideos = data ? data.pages.flat() : [];

  // Load more when approaching end
  useEffect(() => {
    if (
      currentIndex >= allVideos.length - 2 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    currentIndex,
    allVideos.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  // Intersection observer for each video
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {allVideos.map((video, index) => (
        <div key={index} ref={index === currentIndex ? ref : null}>
          <VideoCard
            video={video}
            isVisible={index === currentIndex && inView}
          />
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
}
