import styled from "styled-components";

export const SearchStyled = styled.div`
  &.search-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 100px 0;
    box-sizing: border-box;
    text-align: center;

    .titleArea {
      text-align: center;
      border-top: 1px solid #ececec;
      padding: 60px 3% 40px;
      width: 100%;
      display: inline-block;

      h2 {
        text-transform: lowercase;
        letter-spacing: -0.03em;
        padding: 2px 15px 2px 14px;
        font-size: 31px;
        display: unset;
        border-radius: 100%;
        font-weight: 400;
        border: 1px solid black;
      }
    }

    /* 검색어 입력 */
    .search-box {
      border-bottom: 1px solid black;
      padding: 10px;

      width: 400px;
      margin: 50px auto 0;
      display: flex;
      justify-content: space-between;

      input {
        outline: none;
        border: none;
      }
    }

    .search-btn {
      border: none;
      background-color: white;
    }

    /* 검색 결과 (상품 카드형) */
    .group-row {
      width: 100%;
      max-width: 1200px;
      display: grid;
      justify-content: center;
      margin: 60px auto 0;

      grid-template-columns: repeat(4, 1fr);

      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    /* 데이터 없음 */
    .no-result {
      font-size: 1.2rem;
      color: #666;
      margin-top: 30px;
    }

    .product-card {
      /* border: 1px solid #888; */
      border: none !important;
      overflow: hidden;
      background: #fff;

      .product-title {
        border-top: none !important;

        height: auto;
        display: flex;
        justify-content: flex-start !important;

        .product-name {
          text-align: start;
        }

        .product-price {
          text-align: end;
        }
      }
    }
  }
`;
