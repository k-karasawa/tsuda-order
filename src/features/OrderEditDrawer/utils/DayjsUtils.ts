import dayjs from 'dayjs';

export const formatOrderDates = (selectedOrder: any) => {
  if (!selectedOrder) return undefined;

  return {
    ...selectedOrder,
    estimate_date: selectedOrder.estimate_date ? dayjs(selectedOrder.estimate_date) : undefined,
    order_date: selectedOrder.order_date ? dayjs(selectedOrder.order_date) : undefined,
    desired_delivery_date: selectedOrder.desired_delivery_date ? dayjs(selectedOrder.desired_delivery_date) : undefined,
    shipment_date: selectedOrder.shipment_date ? dayjs(selectedOrder.shipment_date) : undefined,
    item_receive_date: selectedOrder.item_receive_date ? dayjs(selectedOrder.item_receive_date) : undefined,
    item_return_date: selectedOrder.item_return_date ? dayjs(selectedOrder.item_return_date) : undefined,
    send_document_date: selectedOrder.send_document_date ? dayjs(selectedOrder.send_document_date) : undefined,
    receive_document_date: selectedOrder.receive_document_date ? dayjs(selectedOrder.receive_document_date) : undefined,
    accept_date: selectedOrder.accept_date ? dayjs(selectedOrder.accept_date) : undefined,
  };
};
