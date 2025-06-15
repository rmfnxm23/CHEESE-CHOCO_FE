import api from "@/lib/api";
import { useEffect, useState } from "react";
import { SearchStyled } from "./styled";
import clsx from "clsx";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import Header from "@/components/Header";

interface productProps {
  id: number;
  name: string;
  price: string;
  content: string;
  imgUrls: string[];
}

const SearchResult = () => {
  const router = useRouter();

  const queryKeyword =
    typeof router.query.keyword === "string" ? router.query.keyword : "";

  const [products, setProducts] = useState<productProps[]>([]);

  const [inputKeyword, setInputKeyword] = useState<string>(queryKeyword);

  // 페이지네이션 관리
  const [limit, setLimit] = useState(20); // 한 페이지 당 상품 수
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0); // 전체 상품 수

  // URL의 keyword가 바뀌면 inputKeyword도 동기화
  useEffect(() => {
    setInputKeyword(queryKeyword);
  }, [queryKeyword]);

  useEffect(() => {
    if (!router.isReady || !queryKeyword.trim()) {
      setProducts([]);
      return;
    }

    const getProduct = async () => {
      try {
        const res = await api.get(`/admin/product/search`, {
          params: { query: queryKeyword },
        });
        setProducts(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    getProduct();
  }, [queryKeyword, router.isReady]);

  // 검색 핸들러
  const handleSearch = () => {
    const trimmed = inputKeyword.trim();
    if (trimmed && trimmed !== queryKeyword) {
      router.push(`/search?keyword=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <>
      <Header />
      <SearchStyled className={clsx("search-wrap")}>
        <div className="titleArea">
          <h2>Search</h2>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button type="button" className="search-btn" onClick={handleSearch}>
            검색
          </button>
        </div>

        <div className="group-row">
          {products.length === 0 ? (
            <div className="no-result">검색 결과가 없습니다.</div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="group-each">
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  content={product.content}
                  imgUrls={product.imgUrls[0]}
                />
              </div>
            ))
          )}
        </div>
      </SearchStyled>
    </>
  );
};

export default SearchResult;
