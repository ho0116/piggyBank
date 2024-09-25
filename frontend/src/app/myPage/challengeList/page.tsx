"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllChallenges } from "@/app/api/challengeApi";
import challenge from "@/app/types/challengeType";
import useAuth from "@/app/hooks/useAuth";
import { useStar } from "@/context/StarContext";
import Image from "next/image";
import star_fill from "../../../image/star_fill.png"
import star_outline from "../../../image/star_outline.png"
import Challenge from "@/app/types/challengeType";

export default function ChallengeList() {
  const { user } = useAuth();

  const { starredChallenge, setStarredChallenge } = useStar(); // Star 상태 가져오기
  console.log(starredChallenge)
  const {
    data: challengeList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["challengeList"],
    queryFn: () => getAllChallenges(user?.id as number),
    enabled: !!user?.id,
  });

  // Star 설정 핸들러
  const handleStar = (challenge: Challenge) => {
    setStarredChallenge(challenge); // 대표 챌린지 설정
  };

  // Star 해제 핸들러 (필요하지 않을 수도 있음)
  const handleUnStar = () => {
    setStarredChallenge(null); // 대표 챌린지 해제
  };

  return (
    <div>
      <p className="font-bold text-2xl text-center pt-5 text-cyan-500">
        챌린지 리스트
      </p>
      {isLoading && <div>Loading</div>}
      {isError && <div>{error?.message}</div>}
      {!isError && challengeList && (
        <ul className="max-h-[80%] overflow-y-scroll list-none mt-4 flex flex-col items-center">
          {challengeList.map((c: challenge) => (
            <li
              key={c.id}
              className="py-4 px-2 bg-white rounded-2xl w-10/12 shadow-md shadow-violet-200/20 mb-6"
            >
              <div>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">{c.challengeName}</p>
                  {starredChallenge?.id === c.id ? (
                    <button onClick={handleUnStar}>
                      <Image src={star_fill} width={16} height={16} alt="star_fill" />
                    </button>
                  ) : (
                    <button onClick={() => handleStar(c)}>
                      <Image src={star_outline} width={16} height={16} alt="star_outline" />
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {c.startDate} ~ {c.endDate}
                </p>
                <p
                  className={
                    c.challengeStatus === "In Progress"
                      ? "text-blue-500 w-20 text-sm mb-2"
                      : "bg-red-500  w-20 text-sm mb-2"
                  }
                >
                  {c.challengeStatus}
                </p>
                <p>
                  <span>달성률 </span>{" "}
                  <span className="text-violet-700 font-semibold">
                    {(c.savedAmount / c.targetAmount) * 100} %
                  </span>
                </p>
                <p>{c.challengeDescription}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
