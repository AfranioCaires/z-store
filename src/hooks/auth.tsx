import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { User } from "@/interfaces/user";
import { client } from "@/network/api";
import { UserSignUp } from "@/interfaces/userSignUp";

interface AuthCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User | null;
  signIn(credentials: AuthCredentials): void;
  signOut(): void;
  signUp(data: UserSignUp): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    const userJSON = JSON.parse(user);
    return userJSON;
  });

  const signIn = useCallback(async ({ email, password }: AuthCredentials) => {
    const { data } = await client.get<User[]>(`users?email=${email}`);

    if (data.length == 0 || data[0].password !== password) {
      throw new Error("Invalid credentials!");
    }

    localStorage.setItem("user", JSON.stringify(data[0]));
    setUser(data[0]);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const signUp = useCallback(async (data: UserSignUp) => {
    const response = await client.post<User>("users", data);

    localStorage.setItem("user", JSON.stringify(response.data));
    setUser(response.data);
  }, []);

  const providerData = useMemo(() => {
    return {
      user,
      signIn,
      signOut,
      signUp,
    };
  }, [user, signIn, signOut, signUp]);

  return (
    <AuthContext.Provider value={providerData}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
}
