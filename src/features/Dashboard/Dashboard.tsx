import React from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';
import styles from './styles/Dashboard.module.css';

export const Dashboard: React.FC = () => (
  <div className={styles.container}>
		<FilterCard />
		<StateCard />
		<ChartCard />
	</div>
);
