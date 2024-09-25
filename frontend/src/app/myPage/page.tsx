"use client"

import Link from "next/link";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useStar } from "@/context/StarContext";

export default function MyPage() {
  const { user, removeUser } = useAuth();
  const { setStarredChallenge} = useStar();

  const router = useRouter();
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen ">
      {user ? (
        <button
          onClick={() => {
            removeUser();
            setStarredChallenge(null);
            router.push("/user/login");
          }}
        >
          로그아웃
        </button>
      ) : (
        <button onClick={() => router.push("/user/login")}>로그인</button>
      )}
      <div className="mb-16">
        <button className="bg-transparent text-black border-2 border-violet-300 px-4 py-2 rounded-lg w-48 h-16 shadow-sm">
          <Link href={"myPage/account"}>계좌 관리</Link>
        </button>
      </div>
      <div>
        <button className="bg-transparent text-black border-2 border-violet-300 px-4 py-2 rounded-lg w-48 h-16 shadow-sm">
          <Link href={"myPage/challengeList"}>챌린지 관리</Link>
        </button>
      </div>
      <div>
        <button className="bg-transparent text-black border-2 border-red-300 px-4 py-2 rounded-lg w-48 h-16 shadow-sm">
          <Link href={"/challenge/create"}>챌린지 생성</Link>
        </button>
      </div>
    </div>
  );
}