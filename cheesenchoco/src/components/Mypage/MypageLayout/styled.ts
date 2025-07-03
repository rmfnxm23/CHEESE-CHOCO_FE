import styled from "styled-components";

export const MypageLayoutStyled = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;

  .mypage-container {
    display: flex;
    max-width: 1200px;

    margin: 100px auto 0;
    padding: 3rem 2rem;
    background-color: #fff;
    border-radius: 12px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .left {
    width: 25%;
    min-width: 200px;
    border-right: 1px solid #eee;

    display: flex;
    flex-direction: column;
    gap: 2.5rem;

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
            text-decoration: underline;
          }
        }

        &.active a {
          font-weight: 700;
          color: #000;
        }
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      order: 1;

      .userName {
        display: none;
      }

      ul {
        display: none;
      }
    }
  }

  .mypage-mobile-tabs {
    display: none;

    @media (max-width: 768px) {
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #ddd;
      padding: 1rem 0;
      margin-bottom: 2rem;

      a {
        font-size: 1rem;
        color: #333;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;

        &.active {
          font-weight: 700;
          border-color: #000;
        }
      }
    }
  }

  .right {
    width: 80%;
    padding-left: 3rem;

    @media (max-width: 768px) {
      width: 100%;
      order: 2;
      padding-left: 0;

      h2 {
        text-align: center;
      }
    }
  }
`;
