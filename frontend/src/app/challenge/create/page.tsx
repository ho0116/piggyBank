"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createChallenge } from "../../api/challengeApi";
import Challenge from "../../types/challengeType";
import useAuth from "../../hooks/useAuth";
import { getMyAccount } from "@/app/api/accountApi";
import { useRouter } from "next/navigation";

export default function ChallengePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/user/login");
    }
  });

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [challengeName, setChallengeName] = useState<string>("");
  const [challengeDescription, setChallengeDescription] = useState<string>("");
  const [targetAmount, setTargetAmount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<number | "">("");

  // 계좌 목록을 가져오는 useQuery
  const {
    data: accountList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["accountList"],
    queryFn: () => getMyAccount(user?.id as number),
    enabled: !!user?.id,
    refetchOnMount: true,
  });

  // 계좌 목록을 확인하고, 계좌가 없으면 계좌 생성 페이지로 이동
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      accountList &&
      accountList.length === 0 &&
      !alertShown
    ) {
      // useEffect 안에서 alert을 실행하지 않고, 상태 플래그만 관리
      setAlertShown(true);
    }
  }, [accountList, isLoading, router, alertShown]);
  
  useEffect(() => {
    if (alertShown && accountList && accountList.length === 0) {
      window.alert("계좌가 없습니다. 계좌를 먼저 생성해주세요.");
      router.push("/myPage/account");
    }
  }, [alertShown, accountList, router]);

  const challengeStatus: string = "In Progress";
  const savingCycle: number = 12;
  const userId: number | undefined = user?.id;
  const accountId: number = selectedAccount;
  const savedAmount: number = 10000;

  const mutation = useMutation({
    mutationFn: createChallenge,
    onSuccess: (data: Challenge) => {
      console.log(data);
      alert("챌린지 생성 성공");
    },
    onError: (error: Error) => {
      alert(error.message || "오류 발생");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const challenge: Challenge = {
      userId,
      accountId,
      savedAmount,
      targetAmount: parseFloat(targetAmount),
      amount: parseFloat(amount),
      savingCycle,
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      challengeName,
      challengeStatus,
      challengeDescription,
    };

    mutation.mutate(challenge);
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(Number(e.target.value));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10/12 mx-auto p-6">
        <h1 className="text-3xl mb-4 font-bold text-cyan-500 text-center">
          챌린지 만들기
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium"
            >
              챌린지명
            </label>
            <input
              id="name"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ment"
              className="block text-gray-700 text-sm font-medium"
            >
              설명
            </label>
            <input
              id="ment"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={challengeDescription}
              onChange={(e) => setChallengeDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            {/* 시작 날짜 선택 */}
            <label
              htmlFor="start"
              className="block text-gray-700 text-sm font-medium"
            >
              시작 날짜:{" "}
            </label>
            <DatePicker
              dateFormat="yyyy.MM.dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()} // 과거 선택 불가
              id="start"
            />

            <br />
            <br />

            {/* 종료 날짜 선택 */}
            <label
              htmlFor="end"
              className="block text-gray-700 text-sm font-medium"
            >
              종료 날짜:{" "}
            </label>
            <DatePicker
              dateFormat="yyyy.MM.dd"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate ?? new Date()} // 시작 날짜 이후만 선택 가능
              id="end"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-medium"
            >
              목표 금액
            </label>
            <input
              id="amount"
              required
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 text-sm font-medium"
            >
              저축할 금액
            </label>
            <input
              id="amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="account"
              className="block text-gray-700 text-sm font-medium"
            >
              계좌 선택
            </label>
            <select
              id="account"
              className="w-full px-3 py-2 border border-gray-200 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedAccount}
              onChange={handleAccountChange}
            >
              <option value="" disabled>
                계좌를 선택해주세요
              </option>
              {accountList?.map(
                (account: { id: number; accountNumber: string }) => (
                  <option key={account.id} value={account.id}>
                    {account.accountNumber}
                  </option>
                )
              )}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 mb-4 bg-cyan-500 text-white w-full h-12 rounded-md font-semibold"
          >
            챌린지 생성
          </button>
        </form>
      </div>
    </div>
  );
}