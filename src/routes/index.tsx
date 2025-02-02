import { createFileRoute } from "@tanstack/react-router";

// import RandomEntry from "../components/index/random-entry";
import SampleData from "../components/index/sample-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-4">
      <SampleData />
      {/* <RandomEntry /> */}
    </div>
  );
}
