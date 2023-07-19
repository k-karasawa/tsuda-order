import { Card } from 'antd';
import React from 'react';
import styles from './styles/Dashboard.module.css'

export const StateCard: React.FC = () => (
	<div className={styles.cardscontainer}>
		<div className={styles.lowercards}>
			<div className={styles.statecardwrapper}>
				<Card style={{ height: 120 }}>
					<p>目標</p>
				</Card>
			</div>

			<div className={styles.statecardwrapper}>
				<Card style={{ height: 120}}>
					<p>売上</p>
				</Card>
			</div>

			<div className={styles.statecardwrapper}>
				<Card style={{ height: 120}}>
					<p>営業利益</p>
				</Card>
			</div>

			<div className={styles.statecardwrapper}>
				<Card style={{ height: 120 }}>
					<p>過不足</p>
				</Card>
			</div>
		</div>
	</div>	
);
