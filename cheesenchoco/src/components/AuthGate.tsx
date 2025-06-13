import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";

export default function AuthGate({
  children,
  requiredRole = "admin",
}: {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const alertedRef = useRef(false);

  useEffect(() => {
    if (isLoading) return; // 로딩 중에는 아무것도 안 함

    if (!isAuthenticated || !user || user.userType !== requiredRole) {
      if (!alertedRef.current) {
        alertedRef.current = true;
        alert("접근 권한이 없습니다.");
        router.replace("/");
      }
    }
  }, [isAuthenticated, user, isLoading, requiredRole, router]);

  if (isLoading) {
    return <Loading />; // 로딩 중에는 로딩 화면
  }

  // 권한 없으면 렌더링하지 않고 빈 화면 유지 (alert 이후 리다이렉트)
  if (!isAuthenticated || !user || user.userType !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
