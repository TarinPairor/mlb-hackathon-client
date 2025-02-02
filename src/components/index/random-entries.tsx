import { useGetRandomMLBHomeRuns } from "../../apis/api";
import { HomeRunEntry } from "../../types/types";

export default function RandomEntries() {
  const { data: randomEntries } = useGetRandomMLBHomeRuns(5);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">MLB Home Run 2024</h1>
      {randomEntries && randomEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>Single Entry</div>
          {randomEntries.map((video: HomeRunEntry, index: number) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {/* <ReactPlayer
                    width="320px"
                    height="240px"
                    url={video.video}
                    playing
                    muted
                    controls
                  /> */}
              <video width="320" height="240" autoPlay controls={true}>
                <source src={video.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* <div className="p-4">
                    <h4 className="text-lg font-semibold">{video.title}</h4>
                    <p className="text-sm text-gray-600">
                      Exit Velocity: {video.ExitVelocity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Hit Distance: {video.HitDistance}
                    </p>
                    <p className="text-sm text-gray-600">
                      Launch Angle: {video.LaunchAngle}
                    </p>
                  </div> */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No videos available</p>
      )}
    </div>
  );
}
