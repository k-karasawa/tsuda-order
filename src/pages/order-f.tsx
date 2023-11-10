import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderFarmAssorting } from "@/features/OrderAssorting/OrderFarmAssorting";

const OrderFarmF = () => {
  useRequireLogin();
  return (
    <OrderFarmAssorting filterCondition="富士フイルム" />
  )
}

export default OrderFarmF;
