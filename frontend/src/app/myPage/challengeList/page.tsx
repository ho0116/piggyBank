"use client";
import { getAllChallenges } from "@/app/api/challengeApi";
import challenge from "@/app/types/challengeType";
import useAuth from "@/app/hooks/useAuth";
import { useStar } from "@/context/StarContext";
import Image from "next/image";
import star_fill from "../../../image/star_fill.png";
import star_outline from "../../../image/star_outline.png";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import Challenge from "@/app/types/challengeType";
import { useRouter } from "next/navigation";

export default function ChallengeList() {
  const { user } = useAuth();
<<<<<<< Updated upstream
  const { starredChallenge, setStarredChallenge } = useStar(); // Star 상태 가져오기

=======
  
  const router = useRouter();

  const { starredChallenge, setStarredChallenge } = useStar(); // Star 상태 가져오기
>>>>>>> Stashed changes
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const itemRef = useRef<HTMLLIElement | null>(null); // ref 선언

  // 동적으로 itemsPerPage 계산 (실제 높이를 기반으로)
  const calculateItemsPerPage = () => {
    if (itemRef.current) {
      const itemHeight = itemRef.current.clientHeight; // 실제 항목 높이 가져오기
      const availableHeight =
        window.innerHeight - document.querySelector("nav")!.clientHeight - 80; // 네비게이션 바 높이 제외
      return Math.floor(availableHeight / itemHeight);
    }
    return 3; // 기본값
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    handleResize(); // 초기 계산
    window.addEventListener("resize", handleResize); // 창 크기 변경 감지
    return () => window.removeEventListener("resize", handleResize); // cleanup
  }, [itemRef]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = challengeList?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((challengeList?.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Star 설정 핸들러
  const handleStar = (challenge: Challenge) => {
    setStarredChallenge(challenge); // 대표 챌린지 설정
  };

  // Star 해제 핸들러 (필요하지 않을 수도 있음)
  const handleUnStar = () => {
    setStarredChallenge(null); // 대표 챌린지 해제
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-80px)]"> {/* 전체 화면 높이에서 네비게이션 바 높이 제외 */}
  <p className="font-bold text-2xl text-center pt-5 text-cyan-500">
    챌린지 리스트
  </p>
  
  {/* 챌린지 리스트 */}
  <div className="flex-grow mt-4">
    {isLoading && <div>Loading...</div>}
    {isError && <div>{error?.message}</div>}
    {!isError && currentItems && (
      <ul className="list-none flex flex-col items-center space-y-6">
        {currentItems.map((c: challenge, index: number) => (
          <li
            key={c.id}
            className="py-4 px-2 bg-white rounded-2xl w-10/12 shadow-md shadow-violet-200/20"
            ref={index === 0 ? itemRef : null} 
            onClick={()=>{router.push(`/challenge/detail/${c.id}`)}}
          >
            <div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">{c.challengeName}</p>
                {starredChallenge?.id === c.id ? (
                  <button onClick={handleUnStar}>
                    <Image
                      src={star_fill}
                      width={20}
                      height={20}
                      alt="star_fill"
                    />
                  </button>
                ) : (
                  <button onClick={() => handleStar(c)}>
                    <Image
                      src={star_outline}
                      width={20}
                      height={20}
                      alt="star_outline"
                    />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {c.startDate} ~ {c.endDate}
              </p>
              <p
                className={
                  c.challengeStatus === "In Progress"
                    ? "text-blue-500 w-20 text-sm mb-1"
                    : "bg-red-500 w-20 text-sm mb-1"
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

  {/* 페이지네이션 버튼 */}
  <div className="mb-4">
    <div className="flex justify-center items-center">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`mx-1 px-2 py-1 ${
              currentPage === pageNumber
                ? "bg-purple-500 text-white"
                : "bg-purple-200 text-purple-700"
            } rounded`}
          >
            {pageNumber}
          </button>
        )
      )}
    </div>
  </div>
</div>
  );
}