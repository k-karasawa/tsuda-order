import React from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';

export const Dashboard: React.FC = () => (
	<div className='container'>
		<FilterCard />
		<StateCard />
		<ChartCard />
	</div>
);
