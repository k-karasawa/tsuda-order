import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderAssorting } from "@/features/OrderAssorting/OrderAssorting";

const OrderOhPage = () => {
  useRequireLogin();
  return (
    <OrderAssorting filterCondition="OH" />
  )
}

export default OrderOhPage;
