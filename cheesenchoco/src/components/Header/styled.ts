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

  /* 검색창 */
  .search-box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0; // 이거 추가!
    width: 100%;
    height: 33vh;
    background: rgba(255, 255, 255, 0.9);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    .input-group {
      position: relative;
      width: 80%;
      max-width: 500px;

      input {
        width: 100%;
        padding: 1rem 4rem 1rem 1rem; // 오른쪽에 버튼 들어갈 공간 확보
        font-size: 1rem;
        border: none;
        border-bottom: 1px solid gray;
        background: transparent;

        &:focus {
          outline: none;
        }
      }

      .search-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        color: #333;
      }
    }

    .close-btn {
      margin-top: 1rem;
      padding: 0.5rem 1.2rem;
      font-size: 1rem;
      background: white;
      border: 1px solid #ccc;
      cursor: pointer;
    }
  }
`;
