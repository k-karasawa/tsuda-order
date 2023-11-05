import React from "react";
import { Card } from "antd";
import styles from "./styles/Dashboard.module.css";
import { AreaChartPage } from "./AreaChart";
import { PieCard } from './PieCard';
import dayjs from "dayjs";

interface ChartCardProps {
  orderData: any[];
  selectedDateRange: [dayjs.Dayjs, dayjs.Dayjs];
}

interface AreaChartPageProps {
  selectedDateRange: [dayjs.Dayjs, dayjs.Dayjs];
}

export const ChartCard: React.FC<ChartCardProps> = ({ orderData, selectedDateRange }) => {
  return (
    <div className={styles.cardscontainer}>
      <h2 className={styles.chartTitle}>全体状況（現在空白は除外）</h2>
      <div className={styles.lowercards2}>
        <div className={styles.statecardwrapper2}>
          <Card style={{ height: 360, width: '100%', paddingBottom: '14px' }}>
            <p style={{ margin: '5px 0' }}>売上高</p>
            <AreaChartPage selectedDateRange={selectedDateRange} />
          </Card>
        </div>

        <div className={styles.largecard}>
          <Card style={{ height: 360, width: "100%" }}>
            <p>案件消化率</p>
            <PieCard orderData={orderData} />
          </Card>
        </div>
      </div>
    </div>
  );
};
