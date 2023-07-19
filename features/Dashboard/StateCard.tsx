import { Card } from 'antd';
import React from 'react';
import styles from './styles/Dashboard.module.css'

const data = {
    受注: "30 件",
    売上: "¥3,000,000",
    対応中: "20 件",
    納期遅れ: "5 件"
};

export const StateCard: React.FC = () => (
    <div className={styles.cardscontainer}>
        <div className={styles.lowercards}>
            <div className={styles.statecardwrapper}>
                <Card style={{ height: 120, position: 'relative' }}>
                    <p>受注</p>
                    <span className={styles.bigText}>
                        {data.受注.slice(0, -1)}
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

