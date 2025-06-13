import styled from "styled-components";

export const DetailPageStyled = styled.div`
  padding: 40px;
  background-color: #f9f9f9;

  .detail-page-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    background: #fff;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 30px;

    h2 {
      font-size: 24px;
      font-weight: bold;
    }

    .meta-info-text {
      font-size: 14px;
      color: #777;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 10px;

      button {
        background-color: #0070f3;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background-color: #0059c1;
        }
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .image-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;

      .img-box {
        width: 100%;
        padding-top: 100%;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        border: 1px solid #ddd;

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .info-section {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      .info-item {
        flex: 1 1 calc(50% - 20px);

        span {
          font-weight: 600;
          font-size: 14px;
          color: #333;
        }

        p {
          margin-top: 6px;
          font-size: 16px;
        }

        .tag-list {
          margin-top: 6px;

          span {
            display: inline-block;
            background: #eee;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 13px;
            margin-right: 6px;
            margin-bottom: 6px;
          }
        }
      }
    }

    .description-wrapper {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #e1e1e1;
      border-radius: 8px;
      background-color: #fafafa;

      * {
        max-width: 100%;
        word-break: break-word;
      }

      img {
        max-width: 100%;
        height: auto;
        border-radius: 6px;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      h1,
      h2,
      h3 {
        margin-top: 20px;
        margin-bottom: 10px;
      }

      p {
        line-height: 1.6;
        margin-bottom: 10px;
      }
    }
  }
`;
