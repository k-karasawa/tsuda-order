import React from "react";
import { AddOrderForm } from "../features/AddOrder/AddOrderForm";
import { useRequireLogin } from "../components/Auth/useRequireLogin";

const AddOrder = () => {
  useRequireLogin();
  return (
    <AddOrderForm />
  )
}

export default AddOrder;
