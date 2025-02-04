import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser as useClerkUser,
} from "@clerk/clerk-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user-context";
import { useCreateUser } from "../../apis/users";
function Login() {
  const { user: clerkUser } = useClerkUser();
  const { user, setUser } = useContext(UserContext);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const createUserMutation = useCreateUser();
  const userId = 0;

  useEffect(() => {
    if (clerkUser && !isUserCreated && !userId) {
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
    <div className="absolute top-0 right-0 p-4">
      <SignedOut>
        <div className="rounded-lg hover:scale-110">
          <SignInButton></SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
        {user && (
          <div>
            <p className="text-white">Hi {clerkUser?.firstName}</p>
            {/* <p>Email: {user.user_email}</p> */}
          </div>
        )}
      </SignedIn>
    </div>
  );
}

export default Login;
