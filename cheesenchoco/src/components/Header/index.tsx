import { useRouter } from "next/router";
import { HeaderStyled } from "./styled";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Popover } from "antd";
import api from "@/lib/api";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const isMainPage = router.pathname === "/"; // 메인 페이지일 경우

  const [hideHeader, setHideHeader] = useState(false);
  const prevScrollY = useRef(0);

  const [category, setCategory] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

  const [showSearchBox, setShowSearchBox] = useState(false); // 검색창 활성화 여부
  const [keyword, setKeyword] = useState(""); // 검색 키워드 값 관리

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get("/category");
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

  const TOP_THRESHOLD = 200; // 상단에서 200px 벗어나면 헤더 숨김, 안으로 들어오면 나타남

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > TOP_THRESHOLD) {
        setHideHeader(true); // 200px 벗어나면 숨김
        if (showCategory) {
          setShowCategory(false);
        }
      } else {
        setHideHeader(false); // 200px 이내면 나타남
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryContent = (
    <ul
      className="category-list"
      style={{ margin: 0, padding: "0.5rem", listStyle: "none" }}
    >
      <li
        className="category-item"
        style={{ padding: "0.3rem 0", cursor: "pointer" }}
        onClick={() => {
          router.push("/shop");
          setShowCategory(false);
        }}
      >
        {/* ALL */}
        <span className="category-text">ALL</span>
      </li>
      {/* <li
        className="category-item"
        style={{ padding: "0.3rem 0", cursor: "pointer" }}
        onClick={() => {
          router.push("/shop?sort=desc");
          setShowCategory(false);
        }}
      >
          <span className="category-text">NEW</span>
      </li> */}
      {category?.map((item: any) => (
        <li
          className="category-item"
          key={item.id}
          style={{ padding: "0.3rem 0", cursor: "pointer" }}
          onClick={() => {
            router.push(`/shop?category=${item.id}`);
            setShowCategory(false); // 이동 후 팝업 닫기
          }}
        >
          <span className="category-text">{item.category}</span>
        </li>
      ))}
    </ul>
  );

  // 검색 핸들러
  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) {
      router.push(`/search?keyword=${encodeURIComponent(trimmed)}`);
      setShowSearchBox(false);
    }
  };

  return (
    <HeaderStyled
      className={clsx(
        "header-wrap",
        hideHeader && "scrolled",
        isMainPage ? "white-header" : "black-header"
      )}
    >
      {/* {isDesktop && ( */}
      <>
        <div className="header-category">
          <Popover
            content={categoryContent}
            title={null}
            trigger="click"
            open={showCategory}
            onOpenChange={(show: boolean) => {
              setShowCategory(show);
            }}
            overlayClassName={
              isMainPage ? "custom-popover main-page" : "custom-popover"
            }
            // placement="bottomLeft"
            overlayStyle={{ top: 60, left: 23 }}
          >
            <div className="popover-trigger" style={{ cursor: "pointer" }}>
              SHOP
            </div>
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
          <div
            onClick={() => {
              setShowSearchBox(!showSearchBox);
            }}
          >
            검색
          </div>
          <div
            onClick={() => {
              router.push("/mypage/orders");
            }}
          >
            내 정보
          </div>
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
                <div onClick={logout}>로그아웃</div>
              </>
            ) : (
              <p
                onClick={() => {
                  router.push("/login");
                }}
              >
                로그인
              </p>
            )}
          </div>
        </div>

        {/* 검색 창 */}
        {showSearchBox && (
          <div className="search-box">
            <div className="input-group">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch} className="search-btn">
                검색
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowSearchBox(false);
              }}
              className="close-btn"
            >
              닫기
            </button>
          </div>
        )}
      </>
      {/* )} */}
    </HeaderStyled>
  );
};

export default Header;
