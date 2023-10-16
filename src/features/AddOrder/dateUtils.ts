import dayjs from 'dayjs';

export const formatDate = (dateObj: dayjs.Dayjs | null): string | null => {
  if (dateObj && dayjs.isDayjs(dateObj)) {
      return dateObj.format('YYYY-MM-DD');
  }
  return dateObj;
};
