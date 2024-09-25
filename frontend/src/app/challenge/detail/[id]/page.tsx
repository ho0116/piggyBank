"use client"

import { saveMoney } from "@/app/api/transactionApi";
import Challenge from "@/app/types/challengeType";
import Transaction from "@/app/types/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function detailPage () {

    const { id } = useParams();

    const queryClient = useQueryClient();
    const cachedChallengeData = queryClient.getQueryData<Challenge[]>(["challengeList"]);

    const currentChallenge = cachedChallengeData?.filter((c:Challenge)=> c.id == Number(id))[0]

    const [transaction, setTransaction] = useState<Transaction>({
        virtualAccountId: 0,
        amount: 0,
        description: '',
    });

    useEffect(()=>{
        setTransaction({
            virtualAccountId: currentChallenge?.virtualAccountId as number,
            amount: currentChallenge?.amount as number,
            description: currentChallenge?.challengeName as string
        })
    },[transaction])

    const saveMutation = useMutation({
        mutationFn: saveMoney
    })

    const handleSave = () => {
        saveMutation.mutate(transaction);
    }

    return (
    <div>
        <div>
            {currentChallenge ? (
                <div className="flex flex-col justify-center items-center align-middle min-h-screen">
                    <p className="font-bold text-2xl text-center text-gray-600">{currentChallenge?.challengeName}</p>
                    <p className={"In Progress" ? "text-blue-500 text-sm mb-2" : "bg-red-500  w-20 text-sm mb-2"}>{currentChallenge?.challengeStatus}</p>
                    <p className="font-semibold text-sm text-center text-gray-400 w-10/12 rounded-md p-2 mb-2">{currentChallenge?.startDate} - {currentChallenge?.endDate}</p>
                    <p className="font-semibold text-xl text-center text-cyan-500 w-10/12 rounded-md p-2 mb-2">{currentChallenge?.savedAmount/currentChallenge?.targetAmount} %</p>
                    <p className="font-semibold text-lg text-center text-gray-600 w-10/12 rounded-md p-2 mb-4"><span className="text-xl font-bold">{currentChallenge?.targetAmount}원</span> 중 <br/> <span className="text-xl font-bold">{currentChallenge?.savedAmount}원</span> 모았어요</p>
                    <div className="font-semibold text-md text-center itme align-middle text-gray-600 bg-white w-10/12 rounded-md p-2 mb-4 min-h-48"><p>{currentChallenge?.challengeDescription}</p></div>
                    <p className="font-semibold text-xs text-center text-gray-400 w-10/12 rounded-md p-2"> * 버튼을 클릭하면 설정한 금액을 저축할 수 있어요</p>
                    <button className=" bg-cyan-500 text-white w-10/12 h-12 rounded-md font-semibold" onClick={handleSave}>{currentChallenge.amount} 저축하기</button>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center align-middle min-h-screen">
                    <p className="text-sm text-gray-600">찾을 수 없는 챌린지입니다.</p>
                </div>
            )
        }
        </div>
    </div>
    )
}