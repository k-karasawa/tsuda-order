import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFilteredData } from '@/contexts/FilterdDataContext';
import { useChartData } from './hooks/useChartData';
import { COLORS } from './utils/colors';
import dayjs from "dayjs"

interface AreaChartPageProps {
  selectedDateRange: [dayjs.Dayjs, dayjs.Dayjs];
}

export const AreaChartPage: React.FC<AreaChartPageProps> = () => {
  const { filteredData, graphXAxisData } = useFilteredData();
  const chartData = useChartData(filteredData, graphXAxisData);

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        width={800}
        height={500}
        data={chartData}
        margin={{
          top: 4,
          right: 20,
          left: 30,
          bottom: 4,
        }}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {
          Object.keys(chartData.reduce((acc, cur) => {
            Object.keys(cur).forEach(key => {
              if (key !== 'month') acc[key] = 1;
            });
            return acc;
          }, {})).map((requestName, index) => (
            <Bar key={requestName} dataKey={requestName} stackId="a" fill={COLORS[index % COLORS.length]} />
          ))
        }
      </BarChart>
    </ResponsiveContainer>
  );
};
