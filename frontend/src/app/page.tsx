"use client";
import { useStar } from "@/context/StarContext";
import { useQuery } from "@tanstack/react-query";
import { getAllChallenges } from "@/app/api/challengeApi";
import Challenge from "../app/types/challengeType";
import useAuth from "@/app/hooks/useAuth";
import Image from "next/image";
import logo from "../image/piggyBank.png";

export default function Home() {
  const { starredChallenge } = useStar();
  const { user } = useAuth();

  // 전체 챌린지 목록을 가져옴
  const {
    data: challengeList,
    isLoading,
    isError,
    error,
  } = useQuery<Challenge[]>({
    queryKey: ["challengeList"],
    queryFn: () => getAllChallenges(user?.id as number),
    enabled: !!user?.id,
  });

  // 대표 챌린지 찾기
  const currentChallenge = challengeList?.find(
    (challenge) => String(challenge.id) === starredChallenge
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center space-x-4">
        <div className="text-center text-lg font-bold">대표 챌린지</div>
        <div>
          {isLoading && <div>Loading...</div>}
          {isError && <div>{error?.message}</div>}
          {!isError && currentChallenge ? (
            <div className="py-2 px-3 bg-white rounded-lg max-w-fit shadow-md shadow-violet-200/20">
              <div className="flex justify-between items-center">
                <p className="font-bold text-base">
                  {currentChallenge.challengeName}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                {currentChallenge.startDate} ~ {currentChallenge.endDate}
              </p>
              <p
                className={
                  currentChallenge.challengeStatus === "In Progress"
                    ? "text-blue-500 w-20 text-xs mb-1"
                    : "bg-red-500 w-20 text-xs mb-1"
                }
              >
                {currentChallenge.challengeStatus}
              </p>
              <p className="text-violet-700 text-sm font-semibold">
                달성률:{" "}
                {(currentChallenge.savedAmount /
                  currentChallenge.targetAmount) *
                  100}
                %
              </p>
            </div>
          ) : (
            <p className="text-center">선택된 챌린지가 없습니다</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Image src={logo} width={200} height={200} alt="logo" className="opacity-75" />
      </div>
    </div>
  );
}