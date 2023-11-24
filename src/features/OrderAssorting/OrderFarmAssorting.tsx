import React, { useEffect } from "react";
import { OrderListContainer } from "@/containers/OrderListContainer";
import styles from './styles.module.css';
import { useRecoilState } from 'recoil';
import { XScrollState } from '@/recoil/atoms';

type OrderAssortingProps = {
  filterCondition: string;
};

export const OrderFarmAssorting: React.FC<OrderAssortingProps> = ({ filterCondition }) => {
  const [scrollX, setScrollX] = useRecoilState(XScrollState);

  useEffect(() => {
    setScrollX(2000);
  }, [setScrollX]);

  return (
    <div className={styles.container}>
      <OrderListContainer
        filter={(order: any) => order.farm_name === filterCondition}
        showDownloadButton={true}
        filterCondition={filterCondition}
      />
    </div>
  )
}
