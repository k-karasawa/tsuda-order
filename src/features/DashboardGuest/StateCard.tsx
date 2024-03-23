import { Card, Divider } from 'antd';
import React from 'react';
import styles from './styles/DashboardGuest.module.css';
import dayjs from 'dayjs';

interface StateCardProps {
  orderData: any[];
}

export const StateCard: React.FC<StateCardProps> = ({ orderData }) => {
  const today = dayjs();

  const delayedOrders = orderData.filter((item: any) =>
    (dayjs(item.desired_delivery_date).isBefore(today) || dayjs(item.desired_delivery_date).isSame(today)) &&
    item.progress_name !== '完了' &&
    item.progress_name !== '失注'
  );

  const highestPriorityOrders = orderData.filter((item: any) => item.priority_level === '最優先');

  const totalSales = orderData.reduce((total: number, item: any) => total + (item.amount || 0), 0);
  const delayedOrderCount = delayedOrders.length;
  const highestPriorityCount = highestPriorityOrders.length;

  return (
    <div className={styles.cardscontainer}>
      <Divider orientation="left" orientationMargin={4} >
        受注状況
      </Divider>
      <div className={styles.lowercards}>
        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p className={styles.cardTitle}>受注件数</p>
            <span className={styles.bigText}>
              {orderData.length}
              <span className={styles.smallText}>件</span>
            </span>
          </Card>
        </div>

        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p className={styles.cardTitle}>受注金額</p>
            <span className={styles.bigText}>
              ¥{totalSales.toLocaleString()}
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
