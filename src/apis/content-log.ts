import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContentLog } from "../types/types";
import { useQuery } from "@tanstack/react-query";
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

export const useGetContentLogFromEmail = (email: string) => {
  return useQuery<ContentLog[]>({
    queryKey: ["contentLog", email],
    queryFn: async () => {
      console.log(
        `${backendUrl}/api/contentLog/getContentLogFromEmail?email=${email}`
      );
      const res = await fetch(
        `${backendUrl}/api/contentLog/getContentLogFromEmail?email=${email}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
  });
};
