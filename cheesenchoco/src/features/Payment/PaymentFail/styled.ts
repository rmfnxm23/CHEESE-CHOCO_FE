import styled from "styled-components";

export const PaymentFailStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;

  &.fail-wrap {
    width: 100%;
    max-width: 1020px;
    height: 41.5vh;
    padding: 10px;
    margin: 0 auto;

    .fail-box {
      margin-top: 50px;
      display: flex;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;
