import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.white-header {
    background: transparent; // 헤더 배경 투명
    color: white !important; // 텍스트가 배너 위에서 보이도록
  }

  &.header-wrap {
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;

    display: flex;
    /* justify-content: space-between; */
    justify-content: center;
    align-items: center;
    padding: 40px 40px;

    &.scrolled {
      transform: translateY(-100px);
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
    .header-right {
      display: flex;
      gap: 30px;
    }

    .header-category {
      position: fixed;
      left: 0;
      padding-left: 30px;
    }

    .header-logo {
      font-weight: bold;
      font-size: 24px;
      cursor: pointer;
    }

    .header-right {
      /* display: flex; */
      /* gap: 50px; */
      position: fixed;
      right: 0;
      padding-right: 30px;

      div {
        cursor: pointer;
      }
    }
  }

  /* Popover 내부 스타일 */
  .category-list {
    margin: 0;
    padding: 0.5rem;
    list-style: none;
  }

  .category-item {
    position: relative;
    padding: 0.3rem 0;
    cursor: pointer;
    transition: color 0.2s;
  }

  .category-item::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #000;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  .category-item:hover::after {
    transform: scaleX(1);
  }

  .custom-popover .ant-popover-inner {
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0;
  }

  .popover-trigger {
    cursor: pointer;
    position: relative;
  }
`;
