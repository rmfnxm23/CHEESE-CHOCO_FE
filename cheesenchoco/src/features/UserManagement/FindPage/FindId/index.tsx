import { formatPhone } from "@/util/validation";
import { useFormik } from "formik";
import { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { FindIdStyled } from "./styled";

const FindIdPage = () => {
  const [findId, setFindId] = useState<any>(null); // 일치하는 폰번호의 이메일

  const [findIdMessage, setFindIdMessage] = useState(""); // 데이터 없을때나 빈값일 때 메세지

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    onSubmit: async (values) => {
      const phone = values.phone;

      if (!phone.trim()) {
        setFindId("");
        setFindIdMessage("전화번호를 입력해주세요.");
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/user/find/id", {
          phone,
        });

        if (res.data.exists === false) {
          setFindIdMessage(res.data.message);
          setFindId("");
        } else {
          alert("아이디 찾기 성공");
          setFindId(res.data.userPhone.email);
          setFindIdMessage("");
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <FindIdStyled className={clsx("findid-wrap")}>
      <div className="findid-container">
        <h2>아이디 찾기</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              formik.setFieldValue("phone", formatted);
              setFindIdMessage("");
            }}
            maxLength={13}
          />
          <button type="submit" style={{ cursor: "pointer" }}>
            아이디 찾기
          </button>
          {findId ? (
            <div>
              아이디는 <strong>{findId}</strong>입니다.
            </div>
          ) : (
            <div className="error-message">{findIdMessage}</div>
          )}
        </form>
      </div>
    </FindIdStyled>
  );
};

export default FindIdPage;
