import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderAssorting } from "@/features/OrderAssorting/OrderAssorting";

const OrderOtherPage = () => {
  useRequireLogin();
  return (
    <OrderAssorting filterCondition="その他" />
  )
}

export default OrderOtherPage;
