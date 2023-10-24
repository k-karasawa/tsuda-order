import React from "react";
import { useRequireLogin } from "../components/Auth/useRequireLogin";
import { OrderFarmAssorting } from "@/features/OrderAssorting/OrderFarmAssorting";

const OrderFarmS = () => {
  useRequireLogin();
  return (
    <OrderFarmAssorting filterCondition="Sリバース" />
  )
}

export default OrderFarmS;
