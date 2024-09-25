"use client"

import { deleteChallenge, getChallenge } from "@/app/api/challengeApi";
import { saveMoney } from "@/app/api/transactionApi";
import Challenge from "@/app/types/challengeType";
import Transaction from "@/app/types/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function detailPage () {

    const { id } = useParams();

    const queryClient = useQueryClient();

    const {data:challenge} = useQuery({
        queryKey: ["challenge", id],
        queryFn: ()=> getChallenge(Number(id))
    })

    const saveMutation = useMutation({
        mutationFn: saveMoney,
        onSuccess: ()=>{
            queryClient.invalidateQueries({ queryKey: ["challenge"] }).then(() => {
                queryClient.refetchQueries({ queryKey: ["challenge"] }); 
            });
            // queryClient.invalidateQueries({})
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteChallenge
    })

    const transaction= {
        virtualAccountId: challenge?.virtualAccount?.id as number,
        amount: challenge?.amount as number,
        description: challenge?.challengeName as string,
    };

    const handleSave = () => {
        saveMutation.mutate(transaction);
    }

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    }

    return (
    <div>
        <div>
            {challenge ? (
                <div className="flex flex-col justify-center items-center align-middle min-h-screen">
                    <p className="font-bold text-2xl text-center text-gray-600">{challenge?.challengeName}</p>
                    {
                        challenge.challengeStatus =="In Progress" ? <p className="text-blue-500 text-sm mb-2">현재 진행 중</p> :
                        <p className="bg-red-500  w-20 text-sm mb-3">종료</p>
                    }
                    <p className="font-semibold text-sm text-center text-gray-400 w-10/12 rounded-md p-2 mb-3">{challenge?.startDate} ~ {challenge?.endDate}</p>
                    <p className="font-semibold text-2xl text-center text-cyan-500 w-10/12 rounded-md p-2 my-7">{Math.trunc(challenge?.savedAmount / challenge?.targetAmount * 100)} %</p>
                    <p className="font-semibold text-lg text-center text-gray-600 w-10/12 rounded-md p-2 mb-4"><span className="text-xl font-bold">{challenge?.targetAmount.toLocaleString()}원</span> 중 <br/> <span className="text-xl font-bold">{challenge?.savedAmount.toLocaleString()}원</span> 모았어요</p>
                    <div className="font-semibold text-md text-center items-center align-middle text-gray-600 bg-white w-10/12 rounded-md px-2 py-4 mb-12 min-h-48 shadow-md shadow-violet-200/20"><p>{challenge?.challengeDescription}</p></div>
                    <p className="font-semibold text-xs text-center text-gray-400 w-10/12 rounded-md p-2"> * 버튼을 클릭하면 설정한 금액을 저축할 수 있어요</p>
                    <button className=" bg-cyan-500 text-white w-10/12 h-12 rounded-md font-semibold mb-4" onClick={handleSave}>{challenge.amount.toLocaleString()}원 저축하기</button>
                    {/* <button className=" bg-red-400 text-white w-10/12 h-12 rounded-md font-semibold" onClick={()=>handleDelete(challenge.id as number)}>챌린지 삭제하기</button> */}
                
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