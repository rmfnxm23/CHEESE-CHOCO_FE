import Header from "@/components/Header";
import Link from "next/link";
import { ReactNode } from "react";
import { MypageLayoutStyled } from "./styled";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";

// 🔸 1. 탭 이름 타입 정의
export type MypageTab = "orders" | "profile";

// 🔸 2. Props 타입 선언
interface MypageLayoutProps {
  children: ReactNode;
  activeTab: MypageTab;
}

const MypageLayout = ({ children, activeTab }: MypageLayoutProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <>
      <Header />
      <MypageLayoutStyled className={clsx("mypage-layout-wrap")}>
        <div className="mypage-container">
          <aside className="w-1/4 left">
            <div className="userName">
              <strong>{user?.name}</strong> 님
            </div>
            <ul>
              <li className={activeTab === "orders" ? "active" : ""}>
                <Link href="/mypage/orders">주문 내역 조회</Link>
              </li>
              <li className={activeTab === "profile" ? "active" : ""}>
                <Link href="/mypage/profile">회원정보 수정</Link>
              </li>
            </ul>
          </aside>
          <main className="w-3/4 right">{children}</main>
        </div>
      </MypageLayoutStyled>
    </>
  );
};

export default MypageLayout;
