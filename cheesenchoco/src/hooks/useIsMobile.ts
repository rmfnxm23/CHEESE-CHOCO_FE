import { useEffect, useState } from "react";

export const useIsMobile = (maxWidth = 800) => {
  const [isMobile, setIsMobile] = useState(false); // ⚠️ 항상 false로 시작

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };

    // 최초 체크
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return isMobile;
};
