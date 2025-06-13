import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PaymentSuccessStyled } from "./styled";
import clsx from "clsx";
import { Button, Result, Spin } from "antd";
import Cookies from "js-cookie";

const PaymentSuccess = () => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");

  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState("");
  const [amountDisplay, setAmountDisplay] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    let { paymentKey, orderId, amount, paymentId } = router.query;
    console.log("query params", router.query);

    if (!paymentKey || !orderId || !amount) {
      console.warn("필수 결제 정보 누락:", { paymentKey, orderId, amount });
      return;
    }

    const verifyPayment = async () => {
      const storedItems = JSON.parse(
        localStorage.getItem("checkedItems") || "[]"
      );

      console.log(storedItems, "local"); // 숫자배열 // cart테이블의 id
      // return;
      try {
        const numericAmount = Number(amount);

        console.log("📦 [Sending to /payments/confirm]", {
          paymentKey,
          orderId,
          amount: numericAmount,
          items: storedItems,
        });

        const response = await axios.post(
          "http://localhost:5000/payment/confirm",
          {
            paymentKey,
            orderId,
            amount: numericAmount,
            paymentId,
            items: storedItems,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 클라이언트에서 저장된 토큰
            },
            withCredentials: true, // 쿠키 기반 인증이라면 이 옵션 추가
          }
        );

        console.log("[Payment Confirm Success]", response.data);

        // ✅ 여기에 성공 메시지와 금액 표시용 값 설정
        setMessage("정상적으로 결제되었습니다");
        setAmountDisplay(response.data.data.totalAmount.toLocaleString());

        return;
        router.push("/cart?step=3");
      } catch (error: any) {
        console.error(
          "[결제 승인 오류]",
          error.response?.data || error.message
        );
        setMessage("결제 승인 실패"); // ✅ 실패 메시지 설정
      } finally {
        setIsVerifying(false);
      }
    };
    verifyPayment();
  }, [router.isReady, router.query]);

  return (
    <PaymentSuccessStyled className={clsx("success-wrap")}>
      <div className="success-box">
        {isVerifying ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "50px 0",
            }}
          >
            <Spin tip="결제 승인 중..." size="large" fullscreen />
          </div>
        ) : (
          <Result
            status={message.includes("정상") ? "success" : "error"}
            title={
              message.includes("정상")
                ? "결제가 완료되었어요!"
                : "결제 승인 실패"
            }
            subTitle={
              message.includes("정상")
                ? `총 ${amountDisplay}원이 결제되었습니다.`
                : "결제는 되었지만 승인 처리 중 오류가 있었어요."
            }
            extra={[
              <Button
                key="home"
                type="primary"
                onClick={() => router.push("/")}
              >
                홈으로 이동
              </Button>,
              <Button
                key="home"
                type="primary"
                onClick={() => router.push("/mypage/orders")}
              >
                주문내역 보기
              </Button>,
            ]}
          />
        )}
      </div>
    </PaymentSuccessStyled>
  );
};

export default PaymentSuccess;
