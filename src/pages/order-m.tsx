import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderFarmAssorting } from "@/features/OrderAssorting/OrderFarmAssorting";

const OrderFarmM = () => {
  useRequireLogin();
  return (
    <OrderFarmAssorting filterCondition="Mリバース" />
  )
}

export default OrderFarmM;
