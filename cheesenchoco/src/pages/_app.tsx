import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import AdminHeader from "@/features/AdminHead";
import Template from "@/features/layouts/Template";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 헤더 푸터 제외 페이지 라우터로 설정
  const noHeaderFooter = ["/admin", "/login", "/join", "/find", "/404"];
  // const noHeaderFooter = ["Admin", "Login", "Join"]; // 대문자 표시

  // console.log(Component.name);
  const isExlcluded = noHeaderFooter.some((path) =>
    router.pathname.startsWith(path)
  );

  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <>
      {/* <Header /> */}
      {/* {!noHeaderFooter.includes(Component.name) && <Header />} */}
      {/* {!isExlcluded && <Header />} */}
      <AuthProvider>
        <Head>
          <title>{isAdmin && "CHEESE&CHOCO"}</title>
        </Head>

        {isAdmin ? (
          <>
            <AdminHeader />
            <Template>
              <Component {...pageProps} />
            </Template>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </>
  );
}
