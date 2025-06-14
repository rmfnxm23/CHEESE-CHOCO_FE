"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { OrdersStyled } from "./styled";
import clsx from "clsx";
import api from "@/lib/api";

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
    const getOrderList = async () => {
      try {
        const response = await api.get("/payment/orderList", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        console.log(response.data.data);
        if (response.data.data) {
          setOrderList(response.data.data);
        } else alert("주문 내역이 없습니다.");
      } catch (err) {
        console.error(err);
      }
    };

    getOrderList();
  }, []);

  return (
    <OrdersStyled className={clsx("orders-wrap")}>
      <h2 className="title">주문 내역 조회</h2>
      {orderList.length > 0 ? (
        // <div className="table">
        //   <div className="thead">
        //     <div>주문번호</div>
        //     <div>주문일자</div>
        //     <div>결제상태</div>
        //   </div>
        //   {/* <div className="tbody">
        //     {orderList.map((order) => (
        //       <div key={order.id} className="row">
        //         <div className="cell">{order.orderId}</div>
        //         <div className="cell">
        //           {new Date(order.createdAt).toLocaleDateString()}
        //         </div>
        //         <div className="cell">
        //           {order.status === "DONE" ? "결제 완료" : "결제 대기"}
        //         </div>
        //       </div>
        //     ))}
        //   </div> */}
        //   <div className="tbody">
        //     {orderList.map((order) => (
        //       <div key={order.id} className="row">
        //         <div className="cell">
        //           <div>{order.orderId}</div>
        //           {/* 상품 목록 출력 */}
        //           <ul>
        //             {/* {order.items?.map((item: any) => (
        //               <li key={item.id}>
        //                 {item.product?.name} / {item.selectColor} /{" "}
        //                 {item.selectSize}
        //               </li>
        //             ))} */}
        //             {order.items.map((item) => (
        //               <div key={item.id} className="product">
        //                 <img
        //                   src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${item.product.firstImage}`}
        //                   alt={item.product.name}
        //                   width={80}
        //                 />
        //                 <div className="info">
        //                   <p>{item.product.name}</p>
        //                   <p>
        //                     옵션: {item.selectColor} / {item.selectSize}
        //                   </p>
        //                   <p>가격: {item.product.price.toLocaleString()}원</p>
        //                   <p>수량: {item.quantity}</p>
        //                 </div>
        //               </div>
        //             ))}
        //           </ul>
        //         </div>
        //         <div className="cell">
        //           {new Date(order.createdAt).toLocaleDateString()}
        //         </div>
        //         <div className="cell">
        //           {order.status === "DONE" ? "결제 완료" : "결제 대기"}
        //         </div>
        //       </div>
        //     ))}
        //   </div>
        // </div>
        <div className="table">
          <div className="thead">
            <div>주문번호</div>
            <div>주문일자</div>
            <div>결제상태</div>
          </div>

          <div className="tbody">
            {orderList.map((order) => (
              <div key={order.id} className="order-block">
                {/* 주문 요약 정보 */}
                <div className="row order-info">
                  <div className="cell">{order.orderId}</div>
                  <div className="cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="cell">
                    {order.status === "DONE" ? "결제 완료" : "결제 대기"}
                  </div>
                </div>

                {/* 주문 상품 목록 */}
                {order.items.map((item) => (
                  <div key={item.id} className="row product-row">
                    <div className="cell product-cell">
                      <div className="product">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/product/${item.product.firstImage}`}
                          alt={item.product.name}
                          width={80}
                        />
                        <div className="info">
                          <p>{item.product.name}</p>
                          <p>
                            옵션: {item.selectColor} / {item.selectSize}
                          </p>
                          <p>가격: {item.product.price.toLocaleString()}원</p>
                          <p>수량: {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="empty">주문 내역이 없습니다.</p>
      )}
    </OrdersStyled>
  );
};

export default Orders;
