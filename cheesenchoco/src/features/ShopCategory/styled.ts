import styled from "styled-components";

export const ShopCategoryStyled = styled.div`
  margin-top: 100px;
  position: relative;
  border-top: 1px solid #aaa;

  .category-title {
    position: absolute;
    top: -20px;
    left: 30px;
    z-index: 10;
  }

  .category-badge {
    display: inline-block;
    background-color: #000;
    color: #fff;
    font-size: 1.5rem;
    padding: 0.4rem 1.2rem;
    border-radius: 100%;
    font-weight: 500;
    white-space: nowrap;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 40px 0px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .img-box {
      padding: 0;
    }
  }

  /* 페이지네이션 */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;

    ul .ant-pagination-item-active {
      border: none;
    }
  }

  .empty {
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 1.5rem;
      color: #666;
    }
  }
`;
