import { FormEvent, useState } from "react";
import { Users } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { join, login } from "../../api";
import { useRouter } from "next/router"; // Next.js의 useRouter
import useAuth from "../../hooks/useAuth";

export default function LoginForm({ isJoin = false }: { isJoin?: boolean }) {
  const [users, setUsers] = useState<Users>({
    username: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const { setUser } = useAuth();

  const joinMutation = useMutation({
    mutationFn: join,
    onSuccess: () => {
      alert("가입 성공!");
      router.push("/login");
    },
    onError: () => {
      alert("가입 실패!");
    },
  });

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
    if (isJoin) {
      joinMutation.mutate(users);
      return;
    }
    loginMutation.mutate(users);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{isJoin ? "가입" : "로그인"}</h1>
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
            onChange={(e) =>
              setUsers({ ...users, username: e.target.value })
            }
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
            onChange={(e) =>
              setUsers({ ...users, password: e.target.value })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {isJoin ? "가입" : "로그인"}
        </button>
      </form>
    </div>
  );
}