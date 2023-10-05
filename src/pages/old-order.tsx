import React from "react";
import { OldOrderList } from "@/features/OrderList/oldOrderList";
import { useRequireLogin } from "../components/Auth/useRequireLogin";

const OldOder = () => {
  useRequireLogin();
  return (
    <div>
      <OldOrderList />
    </div>
  );
};

export default OldOder;
