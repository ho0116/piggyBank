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
      
      <div>
        <button className="mt-12 bg-custom text-white w-48 h-16 rounded-lg font-semibold">
          <Link href={"myPage/account"}>계좌 관리</Link>
        </button>
      </div>
      <div>
        <button className="mt-12 bg-custom text-white w-48 h-16 rounded-lg font-semibold">
          <Link href={"myPage/challengeList"}>챌린지 관리</Link>
        </button>
      </div>
      <div>
        <button className="mt-12 bg-custom text-white w-48 h-16 rounded-lg font-semibold">
          <Link href={"/challenge/create"}>챌린지 생성</Link>
        </button>
      </div>

      {user ? (
        <button
          onClick={() => {
            removeUser();
            setStarredChallenge(null);
            router.push("/user/login");
          }}
          className="mt-12 bg-red-300 text-white w-48 h-16 rounded-lg font-semibold"
        >
          로그아웃
        </button>
      ) : (
        <button className="mt-12 bg-blue-300 text-white w-48 h-16 rounded-lg font-semibold" onClick={() => router.push("/user/login")}>로그인</button>
      )}
    </div>
  );
}