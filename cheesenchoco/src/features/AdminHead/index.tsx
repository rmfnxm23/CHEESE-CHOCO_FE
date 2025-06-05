import Link from "next/link";
import { useRouter } from "next/router";

import clsx from "clsx";
import { BookOutlined } from "@ant-design/icons";
import { AdminHeaderStyled } from "./styled";
export interface HeaderProps {
  className?: string;
}

//해당하는 URL은 Header가 표시되지 않습니다.
export const nonePageObject = ["/login"];

const AdminHeader = ({ className }: HeaderProps) => {
  // 라우터
  const router = useRouter();
  // 현재 경로
  const pathname = router?.pathname;

  return (
    <AdminHeaderStyled
      className={clsx(
        "Header",
        nonePageObject.some((x) => {
          if (x === "/") {
            return pathname === "/";
          }
          return pathname.includes(x);
        }) && "headerOff",
        className
      )}
    >
      <div className="navigation">
        <div className="left">
          <Link href="/">CHEESE&CHOCO</Link>
        </div>
        <div
          className="right"
          onClick={() => {
            sessionStorage.removeItem("isAdminLoggedIn");
            router.push("/login");
          }}
        >
          로그아웃
        </div>
      </div>
    </AdminHeaderStyled>
  );
};

export default AdminHeader;
