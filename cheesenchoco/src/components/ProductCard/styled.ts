import styled from "styled-components";

export const ProductCardStyled = styled.div`
  width: 100%;

  .product-card {
    border: 1px solid #888;
    overflow: hidden;
    background: #fff;
  }

  .product-image-wrap {
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    position: relative;
  }

  .img-box {
    padding: 10px;
  }

  .img-box img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    display: block;
    cursor: pointer;
  }

  .product-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px;
    border-top: 1px solid #888;
    height: 70px;
    gap: 20px;
    cursor: pointer;

    .product-name {
      width: 70%;
    }

    .product-price {
      width: 30%;
      text-align: end;
    }
  }
`;
