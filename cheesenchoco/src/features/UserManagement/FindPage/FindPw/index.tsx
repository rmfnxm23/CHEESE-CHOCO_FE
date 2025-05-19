import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FindPwStyled } from "./styled";
import clsx from "clsx";

const FindPwPage = () => {
  const router = useRouter();

  //   const [userEmail, setUserEmail] = useState(""); // 조회한 이메일
  const [notFound, setNotFound] = useState(""); // 등록된 이메일이 없을 때 메세지 관리

  // 비밀번호 찾기 버튼 (이메일 조회)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const email = values.email;

      if (!email.trim()) {
        setNotFound("이메일을 입력해주세요.");
        // setUserEmail("");
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/user/find/pw", {
          email,
        });

        if (res.data.success === true) {
          console.log(res.data.userId);
          //   setUserEmail(res.data.userId.email);
          //   console.log(userEmail);
          setNotFound("ok");
        } else {
          setNotFound(res.data.message);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <FindPwStyled className={clsx("findpw-wrap")}>
      <div className="findpw-container">
        <h2>비밀번호 찾기</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            // onChange={formik.handleChange}
            onChange={(e) => {
              formik.handleChange(e);
              setNotFound("");
            }}
          />
          <button type="submit" style={{ cursor: "pointer" }}>
            찾기
          </button>
          {/* {userEmail && (
            <div>
              <strong>{userEmail}</strong> 로 등록된 계정이 있습니다.
            </div>
          )}
          {!userEmail && notFound && (
            <div className="error-message">{notFound}</div>
          )} */}
          {notFound && <div className="error-message">{notFound}</div>}
        </form>
      </div>
    </FindPwStyled>
  );
};

export default FindPwPage;
