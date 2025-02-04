import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactNode, useState } from "react";
import { User } from "../types/types";
import { UserContext } from "../contexts/user-context";
import Login from "../components/__root/login";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const queryClient = new QueryClient();
export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div className="flex justify-between items-center">
          <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{" "}
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
            <Link to="/feed" className="[&.active]:font-bold">
              Feed
            </Link>
          </div>
          <Login />
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </UserProvider>
    </QueryClientProvider>
  ),
});
