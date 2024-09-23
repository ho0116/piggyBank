import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  }
  throw new Error("프로바이더 이슈");
}