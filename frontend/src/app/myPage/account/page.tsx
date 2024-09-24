"use client"

import { createAccount } from "@/app/api/accountApi";
import MyAccount from "@/app/types/accountType";
import { useMutation } from "@tanstack/react-query"
import { FormEvent, useState } from "react"

export default function Account(){

    const [account, setAccount] = useState<MyAccount>({
        userId:0,
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        balance: 0
    });

    const createMutate = useMutation({
        mutationFn:createAccount,
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

    return(<div>
        <div className="h-60 bg-white">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>은행명</label>
                    <input id="bankName" name="bankName" value={account.bankName} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>계좌번호</label>
                    <input id="account_number" name="account_number" value={account.accountNumber} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>예금주</label>
                    <input id="account_holder" name="account_holder" value={account.accountHolder} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>잔액</label>
                    <input type="number" id="balance" name="balance" value={account.balance} onChange={handleInputChange}></input>
                </div>
            </form>
        </div>
    </div>)
}