import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderFarmAssorting } from "@/features/OrderAssorting/OrderFarmAssorting";

const OrderFarmTS = () => {
  useRequireLogin();
  return (
    <OrderFarmAssorting filterCondition="特機事業部" />
  )
}

export default OrderFarmTS;
