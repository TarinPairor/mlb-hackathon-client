// import { fakeUsers } from "@/constants/constants";
import { User } from "../types/types";
import { createContext } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<
  | UserContextType
  | {
      user: User | null;
      setUser: (user: User | null) => void;
    }
>({ user: null, setUser: () => {} });
