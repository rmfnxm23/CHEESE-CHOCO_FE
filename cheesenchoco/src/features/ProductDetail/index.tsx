import api from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import clsx from "clsx";
import { CustomDrawer, CustomModal, ProductDetailStyled } from "./styled";
import Header from "@/components/Header";
import { formatPrice } from "@/util/validation";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";

import DOMPurify from "dompurify";

import Image from "next/image";
import remove from "@/assets/images/remove.png";
import { DrawerProps, RadioChangeEvent } from "antd";

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

  const [openColor, setOpenColor] = useState(false);
  const [openSize, setOpenSize] = useState(false);

  useEffect(() => {
    const getUpdateItem = async (id: any) => {
      if (!id) return;

      try {
        const res = await api.get(`/admin/product/${id}`);
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 장바구니 추가
  const handleCart = async (id: any) => {
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
        price: opt.price,
      })),
    };

    try {
      const accessToken = Cookies.get("accessToken");

      const res = await api.post(`/cart/register`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } catch (err) {
      console.error(err);
    }
  };

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

    const newOption = {
      color: selectedColor,
      size: selectedSize,
      price: product?.price || 0,
      quantity: 1,
    };
    setSelectedOptions((prev) => [...prev, newOption]);
  };

  const selectedOptionsRef = useRef(selectedOptions);

  // 항상 최신 selectedOptions를 ref에 반영
  useEffect(() => {
    selectedOptionsRef.current = selectedOptions;
  }, [selectedOptions]);

  useEffect(() => {
    if (!selectedColor || !selectedSize || !product) return;

    const isDuplicate = selectedOptionsRef.current.some(
      (opt) => opt.color === selectedColor && opt.size === selectedSize
    );

    if (isDuplicate) {
      alert("이미 선택한 옵션입니다.");
    } else {
      const newOption = {
        color: selectedColor,
        size: selectedSize,
        price: product.price,
        quantity: 1,
      };
      setSelectedOptions((prev) => [...prev, newOption]);
    }

    // ✅ 선택 후 select 초기화는 항상 실행
    setSelectedColor("");
    setSelectedSize("");
  }, [selectedColor, selectedSize, product]);

  // 옵션 선택 후 자동 추가 목록 삭제
  const handleRemoveOption = (index: number) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((_, i) => i !== index)
    );
  };

  // 총 가격 계산
  useEffect(() => {
    const total = selectedOptions.reduce(
      (sum, opt) => sum + opt.price * opt.quantity,
      0
    );
    setTotalPrice(formatPrice(total));
  }, [selectedOptions]);

  // 드로어
  const [placement, setPlacement] =
    useState<DrawerProps["placement"]>("bottom");
  const [drawerOpened, setDrawerOpened] = useState(false); // 드로어 오픈 여부

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700 && drawerOpened) {
        setDrawerOpened(false); // 상태도 닫아줘야 실제 DOM에서도 사라짐
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 호출

    return () => window.removeEventListener("resize", handleResize);
  }, [drawerOpened]);

  const handleCartClick = () => {
    if (!drawerOpened) {
      showDrawer();
      setDrawerOpened(true);
      return;
    }

    if (selectedOptions.length === 0) {
      alert("옵션을 선택해주세요.");
      return;
    }

    handleCart(id);
    setIsModalOpen(true);
  };

  const handleBuyClick = () => {
    if (!drawerOpened) {
      showDrawer();
      setDrawerOpened(true);
      return;
    }

    if (selectedOptions.length === 0) {
      alert("옵션을 선택해주세요.");
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
    } else {
      handleCart(id);
      setIsModalOpen(true);
      router.push("/order");
    }
  };

  const showDrawer = () => {
    setDrawerOpened(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setDrawerOpened(false);
  };

  return (
    <>
      <Header />
      {product && (
        <div>
          <ProductDetailStyled className={clsx("detail-wrap")}>
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
                        <div className="slide-img-box">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${src}`}
                            alt={`상품 이미지-${index}`}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div
                  className="product-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product?.content || ""),
                  }}
                ></div>
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
                              <Image
                                src={remove}
                                alt="상품 추가 삭제"
                                onClick={() => handleRemoveOption(idx)}
                              />
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
                        if (
                          Array.isArray(selectedOptions) &&
                          selectedOptions.length > 0
                        ) {
                          handleCart(id);
                          setIsModalOpen(true);
                        } else {
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
                            onClick={() => {
                              setIsModalOpen(false);
                              setSelectedOptions([]);
                            }}
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
                        if (selectedOptions.length > 0) {
                          isAuthenticated
                            ? router.push("/cart")
                            : router.push("/login");
                        } else {
                          addSelectedOption(); // 또는 옵션 선택 안내 메시지
                        }
                      }}
                    >
                      BUY NOW
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 800px 이하에서만 보이는 하단 고정 버튼 */}
            <div className="bottom-fixed-buttons">
              <div className="action-cart" onClick={handleCartClick}>
                CART
              </div>
              <div className="action-buy" onClick={handleBuyClick}>
                BUY NOW
              </div>
            </div>

            {/* 업 슬라이스 -옵션 선택 창 */}
            <CustomDrawer
              placement="bottom"
              width={500}
              onClose={onClose}
              open={drawerOpened}
              closable={false} // X 버튼 제거
              title={null} // 제목 제거
            >
              {/* 상단 핸들 바 */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "15px",
                  paddingBottom: "15px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgb(228, 228, 228)",
                    width: "40px",
                    height: "4px",
                    borderRadius: "2px",
                  }}
                />
              </div>

              <div className="drawer-option">
                {/* 색상 옵션 */}
                <div className="product-option">
                  {existingColors.length >= 1 && (
                    <div className="custom-select-wrapper">
                      <div
                        className="custom-select-box"
                        onClick={() => {
                          setOpenColor((prev) => !prev);
                          setOpenSize(false); // 사이즈 드롭다운은 무조건 닫기
                        }}
                      >
                        {selectedColor || "color"}
                        <span className="arrow">{openColor ? "▲" : "▼"}</span>
                      </div>

                      {openColor && (
                        <div className="custom-select-options">
                          <div
                            className="custom-option"
                            onClick={() => {
                              setSelectedColor("");
                              setOpenColor(false);
                            }}
                          >
                            color
                          </div>
                          {existingColors.map((x) => (
                            <div
                              key={x}
                              className="custom-option"
                              onClick={() => {
                                setSelectedColor(x);
                                setOpenColor(false);
                              }}
                            >
                              {x}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 사이즈 옵션 */}
                  {existingSize.length >= 1 && (
                    <div className="custom-select-wrapper">
                      <div
                        className="custom-select-box"
                        onClick={() => {
                          setOpenSize((prev) => !prev);
                          setOpenColor(false); // 컬러 드롭다운은 무조건 닫기
                        }}
                      >
                        {selectedSize || "size"}
                        <span className="arrow">{openSize ? "▲" : "▼"}</span>
                      </div>

                      {openSize && (
                        <div className="custom-select-options">
                          <div
                            className="custom-option"
                            onClick={() => {
                              setSelectedSize("");
                              setOpenSize(false);
                            }}
                          >
                            size
                          </div>
                          {existingSize.map((x) => (
                            <div
                              key={x}
                              className="custom-option"
                              onClick={() => {
                                setSelectedSize(x);
                                setOpenSize(false);
                              }}
                            >
                              {x}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
              </div>
            </CustomDrawer>
          </ProductDetailStyled>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
