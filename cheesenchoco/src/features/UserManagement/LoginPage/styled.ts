import styled from "styled-components";

export const LoginPageStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-container {
    width: 100%;
    max-width: 416px;
    margin: auto;

    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .form-box {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-box {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    input {
      width: 100%;
      padding: 15px;
      border: 1.5px solid #e7e7e9;
      border-radius: 5px;
      outline: none;
    }

    .login-btn {
      margin-top: 1rem;
      width: 100%;
      padding: 15px;
      border-radius: 30px;
      border: none;
      background-color: black;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .findpage {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 5px;
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #555;
      text-align: right;

      span {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .login-btn {
      cursor: pointer;
    }

    .login-error {
      color: red;
      font-size: 0.75rem;
      margin-top: 0.5rem;
    }

    .joinpage {
      display: flex;
      justify-content: center;
      gap: 10px;
      font-size: 14px;
      margin-top: 20px;

      p {
        margin: 0;
      }

      .move-join {
        cursor: pointer;
        font-weight: 500;
        color: green;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .or-line {
      display: flex;
      align-items: center;
      text-align: center;
      margin: 20px 0;
    }

    .or-line p {
      margin: 0 10px;
      font-size: 14px;
      color: #666;
      white-space: nowrap;
    }

    .or-line .line {
      flex: 1;
      height: 1px;
      background-color: #ccc;
    }
  }
`;
