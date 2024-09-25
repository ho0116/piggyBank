"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createChallenge } from "../api/challengeApi";
import Challenge from "../types/challengeType";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

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
  const challengeStatus : string = "In Progress";
  const savingCycle : number = 12;
  const userId : number = 1;
  const accountId : number = 1;
  const savedAmount : number = 10000;
  const id : number = 1;


  const mutation = useMutation({
    mutationFn: createChallenge,
    onSuccess: (data: Challenge) => {
      alert("챌린지 생성 성공");
    },
    onError: (error: Error) => {
      alert(error.message || "오류 발생");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const challenge : Challenge = {
      id,
      userId,
      accountId,
      savedAmount,
      targetAmount: parseFloat(targetAmount),
      savingCycle,
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : null,
      challengeName,
      challengeStatus,
      challengeDescription,
    };

    mutation.mutate(challenge);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">챌린지 만들기</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            이름
          </label>
          <input
            id="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ment" className="block text-sm font-medium">
            설명
          </label>
          <input
            id="ment"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={challengeDescription}
            onChange={(e) => setChallengeDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          {/* 시작 날짜 선택 */}
          <label htmlFor="start" className="block text-sm font-medium">
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

          {/* 종료 날짜 선택 */}
          <label htmlFor="end" className="block text-sm font-medium">
            종료 날짜:{" "}
          </label>
          <DatePicker
            dateFormat="yyyy.MM.dd"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate} // 시작 날짜 이후만 선택 가능
            id="end"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium">
            목표 금액
          </label>
          <input
            id="amount"
            required
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          챌린지 생성
        </button>
      </form>
    </div>
  );
}
