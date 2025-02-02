import { useState } from "react";
import { useGetRandomMLBHomeRuns } from "../apis/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feed")({
  component: Feed,
});

export default function Feed() {
  const { data: videos } = useGetRandomMLBHomeRuns(10);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex flex-row">
          {/* Video Player */}
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              width="320"
              height="240"
              //   className="w-full h-full"
              src={currentVideo?.video}
              controls
              autoPlay
              key={currentVideo?.play_id}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`p-4 rounded-full ${
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
              className={`p-4 rounded-full ${
                currentIndex === videos.length - 1
                  ? "bg-gray-700 text-gray-500"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              ↓
            </button>
          </div>

          {/* Video Info */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">{currentVideo?.title}</h2>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold">Exit Velocity</p>
                <p>{currentVideo?.ExitVelocity}</p>
              </div>
              <div>
                <p className="font-semibold">Hit Distance</p>
                <p>{currentVideo?.HitDistance}</p>
              </div>
              <div>
                <p className="font-semibold">Launch Angle</p>
                <p>{currentVideo?.LaunchAngle}</p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
            {videos.map((_, idx) => (
              <div
                key={idx}
                className={`h-4 w-1 rounded ${
                  idx === currentIndex ? "bg-blue-600" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
