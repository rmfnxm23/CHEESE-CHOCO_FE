import styled from "styled-components";

export const OrderInfoStyled = styled.div`
  display: flex;
  gap: 30px;
  padding: 30px;
  background-color: #ffffff;
  max-width: 1400px;
  margin: 0 auto;
  font-family: "Pretendard", sans-serif;

  @media (max-width: 600px) {
    padding: 0;
  }

  .left {
    width: 60%;

    .deleveryInfo-wrap {
      position: relative;
    }

    .deliveryInfo {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 20px;

      h5 {
        flex: 0 0 130px;
        margin: 0;
        font-weight: 600;
        color: #333;
      }

      .delivery-title::after {
        content: "*";
        padding-left: 3px;
        font-size: 12px;
        color: rgb(255, 72, 0);
        vertical-align: -2px;
      }

      > div {
        flex: 1.5;

        input {
          width: 80%;
          padding: 10px 12px;
          font-size: 14px;
          box-sizing: border-box;
          border: 1px solid rgb(228, 228, 228);
          outline: none;

          &:focus {
            outline: none;
          }
        }

        // 주소 입력 필드들의 여백 조정
        > div {
          margin-bottom: 12px;
          display: flex;
          align-items: center;

          input[type="text"] {
            flex: none;
            border: 1px solid rgb(228, 228, 228);
            outline: none;
          }

          button {
            margin-left: 8px;
          }
        }
      }
    }

    .address-search {
      background-color: rgb(244, 244, 244);
      padding: 10px 16px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .address-list {
      background-color: #ffffff;
      color: #007aff;
      padding: 10px 16px;
      border: none;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      position: absolute;
      right: 0;
      top: 0;

      &:hover {
        color: #005fcc;
        text-decoration: underline;
      }
    }
  }

  .messageChoice {
    .selectedMessage {
      position: relative;
      width: 100%;

      .selectedInput {
        width: 100%;
      }
    }

    .arrowDropDown {
      position: absolute;
      top: 0;
      right: 0;
      width: 15px;
      height: auto;
      aspect-ratio: 1/1;
      margin: 10px 12px;
      z-index: 1;
    }

    ul {
      width: 100%;
    }
    li {
      list-style: none;
      width: 100%;

      &:hover {
        background-color: #ccc;
      }
    }
  }

  /* 주소 검색 모달 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal-content {
    background-color: white;
    padding: 24px;
    border-radius: 2px;
    width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  }

  /* 배송 요청 사항 */
  .dropdown-list {
    border: 1px solid rgb(228, 228, 228);
    outline: none;
    border-top: none;
    margin-bottom: 10px;

    li {
      cursor: pointer;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      padding: 11px 13px;
      font-size: 13px;
      line-height: 20px;
      color: rgb(93, 93, 93);
      text-align: left;
      text-decoration: none;
    }
  }

  .directInput {
    margin-top: 12px;
    width: 100% !important;
  }

  @media (max-width: 800px) {
    .left {
      width: 100%;
    }

    .deliveryInfo {
      flex-direction: column;
      align-items: flex-start;
      gap: 0px !important;
    }

    .deliveryInfo h5 {
      flex: 0px !important;
      width: 100%;
      margin-bottom: 5px !important;
      font-size: 14px;
    }

    .deliveryInfo > div {
      flex: none;
      width: 100%;
    }

    .deliveryInfo > div input {
      width: 100% !important;
    }

    .deliveryInfo > div > div {
      flex-direction: column;
      align-items: flex-start;
    }

    .deliveryInfo > div > div input,
    .deliveryInfo > div > div button {
      width: 100%;
      margin: 4px 0;
      margin-left: 0px !important;
    }

    .address-list {
      position: static;
      display: block;
      margin-bottom: 12px;
      padding: 0px !important;
    }

    .arrowDropDown {
      right: 10px;
      top: 10px;
    }

    .cart-row {
      border: none;
    }

    .cart-row + .cart-row {
      border-top: 1px solid #e0e0e0;
    }
  }

  .right {
    flex: 1;
    border: 4px solid #ddd;
    padding: 20px;
    height: fit-content;
    position: sticky;
    top: 120px;
  }

  /* 결제 부분 */
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .pay {
    margin-top: 20px;
  }

  .pay-btn {
    width: 100%;
    background-color: #000;
    color: #fff;
    padding: 10px 16px;
    border: none;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  /* 주문 동의 부분 */
  .order-agree {
    margin-top: 20px;
    border-top: 1px solid rgb(228, 228, 228);

    .checkbox-all {
      display: flex;
      align-items: center;
      margin: 12px 0;

      input[type="checkbox"] {
        margin-right: 8px;
        border: 1px solid rgb(228, 228, 228);
        outline: none;
      }

      label {
        font-weight: 500;
        color: #333;
      }
    }

    .checkbox-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;

        margin-bottom: 8px;

        input[type="checkbox"] {
          margin-right: 8px;
          border: 1px solid rgb(228, 228, 228);
          outline: none;
        }

        label {
          font-size: 14px;
          color: #555;
        }
      }
    }
  }
  @media (max-width: 800px) {
    display: block;

    .left {
      width: 100%;
    }

    .right {
      width: 100%;
      position: relative;
      margin-top: 24px;
      position: static; /* 기존 sticky 해제 */
      border: none;
      border-top: 2px solid #000;
      border-bottom: 2px solid #000;
    }

    .pay {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
      padding: 12px 16px;
      z-index: 1000;
    }

    .pay-btn {
      width: 100%;
      height: 48px;
      font-size: 16px;
    }
  }
`;
