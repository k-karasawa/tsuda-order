import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export const useChartData = (filteredData: unknown) => {
  const [chartData, setChartData] = useState<any[]>([]);
  useEffect(() => {
    if (typeof filteredData !== 'object' || filteredData === null) {
      return;
    }
    const dataByMonthAndRequest = (
        filteredData as Array<{ desired_delivery_date: string | number | dayjs.Dayjs | Date | null | undefined;
          request_name: any;
          amount: any; }>)
          .reduce((acc: { [x: string]: { [x: string]: any; month?: string }; }, cur) => {
      const month = dayjs(cur.desired_delivery_date).format('YYYY-MM');
      const requestName = cur.request_name;
      if (!acc[month]) {
        acc[month] = { month };
      }
      if (!acc[month][requestName]) {
        acc[month][requestName] = 0;
      }
      acc[month][requestName] += cur.amount;
      return acc;
    }, {});

    const sortedChartData = Object.values(dataByMonthAndRequest).sort((a, b) => dayjs(a.month).diff(dayjs(b.month)));
    setChartData(sortedChartData);
  }, [filteredData]);

  return chartData;
};
