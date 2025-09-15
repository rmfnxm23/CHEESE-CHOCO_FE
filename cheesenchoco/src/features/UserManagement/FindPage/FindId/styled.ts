import styled from "styled-components";

export const FindIdStyled = styled.div`
  &.findid-wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .findid-container {
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
            border-color: #333;
          }
        }

        button {
          padding: 14px 16px;
          font-size: 16px;
          background-color: gray;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: black;
          }
        }

        div {
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

      .find-success {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
      }

      .next-step {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 5px;
        font-size: 0.85rem;
        color: #555;
        text-align: right;
        line-height: 1;

        div {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;
