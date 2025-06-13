import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { ShopCategoryStyled } from "./styled";

interface productProps {
  id: number;
  name: string;
  price?: string;
  content?: string;
  imageUrl: string;
  img: string;
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

  useEffect(() => {
    const getProductCategory = async () => {
      try {
        if (category) {
          const res = await axios.get(
            `http://localhost:5000/admin/product?category=${category}`
          );
          setProducts(res.data.data);
          console.log(res.data.data, "categoryId 연결은 안되어있나..?");
        } else {
          const res = await axios.get(`http://localhost:5000/admin/product`);
          setProducts(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProductCategory();
  }, [category]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/category");
        console.log(res.data.data);
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

  return (
    <div>
      <Header />
      <ShopCategoryStyled>
        {/* <h2>{products[0]?.Category?.category}</h2> */}
        <div className="category-title">
          <h2 className="category-badge">
            <p>{currentCategory}</p>
          </h2>
        </div>
        {products.length > 0 ? (
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
