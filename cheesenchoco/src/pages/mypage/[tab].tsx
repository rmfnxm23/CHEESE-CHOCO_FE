// import Mypage from "@/features/UserManagement/Mypage";

// const MypageInfo = () => {
//   return <Mypage />;
// };

// export default MypageInfo;
// pages/mypage/[tab].tsx
// import MypageLayout from "@/components/mypage/MypageLayout";
// import Profile from "@/components/mypage/Profile";
// import Orders from "@/components/mypage/Orders";
// import { useRouter } from "next/router";

// export default function MypageTab() {
//   const router = useRouter();
//   const { tab } = router.query;

//   return (
//     <MypageLayout activeTab={tab}>
//       {tab === "profile" && <Profile />}
//       {tab === "orders" && <Orders />}
//     </MypageLayout>
//   );
// }
import { useRouter } from "next/router";
import MypageLayout, { MypageTab } from "@/components/Mypage/MypageLayout";

import { useEffect, useState } from "react";
import Profile from "@/components/mypage/Profile";
import Orders from "@/components/mypage/Orders";
import { Spin } from "antd";

// 탭 이름 유효성 검사용
const validTabs: MypageTab[] = ["profile", "orders"];

export default function MypageTabPage() {
  const router = useRouter();
  const { tab } = router.query;
  // const [activeTab, setActiveTab] = useState<MypageTab>("orders");
  const [activeTab, setActiveTab] = useState<MypageTab | null>(null);

  useEffect(() => {
    if (!router.isReady) return; // router가 완전히 준비되지 않았으면 대기

    if (typeof tab === "string" && validTabs.includes(tab as MypageTab)) {
      setActiveTab(tab as MypageTab);
    } else {
      router.replace("/mypage/orders");
    }
  }, [tab, router.isReady]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "orders":
        return <Orders />;
      default:
        return null;
    }
  };

  if (!activeTab) {
    return null; // 로딩 중인 상태 처리 (스켈레톤 로딩 등으로 대체 가능)
  }

  return <MypageLayout activeTab={activeTab}>{renderContent()}</MypageLayout>;
}
