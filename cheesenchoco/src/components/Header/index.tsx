import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";
import clsx from "clsx";

const Header = () => {
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
        <div>로그인</div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
