import { Modal } from "antd";
import styled from "styled-components";

export const ProfileStyled = styled.div`
  /* .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding: 0 0 0.75rem;
    border-bottom: 4px solid #aaa;
  }

  section {
    margin-bottom: 30px;
  }

  .section1 .myInfo Input {
    border: none;
  }

  .myInfo {
    display: flex;

    .block {
      width: 130px;
      display: flex;
      align-items: center;
    }
  }

  .duplicate,
  .change-btn {
    width: 15%;
  } */
  /* .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding: 0 0 0.75rem;
    border-bottom: 4px solid #aaa;
  }

  section {
    margin-bottom: 30px;
  }

  .section1 .myInfo Input {
    border: none;
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
      padding-top: 0.5rem;
    }

    &.contact {
      align-items: flex-start;
    }

    .input-group {
      flex: 1;
      display: flex;
      flex-direction: column;

      .input-row {
        display: flex;
        gap: 0.5rem;
      }

      .error,
      .check {
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
    }
  }

  .duplicate,
  .change-btn {
    padding: 0.5rem 1rem;
    background: #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .text-green-600 {
    color: #16a34a;
  }

  .text-red-500 {
    color: #ef4444;
  } */
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 4px solid #aaa;
  }

  section {
    margin-bottom: 2rem;
  }

  .section1 .myInfo Input {
    border: none;
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

    /* .check {
      color: #16a34a;
    } */

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
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #2563eb;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #1d4ed8;
    }
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
