import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderAssorting } from "@/features/OrderAssorting/OrderAssorting";

const OrderConstructionPage = () => {
  useRequireLogin();
  return (
    <OrderAssorting filterCondition="工事" />
  )
}

export default OrderConstructionPage;
