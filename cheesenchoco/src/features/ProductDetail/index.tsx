import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { CustomModal, ProductDetailStyled } from "./styled";
import Header from "@/components/Header";
import { formatPrice } from "@/util/validation";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

import DOMPurify from "dompurify";

import Image from "next/image";
import remove from "@/assets/images/remove.png";
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

  const { user, isAuthenticated, logout } = useAuth();

  const [product, setProduct] = useState<productProps>();

  const [existingImages, setExistingImages] = useState<productProps[]>([]);

  const [existingColors, setExistingColors] = useState<string[]>([]);

  const [existingSize, setExistingSize] = useState<string[]>([]);

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");

  const [selectedOptions, setSelectedOptions] = useState<
    { color: string; size: string; price: number; quantity: number }[]
  >([]);

  const [totalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    const getUpdateItem = async (id: any) => {
      if (!id) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/admin/product/${id}`
        );
        const item = res.data.data;
        setProduct(item);
        setExistingImages(item.imgUrls || []);
        setExistingColors(item.colorArray || []);
        setExistingSize(item.sizeArray || []);
      } catch (err) {
        console.error(err);
      }
    };
    getUpdateItem(id);
  }, [id]);
  const BASE_URL = "http://localhost:5000";

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 장바구니 추가
  const handleCart = async (id: any) => {
    // const data = { id, selectedColor, selectedSize };
    // const data = {id, selectedOptions.color}
    // console.log(selectedOptions, "data 변경");
    // return;

    if (selectedOptions.length === 0) {
      alert("옵션을 선택해주세요.");
      return;
    }

    const data = {
      id: id,
      options: selectedOptions.map((opt) => ({
        selectColor: opt.color,
        selectSize: opt.size,
        quantity: opt.quantity,
        price: opt.price, // optional
      })),
    };

    console.log("보낼 데이터:", data);
    // return;

    try {
      const accessToken = Cookies.get("accessToken");

      const res = await axios.post(`${BASE_URL}/cart/register`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // if (res.data) alert(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // const optionCheck = () => {
  //   if (!selectedColor || !selectedSize) {
  //     return alert("옵션을 선택해주세요");
  //   }
  // };

  const addSelectedOption = () => {
    if (!selectedColor || !selectedSize) {
      alert("옵션을 선택해주세요");
      return;
    }

    // 중복 방지
    const isDuplicate = selectedOptions.some(
      (opt) => opt.color === selectedColor && opt.size === selectedSize
    );
    if (isDuplicate) {
      alert("이미 선택된 옵션입니다.");
      return;
    }
    console.log(product?.price, "가격");
    const newOption = {
      color: selectedColor,
      size: selectedSize,
      price: product?.price || 0,
      quantity: 1, // 초기 수량 1로 추가
    };
    setSelectedOptions((prev) => [...prev, newOption]);
  };

  // 선택된 상품을 자동 추가
  useEffect(() => {
    if (!selectedColor || !selectedSize || !product) return;
    if (!selectedOptions) return;

    const isDuplicate = selectedOptions.some(
      (opt) => opt.color === selectedColor && opt.size === selectedSize
    );

    if (!isDuplicate) {
      setSelectedOptions((prev) => [
        ...prev,
        {
          color: selectedColor,
          size: selectedSize,
          price: product.price,
          quantity: 1, // 초기 수량 1로 추가
        },
      ]);
    }

    console.log(selectedOptions, "수량 있니");
    // ✅ 선택 후 select 초기화
    setSelectedColor("");
    setSelectedSize("");
  }, [selectedColor, selectedSize]);

  // 총 가격 계산
  useEffect(() => {
    const total = selectedOptions.reduce(
      (sum, opt) => sum + opt.price * opt.quantity,
      0
    );
    setTotalPrice(formatPrice(total));
  }, [selectedOptions]);

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
                          src={`${BASE_URL}/uploads/product/${src}`}
                          alt={`기존 이미지-${index}`}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div
                  className="product-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.content || ""),
                  }}
                >
                  {/* {product?.content} */}
                </div>
              </div>

              <div className="product-info">
                <div className="product-fixed">
                  <div className="product-name">
                    <strong>{product?.name}</strong>
                  </div>

                  {/* 상품 판매 금액 */}
                  <div className="product-price">
                    {formatPrice(product?.price)} 원
                  </div>

                  {/* 색상 옵션 */}
                  <div className="product-option">
                    {existingColors.length >= 1 && (
                      <select
                        name="color"
                        value={selectedColor}
                        onChange={(e) => {
                          setSelectedColor(e.target.value);
                        }}
                      >
                        <option value="">color</option>
                        {existingColors.map((x) => (
                          <option value={x} key={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* 사이즈 옵션 */}
                    {existingSize.length >= 1 && (
                      <select
                        name="size"
                        value={selectedSize}
                        onChange={(e) => {
                          setSelectedSize(e.target.value);
                        }}
                      >
                        <option value="">size</option>
                        {existingSize.map((x) => (
                          <option value={x} key={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* 선택된 상품 자동 추가 */}
                  <div
                    className={clsx("selected-products", {
                      active: selectedOptions.length > 0,
                    })}
                  >
                    <ul>
                      {selectedOptions.map((opt, idx) => (
                        <li key={idx}>
                          <p>
                            {opt.color} / {opt.size}
                          </p>
                          <div className="item-calculate">
                            <div>{opt.quantity}</div>
                            <div>{formatPrice(opt.price)} 원</div>
                            <div className="add-product-cancel">
                              <Image src={remove} alt="상품 추가 삭제" />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 선택된 상품 총 금액 */}
                  {selectedOptions.length > 0 && (
                    <div className="total-price">{totalPrice} 원</div>
                  )}

                  {/* 카트 or 결제 버튼 */}
                  <div className="product-button">
                    <div
                      className="action-cart"
                      onClick={() => {
                        if (selectedOptions) {
                          handleCart(id);
                          setIsModalOpen(true);
                        } else {
                          // optionCheck();
                          addSelectedOption();
                        }
                      }}
                    >
                      CART
                    </div>

                    <CustomModal
                      open={isModalOpen}
                      onCancel={() => setIsModalOpen(false)}
                      centered
                      footer={
                        <div className="ant-button">
                          <button
                            className="shop-btn"
                            onClick={() => setIsModalOpen(false)}
                          >
                            쇼핑 계속하기
                          </button>
                          <button
                            className="cart-btn"
                            onClick={() => router.push("/cart")}
                          >
                            장바구니로 이동
                          </button>
                        </div>
                      }
                    >
                      <p>선택하신 상품이 장바구니에 담겼습니다.</p>
                    </CustomModal>

                    <div
                      className="action-buy"
                      onClick={() => {
                        isAuthenticated
                          ? router.push("/cart")
                          : router.push("/login");
                      }}
                    >
                      BUY NOW
                    </div>
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
