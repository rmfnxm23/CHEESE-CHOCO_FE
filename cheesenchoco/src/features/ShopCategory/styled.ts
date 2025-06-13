// import styled from "styled-components";

// export const ShopCategoryStyled = styled.div`
//   margin-top: 100px;

//   .category-title {
//     text-align: center;
//     margin-bottom: 2rem;
//     position: relative;
//   }

//   .category-badge {
//     display: inline-block;
//     background-color: #000;
//     color: #fff;
//     font-size: 1.1rem;
//     padding: 0.4rem 1.2rem;
//     border-radius: 999px; /* 타원형 (pill shape) */
//     font-weight: 500;
//     letter-spacing: 0.5px;
//     position: absolute;
//     top: -25px;
//   }

//   .product-grid {
//     display: grid;
//     flex: 1 1;
//     /* grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); */
//     grid-template-columns: repeat(4, 1fr);
//     /* gap: 32px; */
//     /* padding: 40px 20px; */
//     justify-content: center;

//     @media (max-width: 1024px) {
//       grid-template-columns: repeat(3, 1fr);
//     }

//     @media (max-width: 768px) {
//       grid-template-columns: repeat(2, 1fr);
//     }

//     @media (max-width: 480px) {
//       grid-template-columns: repeat(1, 1fr);
//     }
//   }
// `;
import styled from "styled-components";

export const ShopCategoryStyled = styled.div`
  margin-top: 100px;
  position: relative;
  border-top: 1px solid #aaa;

  .category-title {
    position: absolute;
    top: -20px;
    left: 30px;
    /* transform: translateX(-50%) translateY(-50%); */
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
    /* gap: 32px; */
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
