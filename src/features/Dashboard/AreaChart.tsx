import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { supabase } from '../../../utils/supabase';

interface AreaChartPageProps {
  selectedDateRange: [dayjs.Dayjs, dayjs.Dayjs];
}

export const AreaChartPage: React.FC<AreaChartPageProps> = ({ selectedDateRange }) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('order_list_extended').select('*');

      if (error) {
        console.error('Error fetching data', error);
        return;
      }

      const completedRecords = data?.filter(record => record.progress_name === '完了');

      const groupedByOrderDate = data?.reduce((acc, curr) => {
        const month = dayjs(curr.order_date).format('YYYY-MM');
        acc[month] = (acc[month] || 0) + curr.amount;
        return acc;
      }, {});

      const groupedByAcceptDate = data?.reduce((acc, curr) => {
        const month = dayjs(curr.accept_date).format('YYYY-MM');
        acc[month] = (acc[month] || 0) + curr.amount;
        return acc;
      }, {});

      const salesByCompleted = completedRecords?.reduce((acc, curr) => {
        const month = dayjs(curr.order_date).format('YYYY-MM');
        acc[month] = (acc[month] || 0) + curr.amount;
        return acc;
      }, {});

      const monthsInRange: string[] = [];
      let currentMonth = selectedDateRange[0];
      while (currentMonth.isBefore(selectedDateRange[1]) || currentMonth.isSame(selectedDateRange[1], 'month')) {
        monthsInRange.push(currentMonth.format('YYYY-MM'));
        currentMonth = currentMonth.add(1, 'month');
      }

      const formattedData = monthsInRange.map(month => ({
        name: month,
        受注: groupedByOrderDate[month] || 0,
        検収: groupedByAcceptDate[month] || 0,
        売上: salesByCompleted[month] || 0,
      }));

      setChartData(formattedData);
    };

    fetchData();
  }, [selectedDateRange]);


  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart
        width={800}
        height={280}
        data={chartData}
        margin={{
          top: 4,
          right: 20,
          left: 30,
          bottom: 4,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="受注" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="売上" barSize={20} fill="#413ea0" />
        <Area type="monotone" dataKey="検収" fill="#ffc658" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
