// components/FeedNavigation.tsx
interface FeedNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstItem: boolean;
  isLastItem: boolean;
}

export function FeedNavigation({
  onPrevious,
  onNext,
  isFirstItem,
  isLastItem,
}: FeedNavigationProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onPrevious}
        disabled={isFirstItem}
        className={`p-4 text-black ${
          isFirstItem
            ? "bg-gray-700 text-gray-500"
            : "bg-blue-600 hover:bg-blue-700 "
        }`}
      >
        ↑
      </button>
      <button
        onClick={onNext}
        disabled={isLastItem}
        className={`p-4 text-black ${
          isLastItem
            ? "bg-gray-700 text-gray-500"
            : "bg-blue-600 hover:bg-blue-700 "
        }`}
      >
        ↓
      </button>
    </div>
  );
}
