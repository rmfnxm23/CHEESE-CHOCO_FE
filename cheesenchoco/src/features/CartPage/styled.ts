import styled from "styled-components";

export const CartPageStyled = styled.div`
  margin-top: 100px;

  h2 {
    text-align: center;
    border-top: 1px solid #ececec;
    padding: 60px 3% 40px;
    width: 100%;
  }

  .order-step {
    margin: 0 auto;
    display: flex;
    justify-content: center;

    ul {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    li {
      list-style: none;
    }
  }
`;
