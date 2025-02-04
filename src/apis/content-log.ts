import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentLog } from "../types/types";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCreateContentLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newContentLog: ContentLog) => {
      console.log(newContentLog);
      const res = await fetch(`${backendUrl}/api/contentLog/createContentLog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContentLog),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contentLogs"],
      });
    },
    onError: (error: Error) => {
      console.error("Error creating content log:", error);
    },
  });
};
