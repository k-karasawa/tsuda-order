import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderAssorting } from "@/features/OrderAssorting/OrderAssorting";

const OrderSalePage = () => {
  useRequireLogin();
  return (
    <OrderAssorting filterCondition="販売" />
  )
}

export default OrderSalePage;
