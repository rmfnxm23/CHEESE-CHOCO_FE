import styled from "styled-components";

// export const HeaderStyled = styled.div`
//   &.header-wrap {
//     display: flex;
//     justify-content: space-between;
//     padding: 50px 0;

//     .header-category {
//       display: flex;
//       padding: 0 30px;
//       gap: 10px;
//       font-size: 15px;
//       font-weight: 400;
//     }

//     .header-logo {
//       text-align: center;
//     }

//     .header-right {
//       display: flex;
//       padding: 0 30px;
//       gap: 10px;
//     }
//   }
// `;

export const HeaderStyled = styled.div`
  &.header-wrap {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 0;

    .header-category {
      display: flex;
      padding: 0 30px;
      gap: 10px;
      font-size: 15px;
      font-weight: 400;
    }

    .header-logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-weight: 900;
      font-size: 22px;
    }

    .header-right {
      display: flex;
      padding: 0 30px;
      gap: 10px;
    }
  }
`;
