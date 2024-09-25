"use client"
import Image from "next/image";
import logo from "../image/piggyBank.png";
import { useStar } from "@/context/StarContext";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getChallenge } from "./api/challengeApi";

export default function Home() {

  const {starredChallenge} = useStar();
  const router = useRouter();

  const {data:challenge} = useQuery({
    queryKey:["callenge", starredChallenge],
    queryFn: ()=> getChallenge(starredChallenge as number)
  })

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center space-x-4">
        <div className="font-bold text-center text-gray-600 mb-20">{
            challenge ? (
              <>
                <p className="mb-10 text-2xl hover:text-violet-700" onClick={()=>{router.push(`/challenge/detail/${challenge.id}`)}}>{challenge.challengeName}</p>
                <p className="text-xl font-semibold" ><span className="text-2xl"> {challenge.savedAmount.toLocaleString()}원</span>   저금 중...</p>
              </>
            ) :
            (<p className="text-xl">
              대표 챌린지를 설정해보세요!
            </p>)
          }
        </div>
      </div>
      <div className="text-center">
        <Image src={logo} width={200} height={200} alt="logo" />
        {challenge ? (
          <p className="mt-10 text-4xl font-bold text-cyan-500">{Math.trunc(challenge?.savedAmount / challenge?.targetAmount * 100)} %</p>
          ) : (
            <button className="mt-12 bg-cyan-500 text-white w-full h-12 rounded-md font-semibold" onClick={()=>{router.push("/myPage/challengeList")}}>챌린지 보러가기</button>
          )
        }
      </div>
    </div>
  );
}