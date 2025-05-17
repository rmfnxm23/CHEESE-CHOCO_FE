import styled from "styled-components";

export const JoinPageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .join-container {
    width: 100%;
    max-width: 416px;
    margin: auto;

    h2 {
      text-align: center;
    }

    input {
      width: 100%;
      margin-right: 8px;
      padding: 15px;
      border: 1.5px solid #e7e7e9;
      border-radius: 5px;
      outline: none;
    }

    .duplicate-wrap {
      display: flex;
    }

    .duplicate-btn {
      white-space: nowrap;
      padding: 0 10px;
      border: 1.5px solid #e7e7e9;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
    }
  }

  /* 회원가입 비활성화 */
  .join-submit {
    margin-top: 20px;
    width: 100%;
    padding: 15px;
    border-radius: 40px;
    border: none;
    background-color: gray;
    color: #ccc;
    transition: background-color 0.3s ease;
  }

  /* 회원가입 활성화 */
  .join-submit:enabled {
    background-color: black;
    color: white;
    cursor: pointer;
  }

  /* 유효성 에러 메시지 */
  .error-message {
    color: red;
    font-size: 0.7rem;
    margin-top: 0.3rem;
  }

  /* 중복확인 성공 메시지 */
  .duplicate-success {
    color: green;
  }

  /* 중복확인 실패 메시지 */
  .duplicate-fail {
    color: red;
  }
`;
