import clsx from "clsx";
import { JoinPageStyled } from "./styled";
import { useFormik } from "formik";
import { useState } from "react";
import {
  emailValidation,
  formatPhone,
  nameValidation,
  nameValidation2,
  passCheckValidation,
  passValidation,
  phoneValidation,
} from "@/util/validation";
import { useRouter } from "next/router";
import api from "@/lib/api";
import { isAxiosError } from "axios";

const JoinPage = () => {
  const router = useRouter();

  // 유효성 검사에 따른 에러 메세지 상태 관리
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // 유효성 검사 boolean 상태
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isname, setIsName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  // 이메일, 휴대폰 번호 중복 확인에 대한 상태 관리
  const [emailDuplicate, setEmailDuplicate] = useState({
    boolean: false,
    message: "",
  });
  const [phoneDuplicate, setPhoneDuplicate] = useState({
    boolean: false,
    message: "",
  });

  // 중복확인 - 이메일
  const duplicateCheckEmail = async (email: string) => {
    try {
      if (!email.trim()) {
        setEmailDuplicate({
          boolean: false,
          message: "이메일을 입력해주세요.",
        });
        return;
      }

      const res = await api.post(`/user/check/email`, {
        email,
      });

      // 이미 존재하는 이메일이라면
      if (res.data.exist === true) {
        setEmailDuplicate({
          boolean: false,
          message: res.data.message,
        });
      } else {
        setEmailDuplicate({
          boolean: true,
          message: res.data.message,
        });
      }
    } catch (err) {
      console.error(err, "중복확인 실패");
    }
  };

  // 중복확인 - 휴대폰 번호
  const duplicateCheckPhone = async (phone: string) => {
    try {
      if (!phone.trim()) {
        setPhoneDuplicate({ boolean: false, message: "번호를 입력해주세요." });
        return;
      }

      const res = await api.post(`/user/check/phone`, {
        phone,
      });

      // 이미 존재하는 번호라면
      if (res.data.exist === true) {
        setPhoneDuplicate({
          boolean: false,
          message: res.data.message,
        });
      } else {
        setPhoneDuplicate({
          boolean: true,
          message: res.data.message,
        });
      }
    } catch (err) {
      console.error(err, "중복확인 실패");
    }
  };

  // 회원가입 활성화 조건 (유효성 통과 + 중복확인 통과)
  const isValid =
    isEmail &&
    isPassword &&
    isPasswordCheck &&
    isname &&
    isPhone &&
    emailDuplicate.boolean &&
    phoneDuplicate.boolean;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      phone: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await api.post("/user/register", values);

        if (res.status === 201) {
          alert(res.data.message);
          router.push("/login");
        }
      } catch (err: unknown) {
        console.error(err);

        if (isAxiosError(err)) {
          // axios 에러일 경우
          alert(err.response?.data?.error || "회원가입에 실패했습니다.");
        } else {
          // 일반 JavaScript 에러인 경우 (예: JSON 에러, null 접근 등)
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    },
  });

  return (
    <JoinPageStyled className={clsx("join-wrap")}>
      <div className="join-container">
        <h2>회원가입</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* 아이디 (이메일) */}
          <div>이메일</div>
          <div className="duplicate-wrap">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={(e) => {
                formik.handleChange(e),
                  emailValidation(e.target.value, setEmailError, setIsEmail);
                setEmailDuplicate({ boolean: false, message: "" });
              }}
            />
            <button
              type="button"
              onClick={() => duplicateCheckEmail(formik.values.email)}
              className="duplicate-btn"
            >
              중복확인
            </button>
          </div>

          <p
            className={clsx("error-message", {
              "duplicate-success": !emailError && emailDuplicate.boolean,
              "duplicate-fail": !emailError && !emailDuplicate.boolean,
            })}
          >
            {emailError || emailDuplicate.message}
          </p>

          {/* 비밀번호 */}
          <div>비밀번호</div>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e),
                passValidation(e.target.value, setPassError, setIsPassword);
            }}
          />

          <p className="error-message">{passError}</p>

          {/* 비밀번호 확인 */}
          <div>비밀번호 확인</div>
          <input
            type="password"
            name="passwordCheck"
            value={formik.values.passwordCheck}
            onChange={(e) => {
              formik.handleChange(e),
                passCheckValidation(
                  e.target.value,
                  formik.values.password,
                  setPassCheckError,
                  setIsPasswordCheck
                );
            }}
          />

          <p className="error-message">{passCheckError}</p>

          {/* 이름 */}
          <div>이름</div>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={(e) => {
              formik.handleChange(e),
                nameValidation(e.target.value, setNameError, setIsName);
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              nameValidation2(e.target.value, setNameError, setIsName);
            }}
          />
          <p className="error-message">{nameError}</p>

          {/* 휴대폰 번호 */}
          <div>휴대폰 번호</div>
          <div className="duplicate-wrap">
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={(e) => {
                //   formik.handleChange(e); // 입력값을 가공하지 않고, 그대로 저장할 때 사용
                const formatted = formatPhone(e.target.value);
                formik.setFieldValue("phone", formatted); // 포맷된 값으로 폼 상태 업데이트 // 가공된 값 입력에 필수, 직접 제어 가능
                // "phone" → 폼 필드 이름 (name 속성 값)
                phoneValidation(formatted, setPhoneError, setIsPhone);
                setPhoneDuplicate({ boolean: false, message: "" });
              }}
              maxLength={13}
            />
            <button
              type="button"
              onClick={() => duplicateCheckPhone(formik.values.phone)}
              className="duplicate-btn"
            >
              중복확인
            </button>
          </div>

          <p
            className={clsx("error-message", {
              "duplicate-success": !phoneError && phoneDuplicate.boolean,
              "duplicate-fail": !phoneError && !phoneDuplicate.boolean,
            })}
          >
            {phoneError || phoneDuplicate.message}
          </p>

          <button type="submit" className="join-submit" disabled={!isValid}>
            가입하기
          </button>
        </form>
      </div>
    </JoinPageStyled>
  );
};

export default JoinPage;
