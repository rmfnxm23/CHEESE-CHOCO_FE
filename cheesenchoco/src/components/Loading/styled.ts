import styled from "styled-components";

export const LoadingStyle = styled.div`
  .Loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 9999;
  }
  .Loading-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .Loading-div {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid black;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  .Loading-text {
    font-size: 16px;
    padding-top: 15px;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
