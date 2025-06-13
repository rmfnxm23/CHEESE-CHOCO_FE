import styled from "styled-components";

export const CartPageStyled = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 100px auto 0;
  padding: 30px;

  h2 {
    text-align: center;
    /* border-top: 1px solid #ececec; */
    padding: 60px 3% 40px;
    width: 100%;
  }

  .order-step {
    display: flex;
    justify-content: center;
    padding-bottom: 70px;

    ul {
      display: flex;
      gap: 20px;
      align-items: center;
      margin-left: 25px;
    }

    li {
      list-style: none;
      color: #aaa;
      font-weight: normal;
      display: inline-block; /* 🔑 글자만큼 width */

      &.active {
        color: #000;
        font-weight: bold;
      }
    }
  }

  /* 장바구니 비었을 때 */
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    /* margin-bottom: 100px; */
    padding: 100px;
    font-size: 30px;
    font-weight: 500;
    border-top: 4px solid #000;
    border-bottom: 1px solid #e5e5e5;

    button {
      /* border-radius: none;
      padding: 10px 20px;
      color: #f5f5f5;
      border: none;
      cursor: pointer;
      flex: 1 1 0%;
      max-width: 400px; */
      display: flex;
      flex: 1 1 0%;
      align-items: center;
      justify-content: center;
      max-width: 400px;
      height: 72px;
      padding: 10px 20px;
      font-size: 26px;
      font-weight: 400;
      color: rgb(48, 48, 51);
      background-color: rgb(255, 255, 255);
      border: 1px solid rgb(160, 160, 160);
      border-radius: none;
      cursor: pointer;
    }
    /* .shopping-btn {
      background-color: #000;
    } */
  }

  /* 툴바 */
  .cart-toolbar {
    display: none;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
    padding: 8px;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    .cart-toolbar {
      display: flex;
    }
  }

  /* 장바구니 테이블 */
  .cart-table {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    margin-top: 24px;
  }

  .cart-header,
  .cart-row {
    display: flex;
    align-items: center;
    padding: 20px 0px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
  }

  .cart-header {
    background-color: #f9f9f9;
    font-weight: 600;
    border-top: 4px solid #000;
  }

  .cart-row {
    background-color: #fff;
  }

  .col {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .col.checkbox {
    flex: 0 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .col.checkbox input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .col.product {
    flex: 2;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
  }

  .col.quantity,
  .col.price,
  .col.delivery {
    flex: 1;
    justify-content: center;
    text-align: center;
  }

  .col.price {
    font-weight: 700;
  }

  .product-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .product-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .cart-row img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    p {
      margin: 0;
      color: #333;
    }

    .info-name {
      font-size: 16px;
      font-weight: 700;
    }

    .info-opt {
      font-size: 13px;
      color: #808080;
    }
  }

  .delete-btn {
    padding: 6px 12px;
    border: none;
    background-color: #ff5252;
    color: white;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    white-space: nowrap;

    &:hover {
      background-color: #e84141;
    }
  }

  /* 모바일 카드형 */
  @media (max-width: 800px) {
    .mobile-cart-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mobile-cart-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mobile-delete-btn {
      background: transparent;
      border: none;
      color: #999;
      font-size: 14px;
      cursor: pointer;
    }

    .mobile-cart-body {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .mobile-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
    }

    .mobile-info .info-name {
      font-weight: bold;
    }

    .mobile-cart-footer {
      text-align: right;
    }

    .mobile-cart-footer button {
      background-color: black;
      color: white;
      padding: 6px 12px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  // 유틸리티 부분
  .cart-utils {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    .cart-utils-buttons {
      display: flex;
      gap: 15px;

      button {
        padding: 12px 15px;
        background-color: #fff;
        width: 150px;
        border: 1px solid rgb(160, 160, 160);
        font-size: 15px;
      }
    }

    .cart-utils_notice {
      font-size: 0.7rem;
    }
  }

  /* 모바일 전용 */
  @media (max-width: 800px) {
    .cart-utils {
      justify-content: right;
      margin-top: 0px;
      margin-bottom: 30px;
    }
  }

  // 주문 금액 테이블
  .order-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    margin: 100px 0;
    border-top: 2px solid #000;
  }

  .order-header,
  .order-row {
    display: table-row;
  }

  .order-header div,
  .order-row div {
    display: table-cell;
    padding: 20px 0;
    text-align: center;
    font-size: 16px;
    width: 30%;
  }

  .order-header div {
    font-weight: bold;
    background-color: #f5f5f5;
  }

  /* 모바일 전용 */
  @media (max-width: 800px) {
    .order-header,
    .order-row {
      display: none; /* PC 전용 숨기기 */
    }

    .order-mobile {
      display: block;
      /* background: #f9f9f9; */
      padding: 16px;
      border-radius: 8px;
    }

    .order-mobile .mobile-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      /* border-bottom: 1px solid #ddd; */
      font-size: 14px;
    }

    .order-mobile .mobile-row.total {
      font-weight: bold;
      font-size: 16px;
      color: #000;
      border-bottom: none;

      :last-child {
        color: red;
      }
    }
  }

  // 주문 버튼
  .order-or-shopping {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 100px;

    button {
      border-radius: none;
      padding: 10px 20px;
      color: #f5f5f5;
      border: none;
      cursor: pointer;
      flex: 1 1 0%;
      max-width: 400px;
    }
    .shopping-btn {
      background-color: #000;
    }
    .order-btn {
      background-color: #7d7d7d;
    }
  }

  /* 800px 이하 모바일 */
  @media (max-width: 800px) {
    .order-or-shopping {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #fff;
      padding: 10px 16px;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
      z-index: 100;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 0;
    }

    .order-or-shopping .shopping-btn,
    .order-or-shopping .order-btn {
      flex: 1;
      height: 48px;
      font-size: 16px;
    }
  }
`;
