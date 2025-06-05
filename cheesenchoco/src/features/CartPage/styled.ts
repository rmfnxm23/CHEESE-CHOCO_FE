import styled from "styled-components";

export const CartPageStyled = styled.div`
  max-width: 1500px;
  width: 100%;
  margin: 100px auto 0;

  h2 {
    text-align: center;
    border-top: 1px solid #ececec;
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
    }

    li {
      list-style: none;
      color: #aaa;
      font-weight: normal;

      &.active {
        color: #000;
        font-weight: bold;
      }
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
  }

  .order-header div {
    font-weight: bold;
    background-color: #f5f5f5;
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
`;
