import { Article, FeedItem, HomeRunEntry } from "../types/types";

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function mergeFeedItems(
  videos: HomeRunEntry[],
  articles: Article[]
): FeedItem[] {
  const videoItems = videos.map((video) => ({
    type: "video" as const,
    data: video,
  }));
  const articleItems = articles.map((article) => ({
    type: "article" as const,
    data: article,
  }));

  return shuffleArray([...videoItems, ...articleItems]);
}
