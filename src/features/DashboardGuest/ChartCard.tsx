import React from "react";
import { Card } from "antd";
import styles from "./styles/DashboardGuest.module.css";
import { PieCard } from './PieCard';
import dayjs from "dayjs";

interface ChartCardProps {
  orderData: any[];
  selectedDateRange: [dayjs.Dayjs, dayjs.Dayjs];
}

export const ChartCard: React.FC<ChartCardProps> = ({ orderData, selectedDateRange }) => {
  return (
    <div className={styles.cardscontainer}>
      <div className={styles.largecard}>
        <Card style={{ height: 360, width: "100%" }}>
          <p>案件消化率</p>
          <PieCard orderData={orderData} />
        </Card>
      </div>
    </div>
  );
};
