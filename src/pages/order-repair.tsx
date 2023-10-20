import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderAssorting } from "@/features/OrderAssorting/OrderAssorting";

const OrderRepairPage = () => {
  useRequireLogin();
  return (
    <OrderAssorting filterCondition="修理" />
  )
}

export default OrderRepairPage;
