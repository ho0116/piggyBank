import Image from "next/image";
import logo from "../image/piggyBank.png";
// import logo2 from '../image/logo2.png'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center space-x-4">
        <div className="text-lg font-bold">금액</div>
        <div className="text-lg font-bold">대표 챌린지</div>
      </div>
      <div className="mt-4">
        <Image src={logo} width={200} height={200} alt="logo" />
      </div>
    </div>
  );
}