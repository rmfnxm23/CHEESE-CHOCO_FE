import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const alertedRef = useRef(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !alertedRef.current) {
      alertedRef.current = true;
      alert("로그인이 필요합니다.");
      router.replace("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || checkingAuth) {
    return <Loading />;
  }

  return <>{children}</>;
}
