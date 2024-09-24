"use client"

import { useQuery } from "@tanstack/react-query";
import { getAllChallenges } from "@/app/api/challengeApi";
import challenge from "@/app/types/challengeType";

export default function ChallengeList(){

    // const [list, setList] = useState([]);
    
    const {data:challengeList, isLoading, isError} = useQuery({
        queryKey:["challengeList"],
        queryFn: getAllChallenges
    })

    return (
        <div>
            {isLoading && <div>Loading</div>}
            {isError && <div>Error</div>}
            {challengeList && 
            <ul>
                {challengeList.map((c:challenge)=>(
                    <li key={c.id}>{c.challengeName}</li>
                ))}
            </ul>}
        </div>
    )
}