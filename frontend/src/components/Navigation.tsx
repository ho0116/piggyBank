"use client";
import Image from "next/image";
import Link from "next/link";
import home from "../image/home.png"
import setting from "../image/setting.png"

export default function Navigation() {

  return (
    <nav>
      <div id="nav_div" className="flex items-center justify-evenly">
        <Link href="/">
          <Image src={home} width={32} height={32} alt="home"></Image>
        </Link>
        <Link href="/myPage">
          <Image src={setting} width={32} height={32} alt="setting"></Image>
        </Link>
      </div>
    </nav>
  );
}