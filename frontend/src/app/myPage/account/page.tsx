"use client"

import { createAccount, deleteAccount, getMyAccount } from "@/app/api/accountApi";
import useAuth from "@/app/hooks/useAuth";
import MyAccount from "@/app/types/accountType";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"

export default function Account(){

    const {user} = useAuth();
    const router = useRouter();

    const [account, setAccount] = useState<MyAccount>({
        userId: undefined,
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        balance: 0
    });

    useEffect(() => {
        if (!user) {
          router.push("/user/login");
        } else if (user.id !== undefined) {
          setAccount((prevAccount) => ({
            ...prevAccount,
            userId: user.id,
          }));
        }
      }, [user, router]);

    const {data:accountList, isLoading, isError} = useQuery({
        queryKey:["accountList"],
        queryFn: () => getMyAccount(user?.id as number),
        enabled: !!user?.id,
    })

    const queryClient = new QueryClient();

    const createMutate = useMutation({
        mutationFn:createAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accountList"] });
            alert("등록 성공!");
        },
        onError: (error)=>{
            alert("등록 실패")
        }
    })

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createMutate.mutate(account);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccount((prevAccount) => ({
          ...prevAccount,
          [name]: name === 'balance' ? parseInt(value) : value, // balance는 숫자로 변환
        }));
    };

    const deleteMutation = useMutation({
        mutationFn: deleteAccount,
        onSuccess: ()=>{
            alert('삭제 성공')
        }
    })

    const handleDelete = (id: number) => {
        deleteMutation.mutate(id);
    };

    return(<div className="flex flex-col justify-center items-center">
        <div className="w-11/12 h-[360px] bg-white overflow-y-scroll list-none mt-4 flex flex-col rounded-md p-3 shadow-md shadow-violet-200/20">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label>은행명</label>
                    <input id="bankName" name="bankName" value={account.bankName} onChange={handleInputChange} className="border border-gray-200 rounded-md p-2 mb-2"></input>
                </div>
                <div className="flex flex-col">
                    <label>계좌번호</label>
                    <input id="accountNumber" name="accountNumber" value={account.accountNumber} onChange={handleInputChange} className="border border-gray-200 rounded-md p-2 mb-2"></input>
                </div>
                <div className="flex flex-col">
                    <label>예금주</label>
                    <input id="accountHolder" name="accountHolder" value={account.accountHolder} onChange={handleInputChange}className="border border-gray-200 rounded-md p-2 mb-2" ></input>
                </div>
                <div className="flex flex-col">
                    <label>잔액</label>
                    <input type="number" id="balance" name="balance" value={account.balance} onChange={handleInputChange} className="border border-gray-200 rounded-md p-2 mb-2"></input>
                </div>
                <button className="bg-cyan-400 text-white w-full rounded-md h-10">등록</button>
            </form>
        </div>
        <div className="w-11/12 h-[360px] bg-white overflow-y-scroll list-none mt-4 flex flex-col rounded-md p-3 shadow-md shadow-violet-200/20">
        { accountList && 
            <ul>{accountList.map((a:MyAccount)=>(
                <li key={a.id} className="border-b p-2">
                    <div>
                        <p className="font-bold text-violet-700 text-lg">{a.bankName}</p>
                        <span className="">{a.accountNumber}   </span>
                        <span className="">{a.accountHolder}</span>
                        <p className="">{a.balance}원</p>
                        <button className="bg-red-500 text-white rounded-md px-1 text-sm" onClick={() => a.id && handleDelete(a.id)}>삭제</button>
                    </div>
                </li>))}
            </ul>
    
        }
        </div>
    </div>)
}