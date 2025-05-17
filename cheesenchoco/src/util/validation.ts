import { Dispatch, SetStateAction } from "react";

// 이메일 유효성 검사
export const emailValidation = (
  email: string,
  setEmailError: Dispatch<SetStateAction<string>>,
  setIsEmail: Dispatch<SetStateAction<boolean>>
) => {
  const regex = /\S+@\S+\.\S+/;
  if (!email) {
    setEmailError("아이디를 입력해주세요.");
    setIsEmail(false);
  } else if (!regex.test(email)) {
    setEmailError("이메일의 형식이 아닙니다.");
    setIsEmail(false);
  } else {
    setEmailError("");
    setIsEmail(true);
  }
};

// 비밀번호 유효성 검사
export const passValidation = (
  password: string,
  setPassError: Dispatch<SetStateAction<string>>,
  setIsPassword: Dispatch<SetStateAction<boolean>>
) => {
  // const regex =
  //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,16}$/; // 대소문자 중 하나 포함
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,16}$/; // 대소문자 각각 하나 포함
  if (!password) {
    setPassError("비밀번호를 입력해주세요.");
    setIsPassword(false);
  } else if (!regex.test(password)) {
    setPassError(
      "비밀번호는 대·소문자, 숫자, 특수문자를 포함한 8~16자이어야 합니다."
    );
    setIsPassword(false);
  } else {
    setPassError("");
    setIsPassword(true);
  }
};

// 비밀번호 확인 유효성 검사
export const passCheckValidation = (
  password: string,
  passwordCheck: string,
  setPassCheckError: Dispatch<SetStateAction<string>>,
  setIsPasswordCheck: Dispatch<SetStateAction<boolean>>
) => {
  if (!passwordCheck) {
    setPassCheckError("비밀번호를 확인해주세요.");
    setIsPasswordCheck(false);
  } else if (password !== passwordCheck) {
    setPassCheckError("비밀번호가 일치하지 않습니다.");
    setIsPasswordCheck(false);
  } else {
    setPassCheckError("");
    setIsPasswordCheck(true);
  }
};

// 이름 유효성 검사
export const nameValidation = (
  name: string,
  setNameError: Dispatch<SetStateAction<string>>,
  setIsName: Dispatch<SetStateAction<boolean>>
) => {
  const regex = /^[가-힣a-zA-Z\s\-']$/;

  if (!name) {
    setNameError("이름을 입력해주세요.");
  } else if (name.length < 2) {
    setNameError("이름은 2자 이상이어야 합니다.");
    setIsName(false);
  } else {
    setNameError("");
    setIsName(false);
  }
};
export const nameValidation2 = (
  name: string,
  setNameError: Dispatch<SetStateAction<string>>,
  setIsName: Dispatch<SetStateAction<boolean>>
) => {
  const regex = /^[가-힣a-zA-Z\s\-']{2,30}$/;
  if (!regex.test(name)) {
    setNameError("이름에는 한글, 영문, '-', '만 사용할 수 있어요.");
    setIsName(false);
  } else {
    setNameError("");
    setIsName(true);
  }
};

// 전화번호 유효성 검사
export const phoneValidation = (
  phone: string,
  setPhoneError: Dispatch<SetStateAction<string>>,
  setIsPhone: Dispatch<SetStateAction<boolean>>
) => {
  const regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  if (!phone) {
    setPhoneError("번호를 입력해주세요.");
    setIsPhone(false);
  } else if (!regex.test(phone)) {
    setPhoneError("올바른 번호가 아닙니다.");
    setIsPhone(false);
  } else {
    setPhoneError("");
    setIsPhone(true);
  }
};

// 휴대폰 번호 자동 하이픈(-) 생성
export const formatPhone = (phone: string) => {
  let phoneNumber = phone.replace(/[^\d]/g, "");
  let formattedPhone = "";

  if (phoneNumber.length < 4) {
    formattedPhone = phoneNumber;
  } else if (phoneNumber.length >= 4 && phoneNumber.length <= 7) {
    formattedPhone = phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3);
  } else {
    formattedPhone =
      phoneNumber.slice(0, 3) +
      "-" +
      phoneNumber.slice(3, 7) +
      "-" +
      phoneNumber.slice(7);
  }
  return formattedPhone;
};
