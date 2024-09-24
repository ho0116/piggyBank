"use client";
import { FormEvent, useState } from "react";
import { User } from "../types";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/api";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [users, setUsers] = useState<User>({
    username: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const { setUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      alert("로그인 성공!");
      setUser(users);
      router.push("/");
    },
    onError: () => {
      alert("로그인 실패!");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(users);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            이메일
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={users.email}
            onChange={(e) => setUsers({ ...users, email: e.target.value })}
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
