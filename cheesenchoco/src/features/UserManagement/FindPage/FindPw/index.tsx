import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FindPwStyled } from "./styled";
import clsx from "clsx";

const FindPwPage = () => {
  const router = useRouter();

  const [notFound, setNotFound] = useState(""); // 등록된 이메일이 없을 때 메세지 관리

  const [step, setStep] = useState("form"); // form 형태(비밀번호 찾기 폼) VS 메일 전송 메시지 관리

  // 비밀번호 찾기 버튼 (이메일 조회)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const email = values.email;

      if (!email.trim()) {
        setNotFound("이메일을 입력해주세요.");
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/user/find/pw", {
          email,
        });

        if (res.data.success === true) {
          console.log(res.data.userId);
          //   setNotFound("ok");
          setStep("success");
        } else {
          //   setNotFound(res.data.message);
          alert(res.data.message);
          //   router.push("/login");
          router.reload();
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <FindPwStyled className={clsx("findpw-wrap")}>
      <div className="findpw-container">
        {step === "form" && (
          <>
            <h2>비밀번호 찾기</h2>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={(e) => {
                  formik.handleChange(e);
                  setNotFound("");
                }}
              />
              <button type="submit" style={{ cursor: "pointer" }}>
                찾기
              </button>

              {notFound && <div className="error-message">{notFound}</div>}
            </form>
          </>
        )}

        {step === "success" && (
          <div className="success-message">
            비밀번호 재설정 링크가 이메일로 전송되었습니다.
          </div>
        )}
      </div>
    </FindPwStyled>
  );
};

export default FindPwPage;
