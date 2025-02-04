export type HomeRunEntry = {
  play_id: string;
  title: string;
  ExitVelocity: string;
  HitDistance: string;
  LaunchAngle: string;
  video: string;
};

export type Article = {
  title: string;
  paragraphs: string;
  img: string[] | undefined;
  url: string;
};

export type User = {
  // id: number;
  user_name: string;
  email: string;
  info: string;
  elo: number;
};

export type FeedItem =
  | { type: "video"; data: HomeRunEntry }
  | { type: "article"; data: Article };


  export type ContentLog = {
    email: string;
    watched_for: number;
    article_summary: string;
    play_id: string;
  };