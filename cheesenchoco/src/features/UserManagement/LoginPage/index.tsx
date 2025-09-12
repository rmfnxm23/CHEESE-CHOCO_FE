import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginPageStyled } from "./styled";
import clsx from "clsx";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

const LoginPage = () => {
  const router = useRouter();

  const { login } = useAuth();

  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const data = {
          email: values.email,
          password: values.password,
        };

        if (!data.email || !data.password) {
          return setLoginError("아이디 또는 비밀번호를 입력해주세요.");
        }

        const res = await api.post("/user/login", data, {
          //   withCredentials: true, // 요청에 자동으로 쿠키가 담겨서 보냄. 또한, 서버로부터 오는 쿠키를 받기 위해서도 이 설정은 꼭 필요! (서버에서도 credentials 설정 필요)
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.data.success === false) {
          setLoginError(res.data.message);
        } else {
          // 토큰 쿠키에 저장 (예: 1시간 만료)
          Cookies.set("accessToken", res.data.accessToken, { expires: 1 / 24 }); // 1시간
          Cookies.set("refreshToken", res.data.refreshToken, { expires: 1 }); // 1일

          login(res.data.user, res.data.accessToken, res.data.refreshToken);

          alert(res.data.message);
          // router.push("/");
          // ✅ 로그인 후 redirect 경로로 이동
          const { redirect } = router.query;
          router.push(redirect ? String(redirect) : "/");
        }
      } catch (err: any) {
        console.error(err);
      }
    },
  });

  return (
    <LoginPageStyled className={clsx("login-wrap")}>
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={formik.handleSubmit} className="form-box">
          <div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  setLoginError("");
                }}
              />

              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  setLoginError("");
                }}
              />
            </div>
            <div className="findpage">
              <span
                onClick={() => {
                  router.push("/find/id");
                }}
              >
                id찾기
              </span>
              /
              <span
                onClick={() => {
                  router.push("/find/pw");
                }}
              >
                pw찾기
              </span>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={formik.isSubmitting} // 요청 중이면 비활성화 // 버튼 중복 클릭 방지
            >
              로그인
            </button>

            <p className="login-error">{loginError}</p>
            <div className="joinpage">
              <p>아직 계정이 없으신가요?</p>
              <p
                className="move-join"
                onClick={() => {
                  router.push("/join");
                }}
              >
                회원가입
              </p>
            </div>
          </div>
        </form>
        {/* <div className="or-line">
          <span className="line" />
          <p>or</p>
          <span className="line" />
        </div>
        <div className="naver-login"></div> */}
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
