import { useState } from "react";
import { useGetRandomEntryFrom2024MLBHomeRuns } from "../../apis/api";

export default function RandomEntry() {
  const { data: randomEntry } = useGetRandomEntryFrom2024MLBHomeRuns();
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">MLB Home Run 2024</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>Random Entry</div>
        {randomEntry && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <video
              width="320"
              height="240"
              autoPlay
              controls={true}
              muted={isMuted}
            >
              <source src={randomEntry.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-4">
              <h4 className="text-lg font-semibold">{randomEntry.title}</h4>
              <p className="text-sm text-gray-600">
                Exit Velocity: {randomEntry.ExitVelocity}
              </p>
              <p className="text-sm text-gray-600">
                Hit Distance: {randomEntry.HitDistance}
              </p>
              <p className="text-sm text-gray-600">
                Launch Angle: {randomEntry.LaunchAngle}
              </p>
              <button
                onClick={toggleMute}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
