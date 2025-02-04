import { useState, useRef, useEffect } from "react";
import { useGetRandomMLBHomeRuns } from "../apis/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feed")({
  component: Feed,
});

export default function Feed() {
  const { data: videos } = useGetRandomMLBHomeRuns(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!videos) return;

    // Initialize refs array
    videoRefs.current = Array(videos.length).fill(null);

    // Preload all videos
    videos.forEach((video, index) => {
      const videoElement = document.createElement("video");
      videoElement.src = video.video;
      videoElement.preload = "auto";

      videoElement.addEventListener("loadeddata", () => {
        setLoadedVideos((prev) => new Set([...prev, index]));
      });
    });
  }, [videos]);

  useEffect(() => {
    if (!videos || !videoRefs.current[currentIndex]) return;

    // Pause all videos except current
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef && index !== currentIndex) {
        videoRef.pause();
        videoRef.currentTime = 0;
      }
    });

    // Play current video
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.play().catch(() => {
        // Handle autoplay failure
      });
    }
  }, [currentIndex, videos]);

  if (!videos) return <div>Loading...</div>;

  const currentVideo = videos[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-row justify-center gap-10">
          {/* Video Container */}
          <div className="relative rounded-lg overflow-hidden w-full h-64">
            {/* Hidden preloaded videos */}
            <div className="hidden">
              {videos.map(
                (video, index) =>
                  index !== currentIndex && (
                    <video
                      key={video.play_id}
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video.video}
                      preload="auto"
                    />
                  )
              )}
            </div>

            {/* Current video */}
            <div className="">
              <video
                ref={(el) => (videoRefs.current[currentIndex] = el)}
                width="640"
                height="360"
                src={currentVideo.video}
                controls
                autoPlay
                preload="auto"
                key={currentVideo.play_id}
                muted
              />
            </div>

            {/* Loading indicator */}
            {!loadedVideos.has(currentIndex) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
              </div>
            )}
          </div>

          {/* Controls and Info */}
          <div className="w-[30%]">
            {/* Navigation Buttons */}
            <div className="flex flex-col">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={` text-black ${
                  currentIndex === 0
                    ? "bg-gray-700 text-gray-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                ↑
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === videos.length - 1}
                className={` text-black ${
                  currentIndex === videos.length - 1
                    ? "bg-gray-700 text-gray-500"
                    : "bg-blue-600 hover:bg-blue-700 "
                }`}
              >
                ↓
              </button>
            </div>

            {/* Video Info */}
            <div className="bg-gray-800 rounded-lg">
              <h2 className="text-xs font-bold mb-2">{currentVideo.title}</h2>
              <div className="space-y-2">
                <div>
                  <p className="font-semibold">Exit Velocity</p>
                  <p>{currentVideo.ExitVelocity}</p>
                </div>
                <div>
                  <p className="font-semibold">Hit Distance</p>
                  <p>{currentVideo.HitDistance}</p>
                </div>
                <div>
                  <p className="font-semibold">Launch Angle</p>
                  <p>{currentVideo.LaunchAngle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
