"use client";
import { User } from "@/app/types";
import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  removeUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<User | null>(null);
  return (
    <AuthContext.Provider
      value={{
        user: account,
        setUser: (user: User) => setAccount(user),
        removeUser: () => setAccount(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};