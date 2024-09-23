"use client";
import { Users } from "@/app/types";
import { createContext, ReactNode, useState } from "react";

interface AuthContextType {
  user: Users | null;
  setUser: (user: Users) => void;
  removeUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  removeUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<Users | null>(null);
  return (
    <AuthContext.Provider
      value={{
        user: users,
        setUser: (user: Users) => setUsers(user),
        removeUser: () => setUsers(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};