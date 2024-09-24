import Image from "next/image";
import logo from '../image/piggyBank.png'
// import logo2 from '../image/logo2.png'

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div>
        금액
      </div>
      <div>
        <Image src={logo} width={200} height={200} alt="logo"></Image>
      </div>
    </div>
  );
}
