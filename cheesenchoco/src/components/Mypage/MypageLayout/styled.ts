import styled from "styled-components";

export const MypageLayoutStyled = styled.div`
  /* margin-top: 100px; */
  width: 100%;
  max-width: 1500px;
  /* background-color: #f9f9f9; */
  margin: 0 auto;

  .mypage-container {
    display: flex;
    max-width: 1200px;
    min-height: 90vh;
    margin: 100px auto 0;
    padding: 3rem 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  }

  .left {
    width: 25%;
    min-width: 200px;
    border-right: 1px solid #eee;
    /* padding-right: 2rem; */

    display: flex;
    flex-direction: column;
    gap: 2.5rem; // 섹션 간 간격 조정

    .userName {
      text-align: left;

      strong {
        font-size: 28px;
        font-weight: 600;
        color: #222;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li {
        font-size: 1rem;

        a {
          color: #333;
          text-decoration: none;
          transition: all 0.2s ease;

          &:hover {
            color: #0070f3;
          }
        }

        &.active a {
          font-weight: 700;
          color: #0070f3;
        }
      }
    }
  }

  .right {
    width: 80%;
    padding-left: 3rem;
  }
`;
