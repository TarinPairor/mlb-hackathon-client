import { createFileRoute } from "@tanstack/react-router";
// import HomeRunFeed from "../components/index/homerun-feed";

// import RandomEntry from "../components/index/random-entry";
// import RandomEntries from "../components/index/random-entries";
// import SampleData from "../components/index/sample-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-4 text-lg font-bold">
      {/* <SampleData /> */}
      {/* <RandomEntry /> */}
      {/* <RandomEntries /> */}
      {/* <HomeRunFeed /> */}
    </div>
  );
}
