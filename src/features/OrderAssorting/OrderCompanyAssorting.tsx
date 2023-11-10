import React, { useEffect } from "react";
import { OrderListContainer } from "@/containers/OrderListContainer";
import styles from './styles.module.css';
import { useRecoilState } from 'recoil';
import { XScrollState } from '@/recoil/atoms';
import { customColumnsForAssorting } from './AssortingColumns';

type OrderAssortingProps = {
  filterCondition: string;
};

export const OrderCompanyAssorting: React.FC<OrderAssortingProps> = ({ filterCondition }) => {
  const [scrollX, setScrollX] = useRecoilState(XScrollState);

  useEffect(() => {
    setScrollX(2000);
  }, [setScrollX]);

  return (
    <div className={styles.container}>
      <OrderListContainer filter={(order: any) => order.farm_name === filterCondition} customColumns={customColumnsForAssorting} />
    </div>
  )
}
