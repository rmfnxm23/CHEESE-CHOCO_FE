import { Modal } from "antd";
import styled from "styled-components";

export const ProfileStyled = styled.div`
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 3px solid #000;
  }

  .text {
    margin-top: 0.75rem;
    margin-bottom: 1rem;
  }

  section {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }

  form section:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .section1 .myInfo Input {
    border: none;
    outline: none;
    background-color: inherit;
    padding: 0;

    &:focus {
      border: none;
      outline: none;
      box-shadow: none; /* 브라우저 기본 포커스 그림자 제거 */
    }
  }

  input[readonly] {
    cursor: default;
    background-color: #f9f9f9; /* 선택사항: readonly 느낌 강조 */
  }

  .myInfo {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;

    .block {
      width: 130px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    .input-group {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .input-row {
      display: flex;
      gap: 0.5rem;

      input {
        flex: 9;
      }

      .right-btn {
        flex: 1;
        background-color: #333;
        color: #fff;
        border: none;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
          background-color: #555;
        }
      }
    }

    .message {
      margin-top: 0.25rem;
      font-size: 0.875rem;
    }

    .error {
      color: #ef4444;
    }

    .text-green {
      color: green;
    }

    .text-red {
      color: red;
    }
  }

  .update-btn {
    display: block;
    margin: 2rem auto 0;
    padding: 0.6rem 1.3rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #7d7d7d;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #1d4ed8;
    }
  }

  .update-btn:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  .fire {
    display: inline-block;
    margin-top: 3rem;
    text-decoration: underline;
    font-size: 0.9rem;
    color: #888;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    &:hover {
      color: #555;
    }
  }
`;

export const PassModal = styled(Modal)`
  .ant-modal-content {
    padding: 40px;
  }

  .ant-modal-title {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    gap: 16px;

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    input {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 6px;

      &:focus {
        outline: none;
      }
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: -10px;
      margin-bottom: 4px;
    }

    .change-btn {
      width: 100%;
      margin-top: 10px;
      padding: 10px 20px;
      font-size: 15px;
      background-color: #7d7d7d;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #000;
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }

  .ant-modal-footer {
    display: none; /* 푸터는 제거하고 form은 body 영역에 넣음 */
  }
`;
