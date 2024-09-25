// starContext.tsx
"use client";

import Challenge from "@/app/types/challengeType";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Context 타입 정의
interface StarContextType {
  starredChallenge: Challenge | null;
  setStarredChallenge: (challenge: Challenge | null) => void;
}

// Context 생성
const StarContext = createContext<StarContextType | undefined>(undefined);

// Provider 생성
export const StarProvider = ({ children }: { children: ReactNode }) => {
  const [starredChallenge, setStarredChallengeState] =
    useState<Challenge | null>(null);

  // 페이지가 로드될 때 로컬스토리지에서 저장된 대표 챌린지를 가져옴
  useEffect(() => {
    const savedChallenge = localStorage.getItem("starredChallenge");
    if (savedChallenge) {
      setStarredChallengeState(JSON.parse(savedChallenge));
    }
  }, []);

  // 대표 챌린지 설정 시 로컬스토리지에 저장
  const setStarredChallenge = (challenge: Challenge | null) => {
    setStarredChallengeState(challenge);
    if (challenge) {
      localStorage.setItem("starredChallenge", JSON.stringify(challenge)); // 로컬스토리지에 저장
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
