import styled from "styled-components";

export const TipTapStyled = styled.div`
  .editor-content {
    /* min-height: 490px; */
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    line-height: 1.6;
    overflow-wrap: break-word;

    div {
      min-height: 480px;
      /* min-height: 100%; */
      margin: 0.5em 0;
    }

    /* 툴바 */
    .toolbar-btn {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      background-color: #f5f5f5;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #ddd;
    }
    .toolbar-btn button {
      background-color: white;
      border: 1px solid #ccc;
      padding: 6px 8px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    .toolbar-btn button:hover {
      background-color: #e0e0e0;
    }
    /* .toolbar-btn button.active {
      border-color: #007bff;
      background-color: #e8f0fe;
      color: #007bff;
    } */

    .ProseMirror {
      // Tiptap 에디터의 입력창에 직접 높이를 지정해야함.
      min-height: 300px; // ✅ 입력창 높이 지정
      outline: none;
      font-size: 16px;
      line-height: 1.6;
      max-height: 500px; /* ✅ 고정 높이 */
      overflow-y: auto; /* ✅ 스크롤 처리 */
    }

    p {
      margin: 0 0 1em;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1em 0;
    }
  }
`;
