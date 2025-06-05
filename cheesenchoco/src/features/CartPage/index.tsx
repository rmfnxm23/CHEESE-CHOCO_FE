import Header from "@/components/Header";
import { CartPageStyled } from "./styled";
import clsx from "clsx";
import orderStep from "@/assets/images/order_step.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { formatPrice } from "@/util/validation";
import { useRouter } from "next/router";
import OrderPage from "../OrderPage";

interface CartProps {
  id: number;
  selectColor: string;
  selectSize: string;
  quantity: number;
  price: number;
  product: { img: any; name: string };
}

const CartPage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const accessToken = Cookies.get("accessToken");

  const [cartList, setCartList] = useState<CartProps[]>([]); // 장바구니 목록

  const [productsPrice, setProductsPrice] = useState("0"); // 상품 가격
  const [deliveryFee, setDeliveryFee] = useState(0); // 배송비
  const [totalPrice, setTotalPrice] = useState("0"); // 총 결제금액 (상품 + 배송비)

  const [checkedItems, setCheckedItems] = useState<number[]>([]); // 선택한 상품

  const allChecked =
    cartList.length > 0 && checkedItems.length === cartList.length;

  // 상품 전체 선택
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedItems(cartList.map((item) => item.id));
    } else {
      setCheckedItems([]);
    }
  };

  // 상품 선택
  const handleCheck = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
    console.log(checkedItems, "???");
  };

  useEffect(() => {
    if (!user) return;

    const getCartList = async () => {
      try {
        const res = await axios.get("http://localhost:5000/cart/myCart", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.data.data) {
          console.log(res.data.data, "cartdata");

          setCartList(res.data.data);
          setCheckedItems(res.data.data.map((item: any) => item.id)); // 장바구니에 추가된 상품 자동 선택
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCartList();
  }, [user]);

  // 총 가격 계산
  useEffect(() => {
    const selectedItems = cartList.filter((item) =>
      checkedItems.includes(item.id)
    );

    const total = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const fee = total > 250000 || total === 0 ? 0 : 2500;

    setProductsPrice(formatPrice(total));
    setDeliveryFee(fee);
    setTotalPrice(formatPrice(total + fee));
  }, [cartList, checkedItems]);

  // 삭제 함수
  const handleDelete = async (id: number) => {
    confirm("상품을 장바구니에서 삭제하시겠습니까?");
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // 삭제 성공 시 UI 즉시 반영
      setCartList((prev) => prev.filter((item) => item.id !== id));
      // alert("삭제 성공");
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  const [step, setStep] = useState(1);

  const [addrNum, setAddrNum] = useState("");
  const [addr, setAddr] = useState("");
  const [detailAddr, setDetailAddr] = useState("");

  // 주문하기 클릭
  const handleOrder = () => {
    if (checkedItems.length === 0) {
      return alert("주문하실 상품을 선택해 주세요");
    }
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setStep(2);
  };

  // 결제하기 (결제창)
  const handlePayment = () => {};

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

          <div className="cart-table">
            {cartList.length === 0 ? (
              <p>장바구니가 비어 있습니다.</p>
            ) : (
              step === 1 && (
                <>
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
                    <div className="col delivery">구매 선택</div>
                  </div>

                  {cartList.map((item) => {
                    const imageArray = JSON.parse(item.product.img);
                    const imageUrl = imageArray[0];

                    return (
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
                            <div className="product-left">
                              <img
                                src={`http://localhost:5000/uploads/product/${imageUrl}`}
                                alt={item.product.name}
                                width={80}
                                height={80}
                              />
                              <div className="info">
                                <p className="info-name">{item.product.name}</p>
                                <p className="info-opt">
                                  옵션: {item.selectColor} / {item.selectSize}
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
                          {formatPrice(item.price)} 원
                        </div>
                        <div className="col delivery">
                          <button>바로구매</button>
                        </div>
                      </div>
                    );
                  })}
                </>
              )
            )}
          </div>

          {step === 2 && (
            <OrderPage
              step={step}
              setStep={setStep}
              addrNum={addrNum}
              setAddrNum={setAddrNum}
              addr={addr}
              setAddr={setAddr}
              detailAddr={detailAddr}
              setDetailAddr={setDetailAddr}
            />
          )}

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

          {step === 1 ? (
            <div className="order-or-shopping">
              <button className="shopping-btn" onClick={() => router.push("/")}>
                쇼핑 계속하기
              </button>
              <button className="order-btn" onClick={() => handleOrder()}>
                주문하기
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setStep(3);
                handlePayment();
              }}
            >
              결제하기
            </button>
          )}
        </div>
      </CartPageStyled>
    </>
  );
};

export default CartPage;
