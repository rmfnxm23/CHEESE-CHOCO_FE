import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <HeaderStyled className={clsx("header-wrap")}>
      <div className="header-category">
        <div>SHOP</div>
        <div>BRAND</div>
        <div>EVENT</div>
        <div>LOOKBOOK</div>
        <div>BOARD</div>
      </div>
      <div className="header-logo">
        <div
          onClick={() => {
            router.push("/");
          }}
        >
          CHEESE&CHOCO
        </div>
      </div>
      <div className="header-right">
        <div>검색</div>
        <div>장바구니</div>
        <div>
          {isAuthenticated ? (
            <>
              <p>{user?.name}님</p>
              <div onClick={logout}>로그아웃</div>
            </>
          ) : (
            <p
              onClick={() => {
                alert("토큰이 만료되었습니다");
                router.push("/login");
              }}
            >
              로그인
            </p>
          )}
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
