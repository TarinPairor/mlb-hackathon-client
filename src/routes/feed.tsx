import { useState, useEffect } from "react";
import { useGetArticles, useGetRandomMLBHomeRuns } from "../apis/api";
import { createFileRoute } from "@tanstack/react-router";
import { mergeFeedItems } from "../utils/feedUtils";
import { VideoPlayer } from "../components/feed/video-player";
import { ArticleCard } from "../components/feed/article-card";
import { FeedNavigation } from "../components/feed/feed-navigation";
import { FeedItem } from "../types/types";
// import { useCreateContentLog } from "../apis/content-log";
// import { useUser } from "@clerk/clerk-react";
import { ExitVelocityModal } from "../components/feed/exit-velocity-modal";

export const Route = createFileRoute("/feed")({
  component: Feed,
});

export default function Feed() {
  // const { user } = useUser();
  const { data: videos } = useGetRandomMLBHomeRuns(10);
  const { data: articles } = useGetArticles(10);
  // const createContentLogMutation = useCreateContentLog();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loadedItems, setLoadedItems] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (videos && articles) {
      setFeedItems(mergeFeedItems(videos, articles));
    }
  }, [videos, articles]);
  useEffect(() => {
    if (startTime !== null) {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // duration in seconds
      console.log(`You watched ${currentIndex} for ${duration} seconds`);
      const article_summary =
        feedItems[currentIndex].type === "article"
          ? feedItems[currentIndex].data.title
          : "";
      const play_id =
        feedItems[currentIndex].type === "video"
          ? feedItems[currentIndex].data.play_id
          : "";
      if (article_summary || play_id) {
        // createContentLogMutation.mutate({
        //   email: user?.primaryEmailAddress?.emailAddress || "",
        //   watched_for: duration,
        //   article_summary,
        //   play_id,
        // });
      }
    }
    // if its a video and it hasnt finished loading, dint set the start time
    if (
      !loadedItems.has(currentIndex) &&
      feedItems[currentIndex]?.type === "video"
    ) {
      return;
    }
    setStartTime(Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, feedItems]);

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
          <div className="relative rounded-lg overflow-hidden w-full h-96 flex flex-col items-center">
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
              <div className="bg-gray-800 rounded-lg text-xs p-2">
                <h2 className="mb-2">{currentItem.data.title}</h2>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-center items-center">
                      {/* <p className="font-semibold">Exit Velocity</p> */}
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Guess The Speed
                      </button>
                    </div>
                    {/* <p>{currentItem.data.ExitVelocity}</p> */}
                  </div>
                  {/* <div>
                    <p className="font-semibold">Hit Distance</p>
                    <p>{currentItem.data.HitDistance}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Launch Angle</p>
                    <p>{currentItem.data.LaunchAngle}</p>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {currentItem.type === "video" && (
        <ExitVelocityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          actualExitVelocity={currentItem.data.ExitVelocity}
        />
      )}
    </div>
  );
}
