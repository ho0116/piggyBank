"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Context 타입 정의
interface StarContextType {
  starredChallenge: string | null;
  setStarredChallenge: (id: string | null) => void;
}

// Context 생성
const StarContext = createContext<StarContextType | undefined>(undefined);

// Provider 생성
export const StarProvider = ({ children }: { children: ReactNode }) => {
  const [starredChallenge, setStarredChallenge] = useState<string | null>(null); // 초기 상태는 null

  return (
    <StarContext.Provider value={{ starredChallenge, setStarredChallenge }}>
      {children}
    </StarContext.Provider>
  );
};

// useStar 훅을 통해 Context API를 쉽게 사용하도록 함
export const useStar = () => {
  const context = useContext(StarContext);
  if (!context) {
    throw new Error("useStar must be used within a StarProvider");
  }
  return context;
};