import styled from "styled-components";

export const WritingStyled = styled.div`
  .writing-container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    font-family: "Pretendard", sans-serif;
  }

  .writing-title {
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
  }

  .writing-container form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .writing-container input[type="text"],
  .writing-container input[type="file"],
  .writing-container select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  .writing-container input[type="file"] {
    padding: 8px;
  }

  /* ✅ select 옵션 dropdown 너비 통일 (브라우저 기본 설정 무시) */
  .writing-container select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
  }

  /* 드롭다운 옵션 스타일은 일부 브라우저에서 제한적이나,
     select 박스와 width 일치하도록 강제 설정 */
  .writing-container select option {
    width: 100%;
  }

  .writing-container button[type="submit"] {
    padding: 12px;
    background-color: #ccc;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .writing-container button[type="submit"]:hover {
    background-color: #aaa;
  }

  .writing-container p {
    color: red;
    font-size: 14px;
    text-align: center;
    margin-top: -8px;
  }

  .image-preview-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px 0;
    justify-content: flex-start;
  }

  .image-preview-wrapper img {
    max-width: 150px;
    aspect-ratio: 1/1;
    border-radius: 6px;
    border: 1px solid #eee;
  }
`;
