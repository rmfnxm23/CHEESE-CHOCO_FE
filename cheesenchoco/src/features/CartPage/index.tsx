import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { CartPageStyled } from "./styled";
import clsx from "clsx";
import Image from "next/image";
import orderStep from "@/assets/images/order_step.png";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import api from "@/lib/api";

import { formatPrice } from "@/util/validation";

import OrderInfo from "./OrderInfo";
import OrderConfirm from "./OrderConfirm";

import { ParsedUrlQuery } from "querystring";

import { useIsMobile } from "@/hooks/useIsMobile";

interface CartProps {
  id: number;
  productId: number;
  selectColor: string;
  selectSize: string;
  quantity: number;
  product: {
    img: string; // 파싱된 배열
    name: string;
    price: number;
  };
}

const CartPage = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const accessToken = Cookies.get("accessToken");

  const [step, setStep] = useState<number>(1); // 현재 단계 (1: 장바구니, 2: 주문, 3: 주문 완료)

  const [cartList, setCartList] = useState<CartProps[]>([]); // 장바구니 전체 목록
  const [checkedItems, setCheckedItems] = useState<number[]>([]); // 체크된 상품 ID 목록

  const [isCheckedInitialized, setIsCheckedInitialized] = useState(false);

  const [isCartReady, setIsCartReady] = useState(false);

  const [productsPrice, setProductsPrice] = useState("0"); // 총 상품 금액
  const [deliveryFee, setDeliveryFee] = useState<number>(0); // 배송비
  const [totalPrice, setTotalPrice] = useState("0"); // 총 결제 금액

  // 장바구니 전체 목록이 0이 아니고 선택한 상품과 갯수가 동일하면 전체 선택(checkbox) -> 전체 체크박스 상태
  const allChecked =
    cartList.length > 0 && checkedItems.length === cartList.length;

  // // [1] URL 쿼리에서 step 값을 읽어서 상태(step)에 반영하는 useEffect
  // useEffect(() => {
  //   // router 객체가 완전히 준비되지 않았으면 아무것도 하지 않음 (Next.js의 클라이언트 라우팅 보호)
  //   if (!router.isReady) return;
  //   // URL의 쿼리 파라미터 중 "step" 값을 숫자로 변환
  //   const queryStep = Number(router.query.step);
  //   // 변환된 값이 유효한 숫자일 경우에만 step 상태에 반영
  //   // ex) /cart?step=2 라면 step 상태를 2로 설정 → 2단계인 '주문정보 입력' UI를 보여줌
  // if (!router.query.step) {
  //   setStep(1); // 쿼리가 없으면 기본값으로
  //   return;
  // }
  //   if (!isNaN(queryStep)) {
  //     setStep(queryStep);
  //   }
  // }, [router.isReady, router.query.step]); // router가 준비됐거나, step 쿼리가 변경될 때마다 실행됨

  // // [2] 현재 step 상태를 업데이트하고 URL 쿼리에도 반영하는 함수
  // const updateStep = (newStep: number) => {
  //   // 상태 업데이트 (화면에서 해당 단계의 UI가 보이도록)
  //   setStep(newStep);

  //   // URL 쿼리에도 step을 반영하여 새로고침 시에도 상태 유지되도록 함
  //   // ex) step=2면 URL이 /cart?step=2로 바뀜 → 브라우저 뒤로 가기/앞으로 가기 대응 가능
  //   router.push({
  //     pathname: router.pathname, // 현재 페이지 경로 유지 (/cart)
  //     query: { ...router.query, step: newStep }, // 기존 쿼리는 유지하면서 step만 덮어씀
  //   });
  // };

  // // 쿼리스트링
  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     const queryParams = new URLSearchParams(url.split("?")[1]);
  //     const queryStep = Number(queryParams.get("step"));

  //     if (!isNaN(queryStep)) {
  //       setStep(queryStep);
  //     }
  //   };

  //   // 라우트 변경 시마다 step 쿼리 읽어 상태 동기화
  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   // 초기 로드 시에도 동기화
  //   if (router.isReady) {
  //     const initialStep = Number(router.query.step);
  //     if (!isNaN(initialStep)) {
  //       setStep(initialStep);
  //     }
  //   }

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router]);

  // URL의 쿼리에서 step을 읽어 상태에 반영
  const syncStepFromQuery = (query: ParsedUrlQuery) => {
    const queryStep = Number(query.step);
    if (!isNaN(queryStep)) {
      setStep(queryStep);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      syncStepFromQuery(router.query);
    }

    const handleRouteChange = (url: string) => {
      const queryParams = new URLSearchParams(url.split("?")[1]);
      const queryStep = Number(queryParams.get("step"));
      if (!isNaN(queryStep)) {
        setStep(queryStep);
      }
    };

    if (!router.query.step) {
      setStep(1); // 쿼리가 없으면 기본값으로
      return;
    }

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  // 상태와 URL을 함께 업데이트하는 함수
  const updateStep = (newStep: number) => {
    setStep(newStep);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, step: newStep },
    });
  };

  // 장바구니 조회
  useEffect(() => {
    if (!user) return;
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart/myCart", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (res.data.data) {
          setCartList(res.data.data);
          console.log(res.data.data);
          setCheckedItems(res.data.data.map((item: any) => item.id));
          console.log(
            res.data.data.map((item: any) => item.id),
            "----"
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [user]);

  // 가격 계산
  useEffect(() => {
    if (!isCheckedInitialized || !isCartReady) return; // <- 이거 추가!

    const selectedItems = cartList.filter((item) =>
      checkedItems.includes(item.id)
    );
    const total = selectedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const fee = total > 25000 || total === 0 ? 0 : 2500;

    setProductsPrice(formatPrice(total));
    setDeliveryFee(fee);
    setTotalPrice(formatPrice(total + fee));
  }, [cartList, checkedItems, isCheckedInitialized, isCartReady]);

  // 전체 상품 선택/해제 처리
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedItems(cartList.map((item) => item.id));
    } else {
      setCheckedItems([]);
    }
  };

  // 개별 상품 선택/해제 처리
  const handleCheck = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // 장바구니 상품 삭제
  const handleDelete = async (id: number) => {
    if (!confirm("상품을 장바구니에서 삭제하시겠습니까?")) return;
    try {
      await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCartList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  // 선택 삭제
  const handleBulkDelete = async () => {
    if (!confirm("선택한 상품을 삭제하시겠습니까?")) return;
    try {
      await Promise.all(
        checkedItems.map((id) =>
          api.delete(`/cart/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
        )
      );
      setCartList((prev) =>
        prev.filter((item) => !checkedItems.includes(item.id))
      );
      setCheckedItems([]);
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  // 주문하기
  const handleOrder = () => {
    if (checkedItems.length === 0) {
      return alert("주문하실 상품을 선택해 주세요");
    }
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // ✅ 선택한 항목을 localStorage에 저장
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));

    updateStep(2);
  };

  // // 선택 변경 시 localStorage에 저장
  // useEffect(() => {
  //   localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  // }, [checkedItems]);

  // // 컴포넌트 마운트 시 localStorage에서 불러오기
  // useEffect(() => {
  //   const storedItems = localStorage.getItem("checkedItems");
  //   if (storedItems) {
  //     setCheckedItems(JSON.parse(storedItems));
  //   }
  // }, []);

  // checkedItems 변경될 때만 저장 (불러오기 완료 후에만)
  // useEffect(() => {
  //   if (isCheckedInitialized) {
  //     localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  //   }
  // }, [checkedItems, isCheckedInitialized]);

  useEffect(() => {
    // cartList를 서버에서 불러왔다면 여기에 로드 완료 표시
    if (Array.isArray(cartList)) {
      setIsCartReady(true);
    }
  }, [cartList]);

  return (
    <>
      <Header />
      <CartPageStyled className={clsx("cart-wrap")}>
        <h2>
          {step === 1
            ? "SHOPPING BAG"
            : step === 2
            ? "ORDER"
            : "ORDER CONFIRMED"}
        </h2>
        <div className="cart-container">
          <div className="order-step">
            <ul>
              <li className={step === 1 ? "active" : ""}>01 SHOPPING BAG</li>
              <Image src={orderStep} alt="order_step" width={8} />
              <li className={step === 2 ? "active" : ""}>02 ORDER</li>
              <Image src={orderStep} alt="order_step" width={8} />
              <li className={step === 3 ? "active" : ""}>03 ORDER CONFIRMED</li>
            </ul>
          </div>

          {/* STEP 1 - 장바구니 */}
          {step === 1 && (
            <>
              <div className="cart-table">
                {cartList.length === 0 ? (
                  <div className="empty">
                    <p>장바구니가 비어 있습니다.</p>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          router.push("/");
                        }}
                      >
                        쇼핑 계속하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {isMobile ? (
                      <>
                        {/* 모바일 UI */}
                        <div className="cart-toolbar">
                          <label>
                            <input
                              type="checkbox"
                              onChange={handleAllCheck}
                              checked={allChecked}
                            />{" "}
                            전체선택
                          </label>
                          <div onClick={handleBulkDelete}>선택삭제</div>
                        </div>
                        {cartList.map((item) => (
                          <div className="mobile-cart-card" key={item.id}>
                            <div className="mobile-cart-top">
                              <input
                                type="checkbox"
                                checked={checkedItems.includes(item.id)}
                                onChange={() => handleCheck(item.id)}
                              />
                              <button
                                className="mobile-delete-btn"
                                onClick={() => handleDelete(item.id)}
                              >
                                삭제
                              </button>
                            </div>

                            <div className="mobile-cart-body">
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${item.product.img[0]}`}
                                alt={item.product.name}
                                width={80}
                                height={80}
                              />
                              <div className="mobile-info">
                                <p className="info-name">{item.product.name}</p>
                                <p className="info-opt">
                                  옵션: {item.selectColor} / {item.selectSize}
                                </p>
                                <p className="info-qty">
                                  수량: {item.quantity}
                                </p>
                                <p className="info-price">
                                  {formatPrice(item.product.price)}원
                                </p>
                              </div>
                            </div>

                            {/* <div className="mobile-cart-footer">
                              <button
                                onClick={() => {
                                  localStorage.setItem(
                                    "checkedItems",
                                    JSON.stringify([item.id])
                                  );
                                  updateStep(2);
                                }}
                              >
                                바로구매
                              </button>
                            </div> */}
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* 데스크톱 UI */}
                        <div className="cart-header">
                          <div className="col checkbox">
                            <input
                              type="checkbox"
                              onChange={handleAllCheck}
                              checked={allChecked}
                            />
                          </div>
                          <div className="col product">상품정보</div>
                          <div className="col quantity">수량</div>
                          <div className="col price">상품 금액</div>
                          {/* <div className="col delivery">구매 선택</div> */}
                        </div>

                        {cartList.map((item) => (
                          <div className="cart-row" key={item.id}>
                            <div className="col checkbox">
                              <input
                                type="checkbox"
                                checked={checkedItems.includes(item.id)}
                                onChange={() => handleCheck(item.id)}
                              />
                            </div>
                            <div className="col product">
                              <div className="product-info">
                                <div
                                  className="product-left"
                                  onClick={() => {
                                    router.push(
                                      `/product-detail/${item.productId}`
                                    );
                                  }}
                                >
                                  {item.product?.img &&
                                    Array.isArray(item.product.img) && (
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${item.product.img[0]}`}
                                        alt={item.product.name || "상품 이미지"}
                                        width={80}
                                        height={80}
                                      />
                                    )}
                                  <div className="info">
                                    <p className="info-name">
                                      {item.product?.name || "상품 이미지"}
                                    </p>
                                    <p className="info-opt">
                                      옵션: {item.selectColor} /{" "}
                                      {item.selectSize}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  className="delete-btn"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  삭제
                                </button>
                              </div>
                            </div>
                            <div className="col quantity">{item.quantity}</div>
                            <div className="col price">
                              {formatPrice(item.product.price)}원
                            </div>
                            {/* <div className="col delivery">
                              <button
                                onClick={() => {
                                  localStorage.setItem(
                                    "checkedItems",
                                    JSON.stringify([item.id])
                                  );
                                  updateStep(2);
                                }}
                              >
                                바로구매
                              </button>
                            </div> */}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="cart-utils">
                {!isMobile && (
                  <div className="cart-utils-buttons">
                    {cartList.length > 0 && (
                      <>
                        <button onClick={handleBulkDelete}>
                          선택상품 삭제
                        </button>
                        <button>쇼핑하기</button>
                      </>
                    )}
                  </div>
                )}
                <p className="cart-utils_notice">
                  장바구니는 최대 100개의 상품을 담을 수 있습니다.
                </p>
              </div>

              {!isMobile && (
                <div className="order-table">
                  <div className="order-header">
                    <div>총 주문 금액</div>
                    <div>배송비</div>
                    <div>총 결제 금액</div>
                  </div>

                  <div className="order-row">
                    <div>{productsPrice} 원</div>
                    <div>{formatPrice(deliveryFee)} 원</div>
                    <div>{totalPrice} 원</div>
                  </div>
                </div>
              )}

              {/* 모바일용 세로 행 (label + value 묶음) */}
              {isMobile && (
                <div className="order-mobile">
                  <div className="mobile-row">
                    <span>총 주문 금액</span>
                    <span>{productsPrice} 원</span>
                  </div>
                  <div className="mobile-row">
                    <span>배송비</span>
                    <span>{formatPrice(deliveryFee)} 원</span>
                  </div>
                  <div className="mobile-row total">
                    <span>총 결제 금액</span>
                    <span>{totalPrice} 원</span>
                  </div>
                </div>
              )}

              <div className="order-or-shopping">
                <button
                  className="shopping-btn"
                  onClick={() => router.push("/")}
                >
                  쇼핑 계속하기
                </button>
                <button className="order-btn" onClick={handleOrder}>
                  주문하기
                </button>
              </div>
            </>
          )}

          {/* STEP 2와 3은 필요한 경우 별도로 구성 */}
          {step === 2 &&
            isCheckedInitialized &&
            isCartReady &&
            checkedItems.length > 0 && (
              <OrderInfo
                step={step}
                setStep={setStep}
                updateStep={updateStep}
                // selectedItems={cartList.filter((item) =>
                //   checkedItems.includes(item.id)
                // )}
                checkedItems={checkedItems}
                cartList={cartList}
                deliveryFee={deliveryFee}
                setDeliveryFee={setDeliveryFee}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
              />
            )}
          {step === 3 && (
            <OrderConfirm
              step={step}
              setStep={setStep}
              updateStep={updateStep}
            />
          )}
        </div>
      </CartPageStyled>
    </>
  );
};

export default CartPage;
