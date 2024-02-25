import dayjs from 'dayjs';

export const generateGraphXAxisData = (start: dayjs.Dayjs, end: dayjs.Dayjs): string[] => {
  let current = start.startOf('month');
  const endMonth = end.startOf('month');
  const xAxisData: string[] = [];

  while (current.isBefore(endMonth) || current.isSame(endMonth, 'month')) {
    xAxisData.push(current.format('YYYY-MM'));
    current = current.add(1, 'month');
  }

  return xAxisData;
};
