// styled.ts
import styled from "styled-components";

export const FooterStyled = styled.footer`
  /* background-color: #f9f9f9; */
  border-top: 1px solid #eee;
  padding: 40px 20px;
  font-size: 14px;
  color: #444;
  text-align: center;

  .company-info {
    margin-bottom: 20px;
    line-height: 1.6;

    p {
      margin: 4px 0;
      font-size: 13px;
      color: #666;

      strong {
        font-weight: 600;
        color: #333;
        margin-right: 6px;
      }
    }
  }

  .links {
    margin-bottom: 16px;

    a {
      color: #666;
      margin: 0 8px;
      text-decoration: none;
      font-size: 13px;

      &:hover {
        color: #111;
        text-decoration: underline;
      }
    }

    span {
      color: #ccc;
      margin: 0 4px;
    }
  }

  .copyright {
    font-size: 12px;
    color: #999;
  }

  @media (max-width: 600px) {
    padding: 30px 15px;

    .links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }

    .company-info p {
      font-size: 12px;
    }
  }
`;
