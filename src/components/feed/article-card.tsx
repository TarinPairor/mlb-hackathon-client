// components/ArticleCard.tsx
import { Article } from "../../types/types";
import BaseballIcon from "../../assets/baseball-svgrepo-com.svg";
import BB from "../../assets/bb.png";
interface ArticleCardProps {
  article: Article | undefined;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg w-full h-96 relative md:hover:scale-105">
      <a
        href={article?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        <div className="absolute inset-0 flex justify-center items-start p-3">
          <img
            src={BaseballIcon}
            alt="Baseball Icon"
            className="opacity-10 animate-bounce"
            width={80}
            height={80}
          />
        </div>
        <div className="p-4 flex flex-col gap-6 items-center">
          <h1 className="opacity-0">Article</h1>
          <h2 className="text-xl font-bold mb-4">{article?.title}</h2>
          <p className="text-gray-300 line-clamp-6">{article?.paragraphs}</p>
          <img src={BB} className="object-contain w-64 rounded-2xl" />
        </div>
      </a>
    </div>
  );
}
