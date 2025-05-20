import { useRouter } from "next/router";
import { useState } from "react";
import { ChangePwStyled } from "./styled";
import clsx from "clsx";
import { useFormik } from "formik";
import axios from "axios";
import { passCheckValidation, passValidation } from "@/util/validation";

const ChangePwPage = () => {
  const router = useRouter();
  const { id } = router.query;
  //   console.log(id);

  const [code, setCode] = useState(""); // 인증코드 관리
  const [certification, setCertification] = useState(false); // 인증 번호 일치 확인 시 form 나타나도록 관리

  // 비밀번호 유효성 검사에 따른 에러 메세지 상태 관리
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");

  // 비밀번호 유효성 검사 boolean 상태
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  // 인증번호 일치 확인
  const handleVerifyCode = async () => {
    const data = { id, code };
    console.log(data);

    try {
      const res = await axios.post(
        "http://localhost:5000/user/pwVerifyCode",
        data
      );

      if (res.data.success === true) {
        setCertification(true);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordCheck: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const data = {
        id: id,
        password: values.password,
      };

      try {
        const res = await axios.post(
          "http://localhost:5000/user/change/pw",
          data
        );

        if (res.data.success === true) {
          alert(res.data.message);
          router.push("/login");
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  // 활성화 조건
  const isValid = isPassword && isPasswordCheck;

  return (
    <ChangePwStyled className={clsx("changepw-wrap")}>
      <div className="changepw-container">
        {!certification ? (
          <div className="code-box">
            <h2 className="title">인증번호를 입력하세요</h2>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호"
            />
            <button onClick={handleVerifyCode}>인증</button>
          </div>
        ) : (
          <>
            <h2>비밀번호를 재설정하세요</h2>
            <form onSubmit={formik.handleSubmit}>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={(e) => {
                  formik.handleChange(e);
                  passValidation(e.target.value, setPassError, setIsPassword); // 입력할 때마다 유효성 검사
                }}
                placeholder="새 비밀번호"
                required
              />

              <p
                className="error-message"
                style={{ color: "red", fontSize: 12 }}
              >
                {passError}
              </p>

              {/* 비밀번호 확인 */}
              <input
                type="password"
                name="passwordCheck"
                value={formik.values.passwordCheck}
                onChange={(e) => {
                  formik.handleChange(e);
                  passCheckValidation(
                    e.target.value,
                    formik.values.password,
                    setPassCheckError,
                    setIsPasswordCheck
                  );
                }}
                placeholder="새 비밀번호 확인"
                required
              />
              <p
                className="error-message"
                style={{ color: "red", fontSize: 12 }}
              >
                {passCheckError}
              </p>

              <button type="submit" disabled={!isValid} className="change-btn">
                변경
              </button>
            </form>
          </>
        )}
      </div>
    </ChangePwStyled>
  );
};

export default ChangePwPage;
