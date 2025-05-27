import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.header-wrap {
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 40px;

    &.scrolled {
      transform: translateY(-100px);
    }

    .white-header {
      background: transparent; // 헤더 배경 투명
      color: white; // 텍스트가 배너 위에서 보이도록
    }

    .black-header {
      color: black !important;
      background-color: wheat;
    }

    .category-list {
      li {
        list-style: none;
      }
    }

    .header-category,
    .header-logo,
    .header-right {
      display: flex;
      gap: 50px;
    }
  }
`;
