import React from "react";
import { Card } from "antd";
import styles from "./styles/Dashboard.module.css";
import { AchievementCard } from "./AchievementCard";
import { AreaChartPage } from "./AreaChart";

export const ChartCard: React.FC = () => {
  return (
    <div className={styles.cardscontainer}>
      <div className={styles.lowercards2}>
        <div className={styles.statecardwrapper2}>
          <Card style={{ height: 360, width: '100%' }}>
            <p>売上高</p>
            <AreaChartPage />
          </Card>
        </div>
        
        <div className={styles.largecard}>
          <Card style={{ height: 360, width: "100%"}}>
            <p>目標達成率</p>
            <AchievementCard />
          </Card>
        </div>
      </div>
    </div>
  );
};