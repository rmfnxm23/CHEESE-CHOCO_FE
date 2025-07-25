import styled from "styled-components";

export const EditingStyled = styled.div`
  .writing-container {
    max-width: 1200px;
    margin: 50px auto;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    font-family: "Pretendard", sans-serif;
  }

  .writing-container h2 {
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
  select {
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
