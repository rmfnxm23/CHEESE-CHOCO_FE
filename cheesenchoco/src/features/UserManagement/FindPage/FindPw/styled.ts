import styled from "styled-components";

export const FindPwStyled = styled.div`
  &.findpw-wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .findpw-container {
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

      form {
        width: 100%;
        display: flex;
        flex-direction: column;

        input {
          padding: 14px 16px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 16px;
          transition: border-color 0.3s;

          &:focus {
            outline: none;
            border-color: #007bff;
          }
        }

        button {
          padding: 14px 16px;
          font-size: 16px;

          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: #0056b3;
          }
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
        margin-top: 10px;
      }
    }
  }
`;
