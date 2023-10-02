import { Card, DatePicker, Select, Space } from 'antd';
import React, { useState } from 'react';
import styles from './styles/Dashboard.module.css'
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

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
        <Space>
          月選択：
            <RangePicker picker="month" />
          ステータス：
          <Select
            defaultValue="全て"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '見積提出', label: '見積提出' },
              { value: '受注済み', label: '受注済み' },
              { value: '検証中', label: '検証中' },
              { value: '失注', label: '失注' },
              { value: '完了', label: '完了' },
            ]}
          />
          依頼内容：
          <Select
            defaultValue="全体"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '修理', label: '修理' },
              { value: '複製', label: 'OH' },
              { value: 'その他', label: 'その他' },
            ]}
          />
        </Space>
        </Card>
      </div>
    </div>
  );
};