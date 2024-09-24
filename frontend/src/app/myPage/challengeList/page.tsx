"use client"

import { useQuery } from "@tanstack/react-query";
import { getAllChallenges } from "@/app/api/challengeApi";
import challenge from "@/app/types/challengeType";
import useAuth from "@/app/hooks/useAuth";

export default function ChallengeList(){

    // const [list, setList] = useState([]);
    const {user} = useAuth();
    
    const {data:challengeList, isLoading, isError} = useQuery({
        queryKey:["challengeList"],
        queryFn: ()=> getAllChallenges(user?.id as number),
        enabled: !!user?.id,
    })

    console.log(user?.id, challengeList)

    return (
        <div>
            <p className="font-bold text-2xl text-center pt-5 text-cyan-500">챌린지 리스트</p>
            {isLoading && <div>Loading</div>}
            {isError && <div>Error</div>}
            {!isError && challengeList && 
        
            <ul className="max-h-[80%] overflow-y-scroll list-none mt-4 flex flex-col items-center">
            {challengeList.map((c: challenge) => (
              <li key={c.id} className="py-4 px-2 bg-white rounded-2xl w-10/12 shadow-md shadow-violet-200/20 mb-6">
                <div>
                    <p className="font-bold text-lg">{c.challengeName}</p>
                    <p className="text-sm text-gray-500">{c.startDate} ~ {c.endDate}</p>
                    <p className={c.challengeStatus === "In Progress" ? "text-blue-500 w-20 text-sm mb-2" : "bg-red-500  w-20 text-sm mb-2"}>{c.challengeStatus}</p>
                    {/* <p>현재 저축액 <span className="text-violet-700 font-semibold">{c.savedAmount} 원</span> </p> */}
                    <p><span>달성률 </span> <span className="text-violet-700 font-semibold">{c.savedAmount/c.targetAmount * 100} %</span> </p>
                    {/* <p>{c.challengeDescription}</p> */}
                    <p>{c.challengeDescription}</p>
                </div>
              </li>
            ))}
          </ul>}
        </div>
    )
}