"use client";

import { User } from "@/app/types/userTypes";
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
  const [users, setUsers] = useState<User | null>(null);
  return (
    <AuthContext.Provider
      value={{
        user: users,
        setUser: (user: User) => setUsers(user),
        removeUser: () => setUsers(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};