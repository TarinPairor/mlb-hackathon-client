import { createFileRoute } from "@tanstack/react-router";
import { useGetSampleOf2024MLBHomeRuns } from "../apis/api";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data } = useGetSampleOf2024MLBHomeRuns();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {data && data.length > 0 ? (
        <div>
          {data.slice(0, 1).map((video, index) => (
            <div key={index} className="">
              <video width="320" height="240" autoPlay>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
}
