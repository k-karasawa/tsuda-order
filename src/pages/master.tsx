import React from "react";
import { MasterList } from "@/features/Master/MasterList";
import { useRequireLogin } from "../components/Auth/useRequireLogin";

const MasterPage = () => {
  useRequireLogin();

  return (
    <MasterList />
  );
};

export default MasterPage;
