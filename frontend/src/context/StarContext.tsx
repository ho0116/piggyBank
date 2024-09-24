// starContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Context 타입 정의
interface StarContextType {
  starredChallenge: string | null;
  setStarredChallenge: (id: string | null) => void;
}

// Context 생성
const StarContext = createContext<StarContextType | undefined>(undefined);

// Provider 생성
export const StarProvider = ({ children }: { children: ReactNode }) => {
  const [starredChallenge, setStarredChallengeState] = useState<string | null>(null);

  // 페이지가 로드될 때 로컬스토리지에서 저장된 대표 챌린지를 가져옴
  useEffect(() => {
    const savedChallenge = localStorage.getItem("starredChallenge");
    if (savedChallenge) {
      setStarredChallengeState(savedChallenge);
    }
  }, []);

  // 대표 챌린지 설정 시 로컬스토리지에 저장
  const setStarredChallenge = (id: string | null) => {
    setStarredChallengeState(id);
    if (id) {
      localStorage.setItem("starredChallenge", id); // 로컬스토리지에 저장
    } else {
      localStorage.removeItem("starredChallenge"); // 선택 해제 시 로컬스토리지에서 제거
    }
  };

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