import React, { useEffect } from "react";
import { OrderListContainer } from "@/containers/OrderListContainer";
import styles from './styles.module.css';
import { useRecoilState } from 'recoil';
import { XScrollState } from '@/recoil/atoms';
import { customColumnsForAssorting } from './AssortingColumns';

type OrderAssortingProps = {
  filterCondition: string;
};

export const OrderAssorting: React.FC<OrderAssortingProps> = ({ filterCondition }) => {
  const [scrollX, setScrollX] = useRecoilState(XScrollState);

  useEffect(() => {
    setScrollX(2000);
  }, [setScrollX]);

  //仕様変更により複製と複製可否調査を統合する、他はそのまま
  const filterFunction = (order: any) => {
    if (filterCondition === "複製") {
      return order.request_name === "複製" || order.request_name === "複製可否調査";
    } else {
      return order.request_name === filterCondition;
    }
  };

  return (
    <div className={styles.container}>
      <OrderListContainer
        filter={filterFunction}
        customColumns={customColumnsForAssorting}
        sortOrder="assorting"
      />
    </div>
  )
}
