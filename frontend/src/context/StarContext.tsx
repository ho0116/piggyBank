"use client";

import Challenge from "@/app/types/challengeType";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import useAuth from "@/app/hooks/useAuth"; // 유저 정보를 가져오는 hook

// Context 타입 정의
interface StarContextType {
  starredChallenge: number | null;
  setStarredChallenge: (id: number | null) => void;
}

// Context 생성
const StarContext = createContext<StarContextType | undefined>(undefined);

// Provider 생성
export const StarProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); // 유저 정보 가져오기
  const [starredChallenge, setStarredChallengeState] = useState<number | null>(null);

  // 페이지가 로드될 때 로컬스토리지에서 저장된 사용자별 대표 챌린지를 가져옴
  useEffect(() => {
    if (user?.id) { // 로그인한 사용자가 있는지 확인
      const savedChallenge = localStorage.getItem(`starredChallenge_${user.id}`); // 사용자 ID에 맞는 저장된 챌린지를 불러옴
      if (savedChallenge) {
        setStarredChallengeState(JSON.parse(savedChallenge));
      }
    }
  }, [user]); // user가 변경될 때마다 실행

  // 대표 챌린지 설정 시 사용자별로 로컬스토리지에 저장
  const setStarredChallenge = (id: number | null) => {
    setStarredChallengeState(id);
    if (user?.id) {
      if (id) {
        localStorage.setItem(`starredChallenge_${user.id}`, String(id)); // 사용자 ID를 기반으로 저장
      } else {
        localStorage.removeItem(`starredChallenge_${user.id}`); // 선택 해제 시 로컬스토리지에서 제거
      }
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