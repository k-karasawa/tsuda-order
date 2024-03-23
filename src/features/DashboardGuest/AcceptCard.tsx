import { Card } from 'antd';
import React from 'react';
import styles from './styles/DashboardGuest.module.css';
import { Divider } from 'antd';

interface AcceptCardProps {
  orderData: any[];
  totalOrders: number;
}

export const AcceptCard: React.FC<AcceptCardProps> = ({ orderData, totalOrders }) => {

  const highestPriorityOrders = orderData.filter((item: any) => item.priority_level === '最優先');

  const totalSales = orderData.reduce((total: number, item: any) => total + (item.amount || 0), 0);
  const highestPriorityCount = highestPriorityOrders.length;

  return (
    <div className={styles.cardscontainer}>
      <Divider orientation="left" orientationMargin={4} >
        検収状況
      </Divider>
      <div className={styles.lowercards}>
        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p className={styles.cardTitle}>検収</p>
            <span className={styles.bigText}>
              {orderData.length}
              <span className={styles.smallText}>件</span>
            </span>
          </Card>
        </div>

        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p className={styles.cardTitle}>検収金額</p>
            <span className={styles.bigText}>
              ¥{totalSales.toLocaleString()}
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
