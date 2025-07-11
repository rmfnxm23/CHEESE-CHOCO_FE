import styled from "styled-components";

export const TipTapStyled = styled.div`
  .editor-content {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    line-height: 1.6;
    overflow-wrap: break-word;

    div {
      min-height: 480px;
      margin: 0.5em 0;
    }
  }

  /* 툴바 */
  .toolbar-btn {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
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

  .ProseMirror {
    // Tiptap 에디터의 입력창에 직접 높이를 지정해야함.
    min-height: 300px;
    outline: none;
    font-size: 16px;
    line-height: 1.6;
    max-height: 500px;
    overflow-y: auto;
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

  /* 커스텀 Heading 드롭다운 */
  .heading-dropdown {
    position: relative;
    user-select: none;
  }

  .heading-dropdown-button {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
    min-width: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }

  .heading-dropdown-list {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    z-index: 1000;
  }
`;
