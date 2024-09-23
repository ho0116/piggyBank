"use client";
import Link from "next/link";

export default function Navigation() {

  return (
    <nav>
      <div id="nav_div">
        <Link href="/">
          <button>홈</button>
        </Link>
        <Link href="/myPage">
          <button>마이페이지</button>
        </Link>
      </div>
    </nav>
  );
}