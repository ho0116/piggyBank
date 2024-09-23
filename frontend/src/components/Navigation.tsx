"use client";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav>
      <div>
      <button onClick={() => router.push("/auth/login")}>로그인</button>
        <button onClick={() => router.push("/auth/join")}>가입</button>
      </div>
    </nav>
  );
}