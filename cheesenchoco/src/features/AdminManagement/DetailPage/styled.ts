import styled from "styled-components";

export const DetailPageStyled = styled.div`
  &.detail-wrap {
    padding: 2rem;
    background-color: #f9fafb;
    min-height: 100vh;
  }

  .detail-container {
    max-width: 1800px;
    margin: 0 auto;
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }

  .img-wrap {
    display: flex;
  }

  .previewBox {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      width: 300px;
      border: 1px solid #ddd;
      border-radius: 8px;
      object-fit: cover;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .productInfo {
    margin-top: 2rem;

    div {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      line-height: 1.6;
      color: #333;

      strong {
        display: inline-block;
        width: 80px;
        color: #111;
      }
    }
  }
`;
