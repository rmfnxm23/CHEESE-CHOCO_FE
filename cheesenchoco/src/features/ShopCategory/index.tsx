import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { ShopCategoryStyled } from "./styled";
import { Pagination } from "antd";

interface productProps {
  id: number;
  name: string;
  price?: string;
  content?: string;
  imgUrls: string[];
  Category: { category: string };
}

const ShopCategory = () => {
  const router = useRouter();

  const { category, sort } = router.query;

  const [products, setProducts] = useState<productProps[]>([]);
  const [categories, setCategories] = useState<
    {
      id: number;
      category: string;
    }[]
  >([]);

  // 페이지네이션 관리
  const [limit, setLimit] = useState(20); // 한 페이지 당 상품 수
  const [page, setPage] = useState(1); // 현재 페이지
  const [total, setTotal] = useState(0); // 전체 상품 수

  useEffect(() => {
    const getProductCategory = async () => {
      try {
        const offset = (page - 1) * limit;
        const res = await api.get(
          `/admin/product?category=${
            category ?? ""
          }&limit=${limit}&offset=${offset}`
        );
        setProducts(res.data.data);
        setTotal(res.data.total);
      } catch (err) {
        console.error(err);
      }
    };

    getProductCategory();
  }, [category, page, limit]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await api.get("/category");

        if (res.data.data) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCategory();
  }, []);

  const currentCategory =
    sort === "desc"
      ? "NEW"
      : category === undefined
      ? "ALL"
      : categories.find((item) => item.id === Number(category))?.category;

  useEffect(() => {
    document.body.classList.add("shop-category-page");
    return () => {
      document.body.classList.remove("shop-category-page");
    };
  }, []);

  return (
    <div>
      <Header />
      <ShopCategoryStyled>
        <div className="category-title">
          <h2 className="category-badge">
            <p>{currentCategory}</p>
          </h2>
        </div>
        {products.length > 0 ? (
          <>
            <div className="product-grid">
              {products.map((product: any) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  content={product.content}
                  imgUrls={product.imgUrls[0]}
                />
              ))}
            </div>
            <div className="pagination">
              <Pagination
                current={page}
                pageSize={limit}
                total={total}
                onChange={(page) => setPage(page)}
                style={{ textAlign: "center", margin: "2rem" }}
              />
            </div>
          </>
        ) : (
          <div className="empty">
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              상품 준비 중입니다. 곧 찾아뵐게요 :)
            </p>
          </div>
        )}
      </ShopCategoryStyled>
    </div>
  );
};

export default ShopCategory;
