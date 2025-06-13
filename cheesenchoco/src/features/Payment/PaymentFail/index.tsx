import { Button, Result } from "antd";
import { useRouter } from "next/router";
import { PaymentFailStyled } from "./styled";
import clsx from "clsx";

const PaymentFail = () => {
  const router = useRouter();
  const { code, message, orderId } = router.query;

  return (
    <PaymentFailStyled className={clsx("fail-wrap")}>
      <div className="fail-box">
        <Result
          status="error"
          title="결제를 완료하지 못했어요"
          subTitle="결제 도중 문제가 발생했어요. 다시 시도해 주세요."
          extra={[
            <Button key="home" type="primary" onClick={() => router.push("/")}>
              홈으로 이동
            </Button>,
            <Button key="back" onClick={() => router.back()}>
              이전 페이지로
            </Button>,
          ]}
        />
        {code && <p>에러 코드: {code}</p>}
        {message && <p>에러 메시지: {message}</p>}
        {orderId && <p>주문 ID: {orderId}</p>}
      </div>
    </PaymentFailStyled>
  );
};

export default PaymentFail;
