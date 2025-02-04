import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser as useClerkUser,
} from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user-context";
import { useCreateUser, useGetUserByEmail } from "../../apis/users";
function Login() {
  const { user: clerkUser } = useClerkUser();
  const { setUser } = useContext(UserContext);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const createUserMutation = useCreateUser();
  const { data: existingUser, isLoading } = useGetUserByEmail(
    clerkUser?.primaryEmailAddress?.emailAddress || ""
  );

  useEffect(() => {
    if (clerkUser && !isUserCreated && !existingUser && !isLoading) {
      const newUser = {
        user_name: clerkUser.firstName || clerkUser.username || "Anonymous",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        info: "",
        elo: 0,
      };
      createUserMutation.mutate(newUser, {
        onSuccess: () => {
          setIsUserCreated(true);
          setUser(newUser);
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clerkUser]);
  return (
    // <div className="absolute top-0 right-0 p-4">
    <div className="flex flex-col mr-3">
      <SignedOut>
        <div className="rounded-lg hover:scale-110">
          <SignInButton></SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Login;
