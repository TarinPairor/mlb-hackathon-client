// components/ArticleCard.tsx
import { Article } from "../../types/types";
import BaseballIcon from "../../assets/baseball-svgrepo-com.svg";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg w-full h-96 relative">
      <div className="absolute inset-0 flex justify-center items-start p-3">
        <img
          src={BaseballIcon}
          alt="Baseball Icon"
          className="opacity-10 animate-spin"
          width={80}
          height={80}
        />
      </div>
      <div className="p-4 flex flex-col gap-6">
        <h1 className="opacity-0">Article</h1>
        <h2 className="text-xl font-bold mb-4">{article.title}</h2>
        <p className="text-gray-300 line-clamp-6">{article.paragraphs}</p>
        <a
          href={article.url}
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
