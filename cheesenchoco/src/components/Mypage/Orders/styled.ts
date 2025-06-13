import styled from "styled-components";

export const OrdersStyled = styled.div`
  .title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding: 0 0 0.75rem;
    border-bottom: 4px solid #aaa;
  }

  /* .table {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .thead,
  .row {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    font-size: 0.95rem;
  }

  .thead {
    background-color: #f6f6f6;
    font-weight: bold;
  }

  .row:hover {
    background-color: #fafafa;
  }

  .cell {
    display: flex;
    align-items: center;
  }

  .empty {
    padding: 2rem 0;
    text-align: center;
    color: #999;
  } */
  .table {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .thead,
  .row.order-info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-weight: bold;
    background-color: #f5f5f5;
    padding: 10px;
  }

  .row.product-row {
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px;
    background-color: #fafafa;
    border-bottom: 1px solid #eee;
  }

  .product-cell {
    flex: 1;
  }

  .cell.product-cell {
    grid-column: 1 / -1; /* grid 영역 전부 사용 */
  }

  .product {
    display: flex;
    gap: 16px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .empty {
    padding: 2rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    .thead {
      display: none;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1rem;
      border-bottom: 1px solid #eee;

      .cell {
        font-size: 0.95rem;

        &::before {
          content: attr(data-label);
          font-weight: bold;
          margin-right: 0.5rem;
          color: #555;
        }
      }
    }
  }
`;
