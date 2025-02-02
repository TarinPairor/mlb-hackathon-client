import { useQuery } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetSampleOf2024MLBHomeRuns = () => {
  return useQuery<string[]>({
    queryKey: ["sampleOf2024MLBHomeRuns"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/api/getSampleOf2024MLBHomeRuns`);
      const data = await res.json();
      return data || [];
    },
  });
};
