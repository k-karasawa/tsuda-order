import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderAssortingF } from "@/features/OrderAssorting/OrderAssortingF";

const OrderFarmF = () => {
  useRequireLogin();
  return (
    <OrderAssortingF filterCondition="富士フイルム" />
  )
}

export default OrderFarmF;
