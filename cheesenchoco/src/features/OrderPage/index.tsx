// import Address from "@/pages/order";
// import { useState } from "react";

// const OrderPage = () => {
//   const [addrNum, setAddrNum] = useState("");
//   const [addr, setAddr] = useState("");
//   const [detailAddr, setDetailAddr] = useState("");

//   return (
//     <Address
//       addrNum={addrNum}
//       setAddrNum={setAddrNum}
//       addr={addr}
//       setAddr={setAddr}
//       detailAddr={detailAddr}
//       setDetailAddr={setDetailAddr}
//     />
//   );
// };

// export default OrderPage;
import { useState } from "react";
import PostCode from "react-daum-postcode";

interface OrderProps {
  addrNum: string;
  setAddrNum: React.Dispatch<React.SetStateAction<string>>;
  addr: string;
  setAddr: React.Dispatch<React.SetStateAction<string>>;
  detailAddr: string;
  setDetailAddr: React.Dispatch<React.SetStateAction<string>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function OrderPage({
  step,
  setStep,
  addrNum,
  setAddrNum,
  addr,
  setAddr,
  detailAddr,
  setDetailAddr,
}: OrderProps) {
  const [showAddrModal, setShowAddrModal] = useState(false);

  const openAddrModal = () => setShowAddrModal(true);
  const closeAddrModal = () => setShowAddrModal(false);
  console.log("step2 렌더링 ok");
  console.log(step);
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

  const handleDetailAddr = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddr(event.target.value);
  };

  return (
    // <div>
    //   <div>
    //     <div>{addrNum}</div>
    //     <button onClick={openAddrModal} type="button">
    //       주소 찾기
    //     </button>

    //     {showAddrModal && (
    //       <div onClick={closeAddrModal}>
    //         <PostCode onComplete={handleComplete} />
    //       </div>
    //     )}
    //   </div>
    //   <div>{addr}</div>
    //   <input
    //     onBlur={handleDetailAddr}
    //     type="text"
    //     placeholder="상세주소를 입력해주세요"
    //   />
    // </div>
    <>
      <div>
        <div>
          <div>{addrNum}</div>
          <button onClick={openAddrModal} type="button">
            주소 찾기
          </button>

          {/* {showAddrModal && (
            <div onClick={closeAddrModal}>
              <PostCode onComplete={handleComplete} />
            </div>
          )} */}
        </div>
        <div>{addr}</div>
        <input
          onBlur={handleDetailAddr}
          type="text"
          placeholder="상세주소를 입력해주세요"
        />
      </div>
      {showAddrModal && (
        <div
          onClick={closeAddrModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <PostCode onComplete={handleComplete} />
          </div>
        </div>
      )}
    </>
  );
}
