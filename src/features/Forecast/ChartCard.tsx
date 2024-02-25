import React from "react";
import { Card, Divider } from "antd";
import styles from "./styles/Dashboard.module.css";
import { AreaChartPage } from "./AreaChart";
import dayjs from "dayjs";

interface ChartCardProps {
  orderData: any[];
  selectedDateRange: [dayjs.Dayjs, dayjs.Dayjs];
}

export const ChartCard: React.FC<ChartCardProps> = ({ selectedDateRange }) => {
  return (
    <div className={styles.cardscontainer}>
      <Divider orientation="left" orientationMargin={4} >
        検収予測
      </Divider>
      <div className={styles.lowercards2}>
        <div className={styles.statecardwrapper2}>
          <Card style={{ height: 460, width: '100%', paddingBottom: '14px' }}>
            <p style={{ margin: '5px 0' }}>月別検収予測</p>
            <AreaChartPage selectedDateRange={selectedDateRange} />
          </Card>
        </div>
      </div>
    </div>
  );
};
