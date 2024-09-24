"use client"

import { createAccount } from "@/app/api/accountApi";
import useAuth from "@/app/hooks/useAuth";
import MyAccount from "@/app/types/accountType";
import { useMutation } from "@tanstack/react-query"
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

    const createMutate = useMutation({
        mutationFn:createAccount,
        onSuccess: () => {
            alert("등록 성공!")
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

    return(<div className="flex justify-center">
        <div className="w-11/12 h-72 bg-white overflow-y-scroll list-none mt-4 flex flex-col rounded-md p-3">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label>은행명</label>
                    <input id="bankName" name="bankName" value={account.bankName} onChange={handleInputChange}></input>
                </div>
                <div className="flex flex-col">
                    <label>계좌번호</label>
                    <input id="accountNumber" name="accountNumber" value={account.accountNumber} onChange={handleInputChange}></input>
                </div>
                <div className="flex flex-col">
                    <label>예금주</label>
                    <input id="accountHolder" name="accountHolder" value={account.accountHolder} onChange={handleInputChange}></input>
                </div>
                <div className="flex flex-col">
                    <label>잔액</label>
                    <input type="number" id="balance" name="balance" value={account.balance} onChange={handleInputChange}></input>
                </div>
                <button className="bg-cyan-500 text-white w-full rounded-md h-8">등록</button>
            </form>
        </div>
    </div>)
}