import { useQuery } from "@tanstack/react-query";
import { HomeRunEntry } from "../types/types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useGetSampleOf2024MLBHomeRuns = () => {
  return useQuery<HomeRunEntry[]>({
    queryKey: ["sampleOf2024MLBHomeRuns"],
    queryFn: async (): Promise<HomeRunEntry[]> => {
      const res = await fetch(`${backendUrl}/api/getSampleOf2024MLBHomeRuns`);
      const data = (await res.json()) as HomeRunEntry[];
      return data || [];
    },
  });
};

export const useGetSingleEntryFrom2024MLBHomeRuns = (idx: number) => {
  return useQuery<HomeRunEntry>({
    queryKey: ["singleEntryFrom2024MLBHomeRuns", idx],
    queryFn: async (): Promise<HomeRunEntry> => {
      const res = await fetch(
        `${backendUrl}/api/getSingleEntryFrom2024MLBHomeRuns?idx=${idx}`
      );
      const data = (await res.json()) as HomeRunEntry;
      return data;
    },
  });
};

export const useGetRandomEntryFrom2024MLBHomeRuns = () => {
  return useQuery<HomeRunEntry>({
    queryKey: ["randomEntryFrom2024MLBHomeRuns"],
    queryFn: async (): Promise<HomeRunEntry> => {
      const res = await fetch(
        `${backendUrl}/api/getRandomEntryFrom2024MLBHomeRuns`
      );
      const data = (await res.json()) as HomeRunEntry;
      return data;
    },
  });
};
