import { useState, useRef, useEffect } from "react";
import { useCreateGuessTheSpeed } from "../../apis/guess-the-speed";
import { useUser } from "@clerk/clerk-react";

interface ExitVelocityModalProps {
  isOpen: boolean;
  onClose: () => void;
  actualExitVelocity: string;
  play_id: string;
}

export function ExitVelocityModal({
  isOpen,
  onClose,
  actualExitVelocity,
  play_id,
}: ExitVelocityModalProps) {
  const { user } = useUser();
  const [guess, setGuess] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const difference = Math.abs(Number(guess) - Number(actualExitVelocity));
  const createGuessTheSpeedMutation = useCreateGuessTheSpeed();

  useEffect(() => {
    setGuess("");
    setHasGuessed(false);
  }, [play_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess) {
      setHasGuessed(true);
      createGuessTheSpeedMutation.mutate({
        email: user?.primaryEmailAddress?.emailAddress || "",
        guess: Number(guess),
        play_id,
        actual_speed: Number(actualExitVelocity),
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const getScore = () => {
    if (difference <= 1) return "Perfect!";
    if (difference <= 3) return "Great!";
    if (difference <= 5) return "Good!";
    return "Keep trying!";
  };

  return (
    <div
      className={`${isOpen ? "flex" : "hidden"} fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50`}
    >
      <div ref={modalRef} className="relative p-4 w-full max-w-2xl">
        <div className="relative bg-gray-700 rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              Guess the Exit Velocity
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={hasGuessed}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              placeholder="Enter exit velocity (mph)"
            />

            {!hasGuessed && (
              <button
                type="submit"
                className="text-black bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Submit Guess
              </button>
            )}

            {hasGuessed && (
              <div className="text-white space-y-2">
                <h4 className="text-xl font-bold">{getScore()}</h4>
                <p>Your guess: {guess} mph</p>
                <p>Actual: {actualExitVelocity} mph</p>
                <p>Difference: {difference.toFixed(1)} mph</p>
                <button
                  onClick={onClose}
                  className="mt-4 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Close
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
