import dayjs from 'dayjs';

export const filterOrdersByDate = (orders: any[], start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  return orders.filter(order => {
    const orderDate = dayjs(order.order_date);
    return orderDate.isAfter(start) && orderDate.isBefore(end);
  });
};
