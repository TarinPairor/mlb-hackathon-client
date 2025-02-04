// components/ArticleCard.tsx
import { Article } from "../../types/types";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 w-full h-[100%]">
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
  );
}
