import { Card } from 'antd';
import React, { useState } from 'react';
import styles from './styles/Dashboard.module.css';
import dayjs from 'dayjs';

interface StateCardProps {
  data: {
    受注: string;
    売上: string;
    最優先: string;
    納期遅れ: string;
  };
  orderData: any[];
}

export const StateCard: React.FC<StateCardProps> = ({ data, orderData }) => {
  const [selectedProgress, setSelectedProgress] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const today = dayjs();

  const filteredData = orderData.filter((item: any) =>
    String(item.progress) === String(selectedProgress) && String(item.request) === String(selectedRequest)
  );

  const delayedOrders = filteredData.filter((item: any) =>
    dayjs(item.desired_delivery_date).isBefore(today) || dayjs(item.desired_delivery_date).isSame(today)
  );

  const highestPriorityOrders = filteredData.filter((item: any) => item.priority_level === '最優先');

  const orderCount = filteredData.length;
  const totalSales = filteredData.reduce((total: number, item: any) => total + (item.amount || 0), 0);
  const delayedOrderCount = delayedOrders.length;
  const highestPriorityCount = highestPriorityOrders.length;

  return (
    <div className={styles.cardscontainer}>
      <div className={styles.lowercards}>
        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p>受注</p>
            <span className={styles.bigText}>
              {orderCount}
              <span className={styles.smallText}>{data.受注.slice(-1)}</span>
            </span>
          </Card>
        </div>

        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p>売上</p>
            <span className={styles.bigText}>
              ¥{totalSales.toLocaleString()}
            </span>
          </Card>
        </div>

        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p>最優先</p>
            <span className={styles.bigText}>
              {highestPriorityCount}
              <span className={styles.smallText}>件</span>
            </span>
          </Card>
        </div>

        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p>納期遅れ</p>
            <span className={styles.bigText}>
              {delayedOrderCount}
              <span className={styles.smallText}>件</span>
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
