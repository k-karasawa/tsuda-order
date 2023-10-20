import React from "react";
import { OrderListContainer } from "@/containers/OrderListContainer";
import styles from './styles.module.css';

type OrderAssortingProps = {
  filterCondition: string;
};

export const OrderAssorting: React.FC<OrderAssortingProps> = ({ filterCondition }) => {
  return (
    <div className={styles.container}>
      <OrderListContainer filter={(order: any) => order.request_name === filterCondition} />
    </div>
  )
}
