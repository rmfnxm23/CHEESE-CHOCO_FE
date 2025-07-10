import { Drawer, Modal } from "antd";
import styled from "styled-components";

export const ProductDetailStyled = styled.div`
  margin-top: 100px;

  border-top: 1px solid #aaa;

  .detail-container {
    max-width: 1800px;
    width: 100%;
    padding: 0 7%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    overflow: visible;

    .detail-Image {
      width: 55%;
      padding: 0 20px;
      margin: 0;

      .img-wrap {
        width: 100%;
        margin-top: 20px;
      }

      .img-wrap img {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: fill;
      }
    }

    .swiper-button-prev,
    .swiper-button-next {
      color: black;
      width: 50px;

      &::after {
        font-size: 1.5rem !important;
      }
    }

    .product-content {
      margin-top: 20px;

      img {
        width: 100%;
      }
    }

    .product-info {
      width: 45%;
      margin: 0 4%;
      padding: 3% 0 0;
      box-sizing: border-box;
    }

    .product-fixed {
      position: sticky;
      top: 120px;
      width: 100%;
      padding: 5px;
    }

    .product-name {
      border-bottom: 1px solid;
      padding: 10px 0;
      font-size: 20px;
    }

    .product-price {
      margin: 20px 0;
    }

    .product-option {
      display: flex;
      flex-direction: column;
      width: 100%;

      select {
        width: 100%;
        padding: 12px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        outline: none;
        box-shadow: none;
        box-sizing: border-box;
        max-width: 100%;

        &:focus {
          border: 1px solid #ccc;
          outline: none;
          box-shadow: none;
        }

        option {
          width: 100%;
          white-space: nowrap; // 텍스트 줄바꿈 방지
          overflow: hidden; // 넘치는 텍스트 감추기
          text-overflow: ellipsis; // 생략 부호로 처리
        }
      }
    }

    /* 선택된 상품 자동 추가 */
    .selected-products {
      width: 100%;
      max-height: 280px;
      font-family: "ProximaNova-Regular", "Noto Sans KR";
      padding: 0 15px;
      background: #fafafa;

      &.active {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }

      li {
        position: relative;
        padding: 20px 0;
        list-style: none;
        display: flex;
        justify-content: space-between;
      }

      li ~ li {
        border-top: 1px solid #f0f0f0;
      }

      .item-calculate {
        display: flex;
        align-items: center;
        gap: 20px;

        .add-product-cancel {
          display: flex;
          align-items: center;
        }
      }
    }

    /* 선택한 상품 총 금액 */
    .total-price {
      display: flex;
      justify-content: right;
      border-top: 2px solid black;
      padding: 20px 0;
      color: red;
      font-size: 1.2rem;
    }

    .product-button {
      width: 100%;
      display: flex;
      margin-top: 10px;

      .action-cart,
      .action-buy {
        width: 50%;
        padding: 10px 50px;
        border: 1px solid;
        text-align: center;
        cursor: pointer;
      }

      .action-cart {
        border-right: none;
      }
    }
  }

  /* 하단 고정 버튼 */
  /* 기본적으로 하단 고정 버튼 숨기기 */
  .bottom-fixed-buttons {
    display: none;
  }

  /* 1200px 이하 화면에서 보이도록 */
  @media screen and (max-width: 1200px) {
    .action-cart,
    .action-buy {
      font-size: 80%;
      padding: 10px 0px !important;
    }
  }

  /* 700px 이하 화면에서 보이도록 */
  @media screen and (max-width: 700px) {
    .product-info {
      display: none;
      margin-left: 2rem;
    }

    .detail-container .detail-Image {
      width: 100%;
    }

    .product-button {
      display: none;
    }
    .bottom-fixed-buttons {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid #ddd;
      justify-content: space-around;
      z-index: 9999;
      box-shadow: 0 -2px 8px rgb(0 0 0 / 0.1);
    }
    .bottom-fixed-buttons > div {
      flex: 1;
      text-align: center;
      font-weight: 600;
      cursor: pointer;
      padding: 12px 0;
      border-radius: 4px;
    }
    .bottom-fixed-buttons .action-cart {
      margin-right: 8px;
      padding: 20px 0;
    }
    .bottom-fixed-buttons .action-buy {
      border-left: 1px solid #ddd;
      padding: 20px 0;
    }
  }
`;

export const CustomModal = styled(Modal)`
  .ant-modal-content {
    background-color: #f5f5f5;
    padding: 40px 40px 50px;
  }

  .ant-modal-body {
    border-bottom: none;
    padding: 30px;
    text-align: center;
    font-size: 20px;
  }

  .ant-modal-footer {
    margin-top: 20px;

    .ant-button {
      display: flex;
      justify-content: center;
      gap: 10px;

      button {
        border-radius: none;
        padding: 10px 20px;
        color: #f5f5f5;
        border: none;
        cursor: pointer;
      }
      .cart-btn {
        background-color: #7d7d7d;
      }
      .shop-btn {
        background-color: #000;
      }
    }
  }
`;

export const CustomDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0 24px 24px 24px;
  }

  .drawer-option {
    padding: 15px;

    .product-option {
      margin-bottom: 20px;

      select {
        padding: 10px;
        width: 100%;
      }

      .custom-select-wrapper {
        position: relative;
        width: 100%;
        margin-bottom: 20px;
      }

      .custom-select-box {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        background: #fff;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .custom-select-options {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #ccc;
        background-color: #fff;
        z-index: 100;
      }

      .custom-option {
        padding: 10px;
        cursor: pointer;

        &:hover {
          background-color: #f5f5f5;
        }
      }

      .arrow {
        font-size: 12px;
        color: #999;
      }
    }

    .selected-products {
      background: #fafafa;

      max-height: 240px;
      overflow-y: auto;

      &.active {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }

      li {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
      }

      li ~ li {
        border-top: 1px solid #f0f0f0;
      }

      .item-calculate {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    .total-price {
      text-align: right;
      font-size: 1.1rem;
      font-weight: 500;
      color: red;
      border-top: 2px solid black;
      padding-top: 10px;
    }

    .product-button {
      display: flex;

      .action-cart,
      .action-buy {
        flex: 1;
        text-align: center;
        padding: 12px;
        border: 1px solid #000;
      }

      .action-cart {
        border-right: none;
      }
    }
  }
`;
