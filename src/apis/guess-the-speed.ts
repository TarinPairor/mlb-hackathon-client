import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GuessTheSpeed } from "../types/types";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useCreateGuessTheSpeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newGuess: GuessTheSpeed) => {
      console.log(newGuess);
      const response = await fetch(
        `${backendUrl}/api/guessTheSpeed/createGuessTheSpeed`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGuess),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guessTheSpeed"] });
    },
  });
};
