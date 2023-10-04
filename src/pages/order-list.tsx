import React from "react";
import { OrderIndex } from "../features/OrderList/OrderIndex";
import { useRequireLogin } from "../components/Auth/useRequireLogin";

const OrderList = () => {
  useRequireLogin();
  return (
    <div>
      <OrderIndex />
    </div>
  )
}

export default OrderList;
