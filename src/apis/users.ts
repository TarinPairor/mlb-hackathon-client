import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/types";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser: User) => {
      const res = await fetch(`${backendUrl}/api/users/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
