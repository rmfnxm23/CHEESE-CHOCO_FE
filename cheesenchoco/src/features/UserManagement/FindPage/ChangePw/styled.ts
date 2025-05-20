import styled from "styled-components";

export const ChangePwStyled = styled.div`
  &.changepw-wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .changepw-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 30px;
      border-radius: 12px;
      width: 100%;
      max-width: 500px;

      h2 {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
      }

      /* 인증 코드 */
      .code-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;

        .title {
          text-align: center;
        }

        input {
          padding: 14px 16px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 16px;
          transition: border-color 0.3s;

          &:focus {
            outline: none;
          }
        }

        button {
          padding: 14px 16px;
          font-size: 16px;
          color: #fff;
          background-color: #333;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: #0056b3;
          }
        }
      }

      /* 비밀번호 재설정 폼 */
      form {
        width: 100%;
        display: flex;
        flex-direction: column;

        input {
          padding: 14px 16px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: border-color 0.3s;

          &:focus {
            outline: none;
            border-color: #007bff;
          }
        }

        /* 비밀번호 변경 비활성화 */
        .change-btn {
          width: 100%;
          padding: 15px;
          border-radius: 8px;
          border: none;
          background-color: gray;
          color: #fff;
          transition: background-color 0.3s ease;
        }

        /* 비밀번호 변경 활성화 */
        .change-btn:enabled {
          background-color: black;
          color: white;
          cursor: pointer;
        }

        div {
          margin-top: 10px;
          font-size: 15px;
        }

        strong {
          color: #007bff;
        }
      }

      .error-message {
        color: red;
        margin: 10px;
      }
    }
  }
`;
