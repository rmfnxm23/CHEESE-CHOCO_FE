import Header from "@/components/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  // 헤더 푸터 제외 페이지 라우터로 설정
  const noHeaderFooter = ["/admin", "/login", "/join", "/find", "/404"];
  // const noHeaderFooter = ["Admin", "Login", "Join"]; // 대문자 표시

  const router = useRouter();

  // console.log(Component.name);
  const isExlcluded = noHeaderFooter.some((path) =>
    router.pathname.startsWith(path)
  );

  return (
    <>
      {/* <Header /> */}
      {/* {!noHeaderFooter.includes(Component.name) && <Header />} */}
      {!isExlcluded && <Header />}
      <Component {...pageProps} />
    </>
  );
}
