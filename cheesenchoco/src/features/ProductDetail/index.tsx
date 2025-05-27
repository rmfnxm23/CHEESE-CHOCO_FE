import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ProductDetailStyled } from "./styled";
import Header from "@/components/Header";
import { formatPrice } from "@/util/validation";

interface productProps {
  id: number;
  name: string;
  price: number;
  content: string;
  imgUrls: string[];
}

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<productProps>();

  const [existingImages, setExistingImages] = useState<productProps[]>([]);

  useEffect(() => {
    const getUpdateItem = async (id: any) => {
      if (!id) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/admin/product/${id}`
        );
        const item = res.data.data;
        console.log(typeof item.price, "123");
        setProduct(item);
        setExistingImages(item.imgUrls || []);
      } catch (err) {
        console.error(err);
      }
    };
    getUpdateItem(id);
  }, [id]);
  const BASE_URL = "http://localhost:5000";
  return (
    <>
      <Header />
      {product && (
        <div>
          <ProductDetailStyled
            className={clsx("detail-wrap")}
            style={{ borderTop: "1px solid #aaa" }}
          >
            <div className="detail-container">
              <div className="detail-Image">
                <div className="img-wrap">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop
                    navigation
                    // pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                  >
                    {existingImages.map((src, index) => (
                      <SwiperSlide key={`existing-${index}`}>
                        <img
                          src={`${BASE_URL}/uploads/${src}`}
                          alt={`기존 이미지-${index}`}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="product-content">{product?.content}</div>
              </div>

              <div className="product-info">
                <div className="product-fixed">
                  <div className="product-name">
                    <strong>{product?.name}</strong>
                  </div>

                  <div className="product-price">
                    {formatPrice(product?.price)} 원
                  </div>
                  <div className="product-button">
                    <div
                      className="action-cart"
                      onClick={() => {
                        alert("장바구니에 담겼습니다.");
                        router.push("/cart");
                      }}
                    >
                      CART
                    </div>
                    <div className="action-buy">BUY NOW</div>
                  </div>
                </div>
              </div>
            </div>
          </ProductDetailStyled>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
