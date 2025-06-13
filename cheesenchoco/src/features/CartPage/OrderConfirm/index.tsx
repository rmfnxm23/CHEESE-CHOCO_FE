import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useRouter } from "next/router";

interface OrderConfirmProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  updateStep: (newStep: number) => void;
}

const OrderConfirm = ({ step, setStep, updateStep }: OrderConfirmProps) => {
  const router = useRouter();

  return (
    <div style={{ padding: "40px 0" }}>
      <Result
        icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
        status="success"
        title="주문이 완료되었습니다!"
        subTitle="상품이 곧 준비되어 발송될 예정입니다."
        extra={[
          <Button key="home" type="primary" onClick={() => router.push("/")}>
            홈으로 가기
          </Button>,
          <Button key="orderList" onClick={() => router.push("/mypage/orders")}>
            주문내역 보기
          </Button>,
        ]}
      />
    </div>
  );
};

export default OrderConfirm;
