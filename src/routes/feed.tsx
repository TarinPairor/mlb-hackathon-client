import { useState, useEffect } from "react";
import { useGetArticles, useGetRandomMLBHomeRuns } from "../apis/api";
import { createFileRoute } from "@tanstack/react-router";
import { mergeFeedItems } from "../utils/feedUtils";
import { VideoPlayer } from "../components/feed/video-player";
import { ArticleCard } from "../components/feed/article-card";
import { FeedNavigation } from "../components/feed/feed-navigation";
import { FeedItem } from "../types/types";

export const Route = createFileRoute("/feed")({
  component: Feed,
});

export default function Feed() {
  const { data: videos } = useGetRandomMLBHomeRuns(10);
  const { data: articles } = useGetArticles(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (videos && articles) {
      setFeedItems(mergeFeedItems(videos, articles));
    }
  }, [videos, articles]);

  const handleItemLoaded = (index: number) => {
    setLoadedItems((prev) => new Set([...prev, index]));
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < feedItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!feedItems.length) return <div>Loading...</div>;

  const currentItem = feedItems[currentIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-row justify-center gap-10">
          {/* Main Content */}
          <div className="relative rounded-lg overflow-hidden w-full h-64">
            {currentItem.type === "video" ? (
              <VideoPlayer
                video={currentItem.data}
                isActive={true}
                onLoaded={() => handleItemLoaded(currentIndex)}
              />
            ) : (
              <ArticleCard article={currentItem.data} />
            )}

            {/* Loading indicator */}
            {!loadedItems.has(currentIndex) && currentItem.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
              </div>
            )}
          </div>

          {/* Controls and Info */}
          <div className="w-[30%]">
            <FeedNavigation
              onPrevious={handlePrevious}
              onNext={handleNext}
              isFirstItem={currentIndex === 0}
              isLastItem={currentIndex === feedItems.length - 1}
            />
            {/* Video Info */}
            {currentItem.type === "video" && currentItem.data && (
              <div className="bg-gray-800 rounded-lg">
                <h2 className="text-xs font-bold mb-2">
                  {currentItem.data.title}
                </h2>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold">Exit Velocity</p>
                    <p>{currentItem.data.ExitVelocity}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Hit Distance</p>
                    <p>{currentItem.data.HitDistance}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Launch Angle</p>
                    <p>{currentItem.data.LaunchAngle}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
