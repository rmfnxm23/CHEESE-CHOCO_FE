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
    }

    .product-name {
      border-bottom: 1px solid;
      padding: 10px 0;
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
      }
      .action-cart {
        border-right: none;
      }
    }
  }
`;
