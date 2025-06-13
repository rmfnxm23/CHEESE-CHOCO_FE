import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  userType: string; // "admin" or "user"
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    // 토큰 존재 여부로 로그인 상태 판단
    const accessToken = Cookies.get("accessToken");

    if (accessToken && !user) {
      // (선택) 사용자 정보 요청
      axios
        .get("http://localhost:5000/user/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          console.log(res.data.user);
          setUser(res.data.user);
          setIsLoading(false);
        })
        .catch(() => {
          logout(); // 만료된 경우 로그아웃
          setIsLoading(false);
        });
      // .finally(() => {
      //   setIsLoading(false); // 완료되면 로딩 종료
      // });
    } else {
      setIsLoading(false); // 토큰 없음 → 로딩 종료
    }
  }, []);

  const login = (userData: User, accessToken: string, refreshToken: string) => {
    setUser(userData);
    Cookies.set("accessToken", accessToken, { expires: 1 });
    Cookies.set("refreshToken", refreshToken, { expires: 1 }); // 1일
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    alert("로그아웃 되었습니다.");
    // window.location.reload(); // 강제 새로고침 (권장되진 않지만 확실)
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  return context;
};
