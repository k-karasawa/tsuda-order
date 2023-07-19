import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { LabelProps } from './types/ChartTypes';

const SalesData = [
    { name: "見積中", value: 40 },
    { name: "完了", value: 30 },
    { name: "作業中", value: 30 },
    { name: "検証中", value: 30 },
];

export const PieCard: React.FC = () => {

  const RADIAN = Math.PI / 180;

  // 1. 全体の合計を計算します。
  const total = SalesData.reduce((acc, curr) => acc + curr.value, 0);
  
  // 1. 色の配列を定義します。
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    payload,
  }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const entry = payload;
    
    // 2. 各データポイントのパーセンテージを計算します。
    const percentage = Math.ceil((entry.value / total) * 100);
  
    return (
      <text
        x={x}
        y={y}
        fill="8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {entry.name} {`${percentage}%`}
      </text>
    );
  };

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
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={SalesData}
            cx="50%"
            cy="50%"
            outerRadius="90%"
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
            fillOpacity={0.8}
          >
            {
              SalesData.map((entry, index) => 
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              )
            }
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
