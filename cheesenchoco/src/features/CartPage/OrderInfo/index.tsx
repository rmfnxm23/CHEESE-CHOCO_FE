import { useEffect, useMemo, useState } from "react";
import PostCode from "react-daum-postcode";
import { OrderInfoStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { formatPhone, formatPrice, phoneValidation } from "@/util/validation";
import Image from "next/image";
import ArrowDropDown from "@/assets/images/arrow_dropdown.png";
import api from "@/lib/api";
import { loadTossPayments } from "@tosspayments/payment-sdk";

interface CartProps {
  id: number;
  selectColor: string;
  selectSize: string;
  quantity: number;
  product: { img: any; name: string; price: number };
}

interface OrderInfoProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  updateStep: (newStep: number) => void;
  cartList: CartProps[]; // 전체 장바구니 목록
  deliveryFee: string;
  setDeliveryFee: React.Dispatch<React.SetStateAction<string>>;
  totalPrice: string;
  setTotalPrice: React.Dispatch<React.SetStateAction<string>>;
}

export default function OrderInfo({
  step,
  setStep,
  updateStep,
  cartList,
  deliveryFee,
  setDeliveryFee,
  totalPrice,
  setTotalPrice,
}: OrderInfoProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const accessToken = Cookies.get("accessToken");

  // 입력 상태 선언
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isPhone, setIsPhone] = useState(false);

  // 주소 관련 상태
  const [showAddrModal, setShowAddrModal] = useState(false); // 주소 검색 모달 활성화 여부
  const [addrNum, setAddrNum] = useState(""); // 우편번호
  const [addr, setAddr] = useState(""); // 주소
  const [detailAddr, setDetailAddr] = useState(""); // 상세주소

  // 배송 요청 메시지 관련
  const [delieveryMessageDropdown, setDelieveryMessageDropdown] =
    useState<boolean>(false); // 배송 요청 메세지 드롭다운
  const [selectedMessage, setSelectedMessage] = useState(""); // 선택된 배송 요청 메시지
  const [showDirectInput, setShowDirectInput] = useState(false); // 직접입력 활성화 여부
  const [directInput, setDirectInput] = useState(""); // 직접입력 시 메세지

  // 배송 요청 옵션
  const deliveryOptions = [
    "배송 요청 사항을 선택해 주세요.",
    "부재 시 경비실에 맡겨주세요.",
    "부재 시 전화 또는 문자 주세요.",
    "배송 전 연락주세요.",
    "택배함에 넣어주세요.",
    "파손위험 상품. 배송 주의해주세요.",
    "직접입력",
  ];

  const [productsPrice, setProductsPrice] = useState("0"); // 상품 가격

  const [localstorageItems, setLocalstorageItems] = useState<number[]>([]); // 로컬스토리지에 저장된 상품 상태 관리

  const [agree1, setAgree1] = useState(false); // (필수) 개인정보 수집/이용 동의
  const [agree2, setAgree2] = useState(false); // (필수) 개인정보 제3자 제공 동의
  const [agree3, setAgree3] = useState(false); // (필수) 결제대행 서비스 이용약관 동의

  const [allCheck, setAllCheck] = useState(false); // 모두 동의 체크박스

  // 로컬스토리지에서 체크된 상품 ID 불러오기
  useEffect(() => {
    const storedItems = localStorage.getItem("checkedItems");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems).map((id: any) => Number(id));
      setLocalstorageItems(parsedItems);
    }
  }, []);

  // props로 받은 cartList에서 체크된 상품만 필터링
  const selectedItems = useMemo(() => {
    return cartList.filter((item) => localstorageItems.includes(item.id));
  }, [cartList, localstorageItems]);

  // 가격 계산
  useEffect(() => {
    if (cartList.length === 0 || localstorageItems.length === 0) return;

    const total = selectedItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const fee = total > 25000 || total === 0 ? 0 : 2500;

    setProductsPrice(formatPrice(total));
    setDeliveryFee(formatPrice(fee));
    setTotalPrice(formatPrice(total + fee));
  }, [selectedItems, cartList, localstorageItems]);

  // 주소 찾기 모달창
  const openAddrModal = () => setShowAddrModal(true);
  const closeAddrModal = () => setShowAddrModal(false);

  // 주소 찾기
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    const { addressType, bname, buildingName, zonecode } = data;

    if (addressType === "R") {
      if (bname !== "") extraAddress += bname;
      if (buildingName !== "") {
        extraAddress += `${extraAddress !== "" ? ", " : ""}${buildingName}`;
      }
      fullAddress += extraAddress !== "" ? ` ${extraAddress}` : "";
    }

    setAddrNum(zonecode);
    setAddr(fullAddress);
    closeAddrModal();
  };

  // 상세주소 직접 입력
  const handleDetailAddr = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddr(event.target.value);
  };

  // 휴대폰 번호 입력 및 유효성 검사
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    phoneValidation(formatted, setPhoneError, setIsPhone);
  };

  // 배송 메세지 드롭다운 toggle 함수
  const toggleDropdown = () => {
    setDelieveryMessageDropdown((prev) => !prev);
  };

  // 옵션 클릭 시 처리
  const handleOptionClick = (option: string) => {
    setSelectedMessage(option);
    setDelieveryMessageDropdown(false);

    if (option === "직접입력") {
      setShowDirectInput(true);
      setSelectedMessage("");
    } else {
      setShowDirectInput(false);
    }
  };

  // 약관 모두 동의하기 클릭 시
  const handleAllCheck = () => {
    const newState = !allCheck;
    setAllCheck(newState);
    setAgree1(newState);
    setAgree2(newState);
    setAgree3(newState);
  };

  // 개별 동의 클릭 시
  const toggleAgree1 = () => setAgree1((prev) => !prev);
  const toggleAgree2 = () => setAgree2((prev) => !prev);
  const toggleAgree3 = () => setAgree3((prev) => !prev);

  useEffect(() => {
    if (agree1 && agree2 && agree3) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [agree1, agree2, agree3]);

  // 결제하기 클릭
  const handlePay = async () => {
    if (!(agree1 && agree2 && agree3)) {
      alert("모든 필수 항목에 동의해 주세요.");
      return;
    }

    const shippingInfo = {
      name,
      phone,
      zipCode: addrNum,
      address: `${addr} ${detailAddr}`,
    };

    try {
      const res = await api.post("/address/register", shippingInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 필요시
        },
      });

      const shippingInfoId = res.data.data.id;

      // 선택한 상품데이터 저장
      const orderData = { items: selectedItems };

      // 2. 결제(주문) 생성
      const paymentRes = await api.post(
        "/payment/create",
        {
          userId: user?.id,
          shippingInfoId,
          totalAmount: Number(totalPrice.replace(/,/g, "")),
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const paymentId = paymentRes.data.id;

      // 3. 주문 아이템 저장
      const orderRes = await api.post(
        "/orderItem/save",
        {
          paymentId,
          items: selectedItems, // [{ productId, quantity, price }, ...]
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // 2. 결제창 오픈
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

      if (!clientKey) {
        console.error("Toss client key가 없습니다.");
        return;
      }

      // Toss SDK 로딩
      const tossPayments = await loadTossPayments(clientKey);

      await tossPayments.requestPayment("카드", {
        amount: Number(totalPrice.replace(/,/g, "")),
        // orderId: `order_${Date.now()}`, // 주문 고유번호
        orderId: `payment_${paymentId}`, // 주문 고유번호: paymentId 포함
        orderName: "상품 구매",
        customerName: name,
        // successUrl: "http://localhost:3000/payment/success",
        successUrl: `http://localhost:3000/payment/success?paymentId=${paymentId}`,
        failUrl: "http://localhost:3000/payment/fail",
      });
    } catch (err) {
      console.error("❌ 결제 요청 중 오류:", err);
      window.location.href = "/payment/fail";
    }
  };

  return (
    <OrderInfoStyled className={clsx("orderInfo-wrap")}>
      <div className="left">
        <div className="deleveryInfo-wrap">
          <div>
            <button className="address-list" type="button">
              배송지 목록
            </button>
          </div>
          <div className="deliveryInfo receiver">
            <h5 className="delivery-title">수령인</h5>
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="deliveryInfo delivery-address">
            <h5 className="delivery-title">배송지</h5>
            <div>
              <div style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  value={addrNum}
                  placeholder="우편번호"
                  readOnly
                  style={{ width: "100px" }}
                />
                <button
                  className="address-search"
                  onClick={openAddrModal}
                  type="button"
                >
                  {/* 주소 찾기 */}
                  우편번호 검색
                </button>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <input type="text" value={addr} placeholder="주소" readOnly />
              </div>

              <div style={{ marginBottom: "12px" }}>
                <input
                  type="text"
                  value={detailAddr}
                  onChange={handleDetailAddr}
                  placeholder="상세주소를 입력해주세요"
                />
              </div>
            </div>
          </div>
          <div className="deliveryInfo receiver">
            <h5 className="delivery-title">연락처</h5>
            <div>
              <input
                type="text"
                maxLength={13}
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>

          <div className="deliveryInfo messageChoice">
            <h5></h5>
            <div className="selectedMessage">
              <input
                className="selectedInput"
                style={{ cursor: "pointer" }}
                onClick={toggleDropdown}
                value={selectedMessage || "배송 요청 사항을 선택해 주세요."}
                readOnly
              />
              <Image
                src={ArrowDropDown}
                alt="ArrowDropDown"
                className="arrowDropDown"
              />

              {delieveryMessageDropdown && (
                <ul className="dropdown-list">
                  {deliveryOptions.map((option) => (
                    <li key={option} onClick={() => handleOptionClick(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}

              {/* 직접입력 input 노출 */}
              {showDirectInput && (
                <input
                  type="text"
                  value={directInput}
                  onChange={(e) => setSelectedMessage(e.target.value)}
                  placeholder="내용을 입력해주세요. (20자 이내)"
                  maxLength={20}
                  className="directInput"
                />
              )}
            </div>
          </div>
        </div>

        {/* 주소 검색 모달 */}
        {showAddrModal && (
          <div className="modal-overlay" onClick={closeAddrModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <PostCode onComplete={handleComplete} />
            </div>
          </div>
        )}

        <>
          <div className="cart-header">
            {/* <div className="col checkbox">
              <input
                type="checkbox"
                onChange={handleAllCheck}
                checked={allChecked}
              />
            </div> */}
            <div className="col product">상품정보</div>
            <div className="col quantity">수량</div>
            <div className="col price">상품 금액</div>
            {/* <div className="col delivery">구매 선택</div> */}
          </div>

          {selectedItems.map((item) => {
            const imageArray = item.product.img;
            const imageUrl = imageArray[0];

            return (
              <div className="cart-row" key={item.id}>
                {/* <div className="col checkbox">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => handleCheck(item.id)}
                  />
                </div> */}
                <div className="col product">
                  <div className="product-info">
                    <div className="product-left">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${imageUrl}`}
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
                    {/* <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      삭제
                    </button> */}
                  </div>
                </div>
                <div className="col quantity">{item.quantity}</div>
                <div className="col price">
                  {formatPrice(item.product.price)} 원
                </div>
                {/* <div className="col delivery">
                  <button>바로구매</button>
                </div> */}
              </div>
            );
          })}
        </>
      </div>

      {/* 결제금액 부분 */}
      <div className="right">
        <div className="pay-sticky">
          <div className="pay-wrap">
            <div className="summary-row">
              <span>총 주문 금액</span>
              <strong>{productsPrice}원</strong>
            </div>
            <div className="summary-row">
              <span>배송비</span>
              <strong>{deliveryFee}원</strong>
            </div>
            <div className="summary-row total">
              <span>총 결제 금액</span>
              <strong>{totalPrice}원</strong>
            </div>
          </div>

          <div className="order-agree">
            <div className="checkbox-all">
              <input
                type="checkbox"
                id="check-all"
                checked={allCheck}
                onChange={handleAllCheck}
              />
              <label htmlFor="check-all">
                주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
              </label>
            </div>

            <ul className="checkbox-list">
              <li>
                <input
                  type="checkbox"
                  id="agree1"
                  checked={agree1}
                  onChange={toggleAgree1}
                />
                <label htmlFor="agree1">(필수) 개인정보 수집/이용 동의</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="agree2"
                  checked={agree2}
                  onChange={toggleAgree2}
                />
                <label htmlFor="agree2">(필수) 개인정보 제3자 제공 동의</label>
              </li>
              <li>
                <input
                  type="checkbox"
                  id="agree3"
                  checked={agree3}
                  onChange={toggleAgree3}
                />
                <label htmlFor="agree3">(필수) 결제대행 서비스 이용약관</label>
              </li>
            </ul>
          </div>

          <div className="pay">
            <button className="pay-btn" onClick={handlePay}>
              {totalPrice}원 결제하기
            </button>
          </div>
        </div>
      </div>
    </OrderInfoStyled>
  );
}
