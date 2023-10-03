import React from 'react';
import { StateCard } from './StateCard';
import { FilterCard } from './FilterCard';
import { ChartCard } from './ChartCard';
import SignOutButton from '../../components/SignOutButton';

export const Dashboard: React.FC = () => (
	<div className='container'>
		<FilterCard />
		<StateCard />
		<ChartCard />
    <SignOutButton />
	</div>
);
