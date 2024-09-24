import Link from "next/link";

export default function MyPage(){
    return(
        <div className=" flex flex-col justify-center items-center min-h-screen ">
            <div className="mb-16">
                <button className="bg-transparent text-black border-2 border-red-300 px-4 py-2 rounded-lg w-48 h-16 shadow-sm">
                    <Link href={""}>계좌 관리</Link></button>
            </div>
            <div>
                <button className="bg-transparent text-black border-2 border-red-300 px-4 py-2 rounded-lg w-48 h-16 shadow-sm">
                    <Link href={"myPage/challengeList"}>챌린지 관리</Link></button>
            </div>
        </div>
    )
}