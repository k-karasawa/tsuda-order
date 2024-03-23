import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { generateSalesData } from './helpers/generateSalesData';
import { renderCustomizedLabel } from './helpers/renderCustomizedLabel';

export const PieCard: React.FC<{ orderData: any[] }> = ({ orderData }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A8368D", "#D15F80"];

  const SalesData = generateSalesData(orderData);
  const total = SalesData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center'
    }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart margin={{ top: -30, right: 0, bottom: 0, left: 0 }}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={SalesData}
            cx="50%"
            cy="50%"
            outerRadius="70%"
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            fillOpacity={0.7}
          >
            {
              SalesData.map((entry, index) =>
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              )
            }
          </Pie>
          <Tooltip />
          <Legend align="center" verticalAlign="bottom" layout="horizontal" wrapperStyle={{ paddingBottom: '20px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
