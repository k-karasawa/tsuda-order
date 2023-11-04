import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

export const PieCard: React.FC<{ orderData: any[] }> = ({ orderData }) => {
  const RADIAN = Math.PI / 180;
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A8368D", "#D15F80"];

  const generateSalesData = () => {
    const salesData = {
      受付: 0,
      検証中: 0,
      完了: 0,
      出戻り: 0,
      失注: 0,
      作業中: 0,
    };

    orderData.forEach((data) => {
      switch (data.progress_name) {
        case '受付':
        case '見積提出':
        case '仮見積':
          salesData.受付++;
          break;
        case '検証中':
          salesData.検証中++;
          break;
        case '完了':
          salesData.完了++;
          break;
        case '出戻り':
          salesData.出戻り++;
          break;
        case '失注':
          salesData.失注++;
          break;
        default:
          salesData.作業中++;
          break;
      }
    });

    return Object.entries(salesData).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const SalesData = generateSalesData();
  const total = SalesData.reduce((acc, curr) => acc + curr.value, 0);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="14"
      >
        {`${(percent * 100).toFixed(0)}%`}
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
      <PieChart margin={{ top: -30, right: 0, bottom: 0, left: 0 }}>
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
            fillOpacity={0.7}
          >
            {
              SalesData.map((entry, index) =>
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              )
            }
          </Pie>
          <Tooltip />
          <Legend align="center" verticalAlign="bottom" layout="horizontal" wrapperStyle={{ paddingBottom: '20px' }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
