import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderAssorting } from "@/features/OrderAssorting/OrderAssorting";

const OrderDuplicatePage = () => {
  useRequireLogin();
  return (
    <OrderAssorting filterCondition="複製" />
  )
}

export default OrderDuplicatePage;
