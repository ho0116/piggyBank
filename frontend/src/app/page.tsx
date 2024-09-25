"use client"
import Image from "next/image";
import logo from "../image/piggyBank.png";
import { useStar } from "@/context/StarContext";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {

  const {starredChallenge} = useStar();
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center space-x-4">
        <div className="font-bold text-center text-gray-600 mb-20">{
            starredChallenge ? (
              <>
                <p className="mb-10 text-2xl">{starredChallenge.challengeName}</p>
                <p className="text-xl">{starredChallenge.savedAmount} 원 저금 중...</p>
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
        {starredChallenge ? (
          <p className="mt-10 text-3xl font-bold text-cyan-500">{starredChallenge?.savedAmount / starredChallenge?.targetAmount} %</p>
          ) : (
            <button className="mt-12 bg-cyan-500 text-white w-full h-12 rounded-md font-semibold" onClick={()=>{router.push("/myPage/challengeList")}}>챌린지 보러가기</button>
          )
        }
      </div>
    </div>
  );
}