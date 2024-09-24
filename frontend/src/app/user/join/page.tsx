"use client";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { join } from "@/app/api/authApi";
import { User } from "@/app/types/userTypes";

export default function JoinForm() {
  const [users, setUsers] = useState<User>({
    username: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const joinMutation = useMutation({
    mutationFn: join,
    onSuccess: () => {
      alert("가입 성공!");
      router.push("/user/login");
    },
    onError: () => {
      alert("가입 실패!");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinMutation.mutate(users);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">
            유저이름
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={users.username}
            onChange={(e) => setUsers({ ...users, username: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={users.password}
            onChange={(e) => setUsers({ ...users, password: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={users.email}
            onChange={(e) => setUsers({ ...users, email: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          가입
        </button>
      </form>
    </div>
  );
}
