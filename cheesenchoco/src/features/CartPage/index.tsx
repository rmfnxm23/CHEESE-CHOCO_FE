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
  price: any;
  product: { img: any; name: string };
}

const CartPage = () => {
  const { user, isAuthenticated } = useAuth();

  const [cartList, setCartList] = useState<CartProps[]>([]);

  const [totalPrice, setTotalPrice] = useState("");

  const accessToken = Cookies.get("accessToken");

  const router = useRouter();

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
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCartList();
  }, [user]);

  // 총 가격 계산
  useEffect(() => {
    const total = cartList.reduce(
      (sum, opt) => sum + opt.price * opt.quantity,
      0
    );
    setTotalPrice(formatPrice(total));
  }, [cartList]);

  // 삭제 함수
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // 삭제 성공 시 UI 즉시 반영
      setCartList((prev) => prev.filter((item) => item.id !== id));
      alert("삭제 성공");
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  const [step, setStep] = useState(1);

  const [addrNum, setAddrNum] = useState("");
  const [addr, setAddr] = useState("");
  const [detailAddr, setDetailAddr] = useState("");

  // 결제하기 (결제창)
  const handlePayment = () => {};

  return (
    <>
      <Header />
      <CartPageStyled className={clsx("cart-wrap")}>
        <h2>cart</h2>
        <div className="cart-container">
          <div className="order-step">
            <ul>
              <li>01 SHOPPING BAG</li>
              <Image src={orderStep} alt="order_step" width={8} />
              <li>02 ORDER</li>
              <Image src={orderStep} alt="order_step" width={8} />
              <li>03 ORDER CONFIRMED</li>
            </ul>
          </div>
          <div className="cart-table">
            {cartList.length === 0 ? (
              <p>장바구니가 비어 있습니다.</p>
            ) : (
              step === 1 && (
                <ul>
                  {cartList.map((item) => {
                    const imageArray = JSON.parse(item.product.img); // 문자열을 배열로
                    const imageUrl = imageArray[0]; // 첫 번째 이미지 파일명

                    return (
                      <li key={item.id}>
                        <img
                          src={`http://localhost:5000/uploads/product/${imageUrl}`}
                          alt={item.product.name}
                          width={100}
                          height={100}
                        />
                        <p>{item.product.name}</p>
                        <p>
                          옵션: {item.selectColor} / {item.selectSize}
                        </p>
                        <p>수량: {item.quantity}</p>
                        <p>가격: {formatPrice(item.price)} 원</p>
                        <button onClick={() => handleDelete(item.id)}>
                          삭제
                        </button>
                      </li>
                    );
                  })}
                </ul>
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
            총 주문 금액
            {/* 선택된 상품 총 금액 */}
            {cartList.length > 0 && (
              <div className="total-price">{totalPrice} 원</div>
            )}
            {/* <div
              onClick={() => {
                // router.push("/order");
              }}
            >
              결제하기
            </div> */}
            {step === 1 ? (
              <button onClick={() => setStep(2)}>주문하기</button>
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
        </div>
      </CartPageStyled>
    </>
  );
};

export default CartPage;
