import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

const COLORS = ['#b39171', '#e6c1a0', '#adb5d9', '#dfe7ff', '#fff4d1', '#505978', '#26304c'];

interface RequestBreakdownProps {
  data: Array<{ name: string; count: number }>;
}

export const RepairAchievementsChart: React.FC<RequestBreakdownProps> = ({ data }) => {
  return (
    <div>
      <p style={{ textAlign: 'center' }}>対応割合</p>
      <PieChart width={440} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="48%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="count"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
        </PieChart>
    </div>
  );
};
