import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Popover } from "antd";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const isMainPage = router.pathname === "/"; // 메인 페이지일 경우

  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 500) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  const [hideHeader, setHideHeader] = useState(false); // ✅ 요 부분이 중요
  const prevScrollY = useRef(0);

  const [category, setCategory] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/category");
        console.log(res.data.data);
        if (res.data.data) {
          setCategory(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      console.log("현재 스크롤 위치:", currentScrollY);
      console.log("이전 스크롤 위치:", prevScrollY.current);

      if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
        console.log("⬇️ 아래로 스크롤: 헤더 숨김");
        setHideHeader(true);
      } else {
        console.log("⬆️ 위로 스크롤 또는 스크롤 위치가 작음: 헤더 표시");
        setHideHeader(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryContent = (
    <ul style={{ margin: 0, padding: "0.5rem", listStyle: "none" }}>
      {category?.map((item: any) => (
        <li
          key={item.id}
          style={{ padding: "0.3rem 0", cursor: "pointer" }}
          onClick={() => {
            router.push(`/shop?category=${item.id}`);
            setShowCategory(false); // 이동 후 팝업 닫기
          }}
        >
          {item.category}
        </li>
      ))}
    </ul>
  );

  return (
    <HeaderStyled
      className={clsx(
        "header-wrap",
        hideHeader && "scrolled",
        isMainPage ? "white-header" : "black-header"
      )}
    >
      <div className="header-category">
        {/* <div onClick={() => setShowCategory((prev) => !prev)}> */}
        {/* <div>
          SHOP
          {showCategory && category && (
            <ul className="category-list">
              {category.map((item: any) => (
                <li key={item.id}>{item.category}</li>
              ))}
            </ul>
          )}
        </div> */}
        <Popover
          content={categoryContent}
          title={null}
          trigger="click"
          open={showCategory}
          onOpenChange={(show: boolean) => {
            setShowCategory(show);
          }}
          placement="bottomLeft"
        >
          <div style={{ cursor: "pointer" }}>SHOP</div>
        </Popover>
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
        <div
          onClick={() => {
            router.push("/cart");
          }}
        >
          장바구니
        </div>
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
