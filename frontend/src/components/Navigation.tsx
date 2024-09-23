"use client";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav>
      <div>
        <button onClick={() => router.push("/")}>홈</button>
        <button onClick={() => router.push("/login")}>로그인</button>
        <button onClick={() => router.push("/user")}>가입</button>
      </div>
    </nav>
  );
}