import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderFarmAssorting } from "@/features/OrderAssorting/OrderFarmAssorting";

const OrderFarmT = () => {
  useRequireLogin();
  return (
    <OrderFarmAssorting filterCondition="Tリバース" />
  )
}

export default OrderFarmT;
