import { Card } from 'antd';
import React from 'react';
import styles from './styles/Dashboard.module.css'
import { useRecoilValue } from 'recoil';
import { selectedProgressState, tableDataState } from '@/recoil/dashboard';
import { selectedRequestState } from '@/recoil/dashboard';

interface StateCardProps {
  data: {
    受注: string;
    売上: string;
    対応中: string;
    納期遅れ: string;
  };
}

export const StateCard: React.FC<StateCardProps> = ({ data }) => {
  const selectedProgress = useRecoilValue(selectedProgressState);
  const tableData = useRecoilValue(tableDataState);
  const selectedRequest = useRecoilValue(selectedRequestState);

  const filteredData = tableData.filter((item: any) =>
    String(item.progress) === String(selectedProgress) && String(item.request) === String(selectedRequest)
  );

  const orderCount = filteredData.length;

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
            <span className={styles.bigText}>{data.売上}</span>
          </Card>
        </div>

        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p>対応中</p>
            <span className={styles.bigText}>
              {data.対応中.slice(0, -1)}
              <span className={styles.smallText}>{data.対応中.slice(-1)}</span>
            </span>
          </Card>
        </div>

        <div className={styles.statecardwrapper}>
          <Card style={{ height: 120, position: 'relative' }}>
            <p>納期遅れ</p>
            <span className={styles.bigText}>
              {data.納期遅れ.slice(0, -1)}
              <span className={styles.smallText}>{data.納期遅れ.slice(-1)}</span>
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
