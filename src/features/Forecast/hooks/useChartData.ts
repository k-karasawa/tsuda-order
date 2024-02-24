import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

interface ChartData {
  [key: string]: any;
}

export const useChartData = (filteredData: any[], graphXAxisData: string[]) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (!Array.isArray(filteredData) || graphXAxisData.length === 0) {
      return;
    }

    const initialDataByMonth: ChartData = graphXAxisData.reduce((acc: ChartData, month) => {
      acc[month] = { month };
      return acc;
    }, {});

    filteredData.forEach(item => {
      const month = dayjs(item.desired_delivery_date).format('YYYY-MM');
      const requestName = item.request_name;
      const amount = item.amount;

      if (!initialDataByMonth[month]) {
        initialDataByMonth[month] = { month };
      }

      if (!initialDataByMonth[month][requestName]) {
        initialDataByMonth[month][requestName] = 0;
      }

      initialDataByMonth[month][requestName] += amount;
    });

    const sortedChartData = Object.values(initialDataByMonth).sort((a: ChartData, b: ChartData) => {
      const dateA = dayjs(a.month);
      const dateB = dayjs(b.month);
      return dateA.diff(dateB);
    });

    setChartData(sortedChartData);
  }, [filteredData, graphXAxisData]);

  return chartData;
};
