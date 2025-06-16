import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { PassModal, ProfileStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";
import { App as AntdApp, Input, Modal, message } from "antd";
import {
  formatPhone,
  passCheckValidation,
  passValidation,
  phoneValidation,
} from "@/util/validation";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import api from "@/lib/api";

const Profile = () => {
  const router = useRouter();
  const { message } = AntdApp.useApp();

  const { user, isAuthenticated, logout } = useAuth();

  // 휴대폰 관리
  const [phoneError, setPhoneError] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [phoneDuplicate, setPhoneDuplicate] = useState({
    boolean: false,
    message: "",
  });
  const [isPhoneChanged, setIsPhoneChanged] = useState(false); // 휴대폰 변경 여부

  // 비밀번호 유효성 검사에 따른 에러 메세지 상태 관리
  const [passError, setPassError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");

  // 비밀번호 유효성 검사 boolean 상태
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  // 비밀번호 변경 모달
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    passFormik.resetForm(); // 닫을 때 초기화
  };

  // 중복확인 - 휴대폰 번호
  const duplicateCheckPhone = async (phone: string) => {
    try {
      if (!phone.trim()) {
        setPhoneDuplicate({ boolean: false, message: "번호를 입력해주세요." });
        return;
      }

      if (!isPhone) {
        setPhoneDuplicate({
          boolean: false,
          message: "유효한 번호를 입력해주세요.",
        });
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

  // 회원 정보 불러오기
  useEffect(() => {
    if (user) {
      infoFormik.setFieldValue("name", user.name);
      infoFormik.setFieldValue("email", user.email);
      infoFormik.setFieldValue("phone", user.phone);
    }
  }, [user]);

  // 회원 탈퇴 처리
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    Modal.confirm({
      title: "정말 탈퇴하시겠습니까?",
      content: "탈퇴 후 서비스 이용을 하실 수 없습니다.",
      okText: "예",
      cancelText: "아니오",
      centered: true,
      okButtonProps: {
        style: { backgroundColor: "#000" },
      },
      async onOk() {
        // 회원 탈퇴 로직 (API 호출로 계정 삭제)
        try {
          const accessToken = Cookies.get("accessToken");

          const response = await api.delete("/user/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (response.status === 201) {
            alert("탈퇴가 완료되었습니다.");
            // dispatch(logoutUser());
            router.push("/");
          } else {
            alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
          }
        } catch (error) {
          console.error("회원 탈퇴 중 오류 발생:", error);
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
      },
    });
  };

  // 회원정보 수정용 폼
  const infoFormik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
    onSubmit: async (values) => {
      console.log("회원정보 수정 요청:", values);
      console.log(
        "onSubmit 실행됨",
        values,
        isPhoneChanged,
        isPhone,
        phoneDuplicate.boolean
      );
      if (!user) {
        return;
      }

      // if (isPhoneChanged) {
      //   if (!isPhone) {
      //     alert("유효한 휴대폰 번호를 입력해주세요."); // 유효성 검사 미통과
      //     return;
      //   }
      //   if (!phoneDuplicate.boolean) {
      //     alert("휴대폰 번호 중복 확인을 해주세요."); // 중복 검사 미완료
      //     return;
      //   }
      // }

      const data = {
        id: user.id,
        phone: values.phone,
      };

      try {
        const res = await api.put("/user/update/myInfo", data);

        if (res.data.success === true) {
          alert(res.data.message);
          setPhoneError("");
          setPhoneDuplicate({ boolean: false, message: "" });
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  // 비밀번호 변경용 폼
  const passFormik = useFormik({
    initialValues: {
      password: "",
      passwordCheck: "",
    },
    onSubmit: async (values) => {
      console.log("비밀번호 변경 요청:", values);
      if (!user) {
        return;
      }
      const data = {
        id: user.id,
        password: values.password,
      };

      try {
        const res = await api.post("/user/change/pw", data);

        if (res.data.success === true) {
          alert(res.data.message);
          setShowModal(false);
          passFormik.resetForm(); // input 값 초기화
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <ProfileStyled className={clsx("profile-wrap")}>
      <div className="profile-container">
        <h2 className="title">회원정보 수정</h2>

        <form onSubmit={infoFormik.handleSubmit} className="infoForm">
          {/* 기본 정보 */}
          <section className="section1">
            <h3 className="text">기본 정보</h3>
            <div className="myInfo">
              <label className="block">이름</label>
              <Input name="name" value={infoFormik.values.name} readOnly />
            </div>
            <div className="myInfo">
              <label className="block">이메일</label>
              <Input name="email" value={infoFormik.values.email} readOnly />
            </div>
          </section>

          {/* 비밀번호 변경 */}
          <section>
            <h3 className="text">보안 정보</h3>
            <div className="myInfo">
              <label className="block">비밀번호</label>

              <div className="input-group">
                <div className="input-row">
                  <Input value="●●●●●●●●●" readOnly />
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="right-btn"
                  >
                    변경
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 비밀번호 변경 모달 */}
          <PassModal
            title="비밀번호 변경"
            open={showModal}
            onCancel={() => setShowModal(false)}
            centered
            footer={null}
            width={450}
          >
            <form onSubmit={passFormik.handleSubmit}>
              <input
                type="password"
                name="password"
                value={passFormik.values.password}
                onChange={(e) => {
                  passFormik.handleChange(e);
                  passValidation(e.target.value, setPassError, setIsPassword);
                }}
                placeholder="새 비밀번호"
                required
              />
              <p className="error-message">{passError}</p>

              <input
                type="password"
                name="passwordCheck"
                value={passFormik.values.passwordCheck}
                onChange={(e) => {
                  passFormik.handleChange(e);
                  passCheckValidation(
                    e.target.value,
                    passFormik.values.password,
                    setPassCheckError,
                    setIsPasswordCheck
                  );
                }}
                placeholder="새 비밀번호 확인"
                required
              />
              <p className="error-message">{passCheckError}</p>

              <button
                type="submit"
                disabled={!(isPassword && isPasswordCheck)}
                className="change-btn"
              >
                변경
              </button>
            </form>
          </PassModal>

          <section>
            <h3 className="text">연락처 수정</h3>
            <div className="myInfo contact">
              <label className="block">휴대폰 번호</label>
              <div className="input-group">
                <div className="input-row">
                  <Input
                    name="phone"
                    value={infoFormik.values.phone}
                    maxLength={13}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      infoFormik.setFieldValue("phone", formatted);

                      const changed =
                        formatted !== infoFormik.initialValues.phone;
                      setIsPhoneChanged(changed);

                      if (changed) {
                        phoneValidation(formatted, setPhoneError, setIsPhone);
                        setPhoneDuplicate({ boolean: false, message: "" });
                      } else {
                        // 원래 번호로 복귀했을 때
                        setPhoneError("");
                        setIsPhone(true);
                        setPhoneDuplicate({ boolean: true, message: "" });
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="duplicate btn right-btn"
                    onClick={() => duplicateCheckPhone(infoFormik.values.phone)}
                    // disabled={!isPhone}
                    disabled={!isPhone || !isPhoneChanged}
                  >
                    중복확인
                  </button>
                </div>

                {phoneError ? (
                  <p className="error">{phoneError}</p>
                ) : (
                  phoneDuplicate.message && (
                    <p
                      className={`message check ${
                        phoneDuplicate.boolean ? "text-green" : "text-red"
                      }`}
                    >
                      {phoneDuplicate.message}
                    </p>
                  )
                )}
              </div>
            </div>
          </section>

          {/* 제출 버튼 */}
          <div>
            <button
              type="submit"
              className="update-btn"
              // disabled={!isPhone}
              disabled={
                isPhoneChanged ? !(isPhone && phoneDuplicate.boolean) : false
              }
            >
              수정하기
            </button>
          </div>
        </form>

        {/* 탈퇴 */}
        <div className="mt-10 text-right">
          <button
            type="button"
            onClick={handleDelete}
            className="fire underline"
          >
            회원 탈퇴하기
          </button>
        </div>
      </div>
    </ProfileStyled>
  );
};

export default Profile;
