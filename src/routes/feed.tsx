import { useState, useEffect } from "react";
import { useGetArticles, useGetRandomMLBHomeRuns } from "../apis/api";
import { createFileRoute } from "@tanstack/react-router";
import { mergeFeedItems } from "../utils/feedUtils";
import { VideoPlayer } from "../components/feed/video-player";
import { ArticleCard } from "../components/feed/article-card";
import { FeedNavigation } from "../components/feed/feed-navigation";
import { FeedItem } from "../types/types";
import { useCreateContentLog } from "../apis/content-log";
import { useUser } from "@clerk/clerk-react";
import { ExitVelocityModal } from "../components/feed/exit-velocity-modal";
import { motion } from "framer-motion";
import BaseballIcon from "../assets/baseball-svgrepo-com.svg";

export const Route = createFileRoute("/feed")({
  component: Feed,
});

export default function Feed() {
  const { user } = useUser();
  const {
    data: videos,
    isLoading: isVideosLoading,
    isError,
    error,
  } = useGetRandomMLBHomeRuns(10);
  console.log(videos);
  const { data: articles, isLoading: isArticlesLoading } = useGetArticles(10);
  console.log(articles);

  const createContentLogMutation = useCreateContentLog();

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
        feedItems[currentIndex]?.type === "article"
          ? feedItems[currentIndex].data.title
          : "";
      const play_id =
        feedItems[currentIndex]?.type === "video"
          ? feedItems[currentIndex].data.play_id
          : "";
      if (article_summary || play_id) {
        createContentLogMutation.mutate({
          email: user?.primaryEmailAddress?.emailAddress || "",
          watched_for: duration,
          article_summary,
          play_id,
        });
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

  if (isVideosLoading || isArticlesLoading)
    return (
      <div className="absolute bg-gray-900 inset-0 flex justify-center items-center">
        <img
          src={BaseballIcon}
          alt="Baseball Icon"
          className=" animate-spin"
          width={80}
          height={80}
        />
      </div>
    );
  if (isError) return <>{error.message}</>;

  const currentItem = feedItems[currentIndex];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      {currentItem?.type === "video" ? (
        <div className="text-xs font-bold absolute top-1/6">
          {currentItem.data.title}
        </div>
      ) : (
        <div className="text-xs font-bold absolute top-1/6 p-1">Article</div>
      )}
      <div className="max-w-2xl mx-auto">
        <div className="flex md:flex-row flex-col justify-center md:items-center items-center gap-10">
          {/* Main Content */}
          <motion.div
            key={currentIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-lg overflow-hidden w-[100%]">
              {currentItem?.type === "video" ? (
                <VideoPlayer
                  video={currentItem.data}
                  isActive={true}
                  onLoaded={() => handleItemLoaded(currentIndex)}
                />
              ) : (
                <ArticleCard article={currentItem?.data} />
              )}

              {/* Loading indicator */}
              {!loadedItems.has(currentIndex) &&
                currentItem?.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
                  </div>
                )}
            </div>
          </motion.div>

          {/* Controls and Info */}
          <div className="w-[30%]">
            <FeedNavigation
              onPrevious={handlePrevious}
              onNext={handleNext}
              isFirstItem={currentIndex === 0}
              isLastItem={currentIndex === feedItems.length - 1}
            />
            {/* Video Info */}
            {currentItem?.type === "video" && currentItem?.data && (
              <div className=" text-xs">
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-center items-center">
                      <motion.div
                        // key={currentIndex}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-xs absolute bottom-0 left-0 ml-4"
                      >
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="text-blue-400 hover:text-blue-300 "
                        >
                          Guess The Speed
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {currentItem?.type === "video" && (
        <ExitVelocityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          actualExitVelocity={currentItem?.data.ExitVelocity}
          play_id={currentItem?.data.play_id}
        />
      )}
    </div>
  );
}
