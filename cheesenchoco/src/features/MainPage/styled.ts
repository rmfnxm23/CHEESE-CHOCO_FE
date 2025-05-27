import styled from "styled-components";

export const MainpageStyled = styled.div`
  &.main-wrap {
    width: 100%;

    .banners-wrap {
      position: relative;
    }

    .main-banners {
      width: 100vw;
      height: auto;
      overflow: hidden;

      .banner {
        width: 100vw;
        height: auto;
        object-fit: cover;
      }
    }

    .slick-dots {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 20px;
      position: absolute;
      left: 5%;
      bottom: 7%;
      z-index: 1000;
      color: #fff;
      font-weight: 500;
      font-size: 20px;
    }

    .slick {
      margin: 0 10px;
      list-style: none;
    }

    .main-shop-now {
      position: absolute;
      text-align: center;
      z-index: 3;
      bottom: 6%;
      left: 50%;
      transform: translate(-50%, 0);

      div {
        display: inline-block;
        font-size: 1.6vw;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 100%;
        padding: 1.1vw 2.3vw 0.7vw;
        animation: rotate_image3 3s linear infinite;
        transform-origin: 50% 50%;
      }
    }

    @keyframes rotate_image3 {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotateY(180deg);
      }
    }

    .product-grid {
      display: grid;
      /* grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); */
      grid-template-columns: repeat(4, 1fr);
      /* gap: 32px; */
      /* padding: 40px 20px; */
      justify-content: center;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .main-text {
      text-align: center;
      padding: 3.5vw 0 3.4vw;
      border-bottom: 1px solid #888;

      .text2 {
        font-weight: 400;
        font-size: 1.8vw;
        line-height: 1.2;
      }
    }

    .contact {
      width: 100%;
      /* overflow: hidden;  */
    }

    .contact img {
      width: 100%;
      height: auto; /* 비율 유지 */
      display: block; /* 하단 여백 제거 */
    }

    .rolling-text {
      text-align: center;
      overflow: hidden; // 텍스트 넘칠 때 숨김
      white-space: nowrap;
      width: 100%;
    }
    .rolling-text {
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      font-size: 2rem;
      position: relative;
    }

    .logo-text {
      display: inline-block;
      white-space: nowrap;
      animation: marquee 30s linear infinite;
      padding: 20px 0;

      span {
        padding: 0 20px;
      }
    }

    @keyframes marquee {
      from {
        transform: translateX(0%);
      }
      to {
        transform: translateX(-50%);
      }
    }
  }
`;
