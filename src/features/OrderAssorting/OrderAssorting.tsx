import React, { useEffect } from "react";
import { OrderListContainer } from "@/containers/OrderListContainer";
import styles from './styles.module.css';
import { columns } from '@/data/columns';
import { useRecoilState } from 'recoil';
import { XScrollState } from '@/recoil/atoms';


type OrderAssortingProps = {
  filterCondition: string;
};

const customColumnsForAssorting = [
  columns[0], //チェックボックス
  columns[2], //受注番号
  columns[3], //優先度
  columns[4], //進捗
  columns[5], //依頼内容
  columns[6], //顧客
  columns[7], //部署
  columns[8], //拠点
  columns[12], //品番
  columns[13], //品名
  columns[16], //台数
  columns[19], //希望納期
  columns[20], //出荷日
  columns[21], //現品受領日
  columns[22], //現品返却日
  columns[24], //資料受領日
  columns[30], //備考
];

export const OrderAssorting: React.FC<OrderAssortingProps> = ({ filterCondition }) => {
  const [scrollX, setScrollX] = useRecoilState(XScrollState);

  useEffect(() => {
    setScrollX(2000);
  }, [setScrollX]);

  return (
    <div className={styles.container}>
      <OrderListContainer filter={(order: any) => order.request_name === filterCondition} customColumns={customColumnsForAssorting} />
    </div>
  )
}
