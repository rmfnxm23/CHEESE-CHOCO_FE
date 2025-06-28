"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { OrdersStyled } from "./styled";
import clsx from "clsx";
import api from "@/lib/api";
import React from "react";

interface OrderProps {
  id: number;
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  productId: number;
  selectColor: string;
  selectSize: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    firstImage: string;
  };
}

const Orders = () => {
  const accessToken = Cookies.get("accessToken");
  const [orderList, setOrderList] = useState<OrderProps[]>([]);

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }

    const getOrderList = async () => {
      try {
        const response = await api.get("/payment/orderList", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        if (response.data.data) {
          setOrderList(response.data.data);
        } else alert("주문 내역이 없습니다.");
      } catch (err) {
        console.error("주문 내역 불러오는 중 오류 발생", err);
      }
    };

    getOrderList();
  }, []);

  return (
    <OrdersStyled className="orders-wrap">
      <h2 className="title">주문 내역 조회</h2>
      {orderList.length > 0 ? (
        <div className="orders-table-wrap">
          <table className="order-table">
            <thead>
              <tr>
                <th>상품정보</th>
                <th>주문번호</th>
                <th>결제상태</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <React.Fragment key={order.id}>
                  {/* 주문일자 행 */}
                  <tr className="order-date-row">
                    <td colSpan={3} className="order-date">
                      주문일자{" "}
                      {new Date(order.createdAt).toISOString().slice(0, 10)}
                    </td>
                  </tr>

                  {/* 상품 목록 */}
                  {order.items.map((item, index) => (
                    <tr
                      key={`${order.id}-${item.id}`}
                      className={clsx({
                        "last-product-row": index === order.items.length - 1,
                      })}
                    >
                      {/* 상품 정보 */}
                      <td className="product-info">
                        <div className="product">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${item.product.firstImage}`}
                            alt={item.product.name}
                          />
                          <div className="info">
                            <p className="name">{item.product.name}</p>
                            <p>
                              옵션: {item.selectColor} / {item.selectSize}
                            </p>
                            <p>수량: {item.quantity}</p>
                            <p>가격: {item.product.price.toLocaleString()}원</p>
                          </div>
                        </div>
                      </td>

                      {/* 주문번호/결제상태: 첫 행만 표시, 이후는 병합 */}
                      {index === 0 && (
                        <>
                          <td
                            className={clsx("order-id", {
                              "last-product-cell": order.items.length === 1,
                            })}
                            rowSpan={order.items.length}
                          >
                            {order.orderId}
                          </td>
                          <td
                            className={clsx("status", {
                              done: order.status === "DONE",
                              pending: order.status !== "DONE",
                              "last-product-cell": order.items.length === 1,
                            })}
                            rowSpan={order.items.length}
                          >
                            {order.status === "DONE"
                              ? "결제 완료"
                              : "결제 대기"}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty">주문 내역이 없습니다.</p>
      )}
    </OrdersStyled>
  );
};

export default Orders;
