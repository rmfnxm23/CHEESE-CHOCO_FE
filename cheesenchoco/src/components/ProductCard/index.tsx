import Image from "next/image";
import { ProductCardStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  content: string;
  imgUrls: string;
}

const ProductCard = ({
  id,
  name,
  price,
  content,
  imgUrls,
}: ProductCardProps) => {
  const BASE_URL = "http://localhost:5000";
  const router = useRouter();

  const formatted = price.toLocaleString(); // 숫자를 문자로
  const formattedPrice = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 세자리마다 콤마(,)

  return (
    <ProductCardStyled className={clsx("product-card-wrap")}>
      <div
        className="product-card"
        onClick={() => {
          console.log(typeof id);
          //   return;

          //   router.push(`/admin/detail/${id}`);
          router.push(`/product-detail/${id}`);
        }}
      >
        <div className="product-image-wrap">
          <div className="img-box">
            <img
              src={`${BASE_URL}/uploads/${imgUrls}`}
              alt={`기존 이미지-${id}`}
            />
          </div>
        </div>
        <div className="product-title">
          <p>{name}</p>
          <p>{formattedPrice}원</p>
        </div>
      </div>
    </ProductCardStyled>
  );
};

export default ProductCard;
