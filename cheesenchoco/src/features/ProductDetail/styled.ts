import { Modal } from "antd";
import styled from "styled-components";

export const ProductDetailStyled = styled.div`
  margin-top: 100px;
  /* max-width: 1800px; */
  /* padding: 0 7%; */

  .detail-container {
    max-width: 1800px;
    width: 100%;
    padding: 0 7%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    overflow: visible; // 💡 중요
    /* border-top: 1px solid #aaa; */

    .detail-Image {
      width: 55%;
      padding: 0;
      margin: 0;

      .img-wrap {
        width: 100%;
        margin-top: 20px;
      }

      .img-wrap img {
        width: 100%;
        height: 100%;
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
        /* font-weight: 600 !important; */
      }
    }

    .product-content {
      margin-top: 20px;
    }

    /* .product-info {
      width: 40%;
      margin: 0 80px;
      padding: 3% 0 0;
      box-sizing: border-box;
      position: relative;
    }

    .product-fixed {
      width: 100%;
      position: absolute;
      top: 0;
    } */

    .product-info {
      width: 45%;
      margin-left: 80px;
      padding: 3% 0 0;
      box-sizing: border-box;
      /* position: relative; → ❌ 제거해야 sticky 정상작동 */
    }

    .product-fixed {
      position: sticky;
      top: 120px; // 🧠 header 높이에 맞춰 조정
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
        max-width: 100%; // 너비 초과 방지

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
      /* border-top: 1px solid #f0f0f0; */
      /* border-bottom: 1px solid #f0f0f0; */
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
`;

export const CustomModal = styled(Modal)`
  .ant-modal-content {
    /* border-radius: none !important; */
    background-color: #f5f5f5;
    padding: 40px 40px 50px;
  }

  .ant-modal-body {
    /* background: #fff0f6; */
    border-bottom: none;
    padding: 30px;
    text-align: center;
    font-size: 20px;
  }

  .ant-modal-footer {
    /* text-align: center; */
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
