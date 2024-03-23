import dayjs from 'dayjs';

export const getStartEndOfMonth = (date: dayjs.Dayjs): [dayjs.Dayjs, dayjs.Dayjs] => {
  const startOfMonth = date.startOf('month');
  const endOfMonth = date.endOf('month');
  return [startOfMonth, endOfMonth];
};
