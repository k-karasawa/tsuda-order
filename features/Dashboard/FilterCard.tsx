import { Card, DatePicker } from 'antd';
import React, { useState } from 'react';
import styles from './styles/Dashboard.module.css'
import dayjs from 'dayjs';

export const FilterCard: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handleChange = (date: dayjs.Dayjs | null, dateString: string) => {
    console.log(`selected ${dateString}`);
    if (date) {
      setCurrentMonth(date);
    }
  }

  return (
    <div className={styles.cardscontainer}>
      <div className={`${styles.statecardwrapper} ${styles.fullwidthcard}`}>
        <Card className={styles.selectcontent} style={{ height: 60 }}>
          月選択：
          <DatePicker picker="month" onChange={handleChange} value={currentMonth} />
        </Card>
      </div>
    </div>
  );
};