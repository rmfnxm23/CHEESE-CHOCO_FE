import AuthGate from "@/components/AuthGate";
import Footer from "@/components/Footer";
import Layout from "@/components/FooterFixLayout";
import Header from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute";
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
  const isExcluded = noHeaderFooter.some((path) =>
    router.pathname.startsWith(path)
  );

  const isAdmin = router.pathname.startsWith("/admin");

  const authRequiredRoutes = ["/mypage", "/cart?step=2", "/cart?step=3"]; // 로그인 필요한 경로들

  // 로그인 필요 여부 체크 (경로가 포함되는지 확인)
  const requiresAuth = authRequiredRoutes.some((route) =>
    router.pathname.startsWith(route)
  );

  return (
    <>
      {/* <Header /> */}
      {/* {!noHeaderFooter.includes(Component.name) && <Header />} */}
      {/* {!isExlcluded && <Header />} */}
      <AuthProvider>
        {/* <Head>
          <title>{isAdmin && "CHEESE&CHOCO"}</title>
        </Head>
        {isAdmin && (
  <Head>
    <title>CHEESE&CHOCO</title>
  </Head>
)} */}

        {isAdmin ? (
          <>
            <AuthGate requiredRole="admin">
              <AdminHeader />
              <Template>
                <Component {...pageProps} />
              </Template>
            </AuthGate>
          </>
        ) : (
          // <Layout showFooter={!isExcluded}>
          //   <Component {...pageProps} />
          //   {/* {!isExcluded && <Footer />} */}
          // </Layout>
          <>
            {/* {!isExcluded && <Header />} */}
            <Layout showFooter={!isExcluded}>
              {requiresAuth ? (
                <PrivateRoute>
                  <Component {...pageProps} />
                </PrivateRoute>
              ) : (
                <Component {...pageProps} />
              )}
              {/* {!isExcluded && <Footer />} */}
            </Layout>
          </>
        )}
      </AuthProvider>
    </>
  );
}
