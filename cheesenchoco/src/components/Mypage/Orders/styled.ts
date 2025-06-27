import styled from "styled-components";

export const OrdersStyled = styled.div`
  .title {
    margin-bottom: 20px;
  }

  .empty {
    text-align: center;
    padding: 40px 0;
    font-size: 16px;
    color: #777;
  }

  .order-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 40px;
    font-family: Arial, sans-serif;
  }

  /* 테이블 헤더 */
  .order-table thead th {
    border-top: 2px solid #444;
    border-bottom: 1px solid #ddd;
    padding: 12px;
    font-weight: bold;
    color: #444;
    text-align: center;
    background-color: #f9f9f9;
    font-size: 17px;
  }

  /* 주문일자 그룹 구분 행 */
  .order-date-row td.order-date {
    font-weight: bold;
    font-size: 16px;
    color: #333;
    padding: 10px 12px;
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    background-color: #fefefe;
  }

  .order-table tbody tr.order-date-row:not(:first-of-type) td.order-date {
    /* padding-top: 24px;
    padding-bottom: 10px; */
  }

  /* 상품 행 기본 */
  .order-table tbody tr {
    background-color: #fff;
    vertical-align: middle;
  }

  /* 상품 행 td 기본 스타일 */
  .order-table td {
    padding: 12px;
    text-align: left;
    border-top: none;
    border-bottom: none;
    border-left: none;
    border-right: none;
  }

  /* 상품 정보 셀 */
  .product-info {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
  }

  .product-info .product {
    display: flex;
    gap: 12px;
  }

  .product-info .product img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #eee;
  }

  .product-info .info {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .product-info .info .name {
    font-weight: bold;
    margin-bottom: 6px;
  }

  /* 주문번호 및 결제상태 셀 */
  .order-id,
  .status {
    width: 120px;
    text-align: center !important;
    vertical-align: middle;
    font-weight: bold;
    padding: 16px;
    font-size: 14px;
  }

  .status.done {
    color: #2e7d32;
  }

  .status.pending {
    color: #c62828;
  }

  /* 마지막 상품 행에만 border-bottom 추가 */
  .order-table tbody tr.last-product-row td {
    border-bottom: 1px solid #ddd;
  }

  /* rowSpan된 주문번호/결제상태 셀에도 border-bottom */
  .order-table td.last-product-cell {
    border-bottom: 1px solid #ddd;
  }
`;
