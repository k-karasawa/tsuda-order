import React from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';

export const Dashboard: React.FC = () => (
	<>
		<FilterCard />
		<StateCard />
		<ChartCard />
	</>
);