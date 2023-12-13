import dayjs from 'dayjs';

export const filterOrdersByDate = (orders: any[], start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  return orders.filter(order => {
    const orderDate = dayjs(order.order_date);
    return (orderDate.isAfter(start) || orderDate.isSame(start)) && (orderDate.isBefore(end) || orderDate.isSame(end));
  });
};

export const filterOrdersByAcceptDate = (orders: any[], start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  return orders.filter(order => {
    const orderDate = dayjs(order.accept_date);
    return (orderDate.isAfter(start) || orderDate.isSame(start)) && (orderDate.isBefore(end) || orderDate.isSame(end));
  });
};
