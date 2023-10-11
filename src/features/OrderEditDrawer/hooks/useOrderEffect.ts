import { useEffect } from 'react';

type SetDatesType = (dates: any) => void;

export const useOrderEffect = (selectedOrder: any, setIsAttention: (value: boolean) => void, setDates: SetDatesType) => {
  useEffect(() => {
    setIsAttention(!!selectedOrder?.attention);
    if (selectedOrder) {
      setDates({
        estimate_date: selectedOrder.estimate_date || null,
        order_date: selectedOrder.order_date || null,
        desired_delivery_date: selectedOrder.desired_delivery_date || null,
        shipment_date: selectedOrder.shipment_date || null,
        item_receive_date: selectedOrder.item_receive_date || null,
        item_return_date: selectedOrder.item_return_date || null,
        send_document_date: selectedOrder.send_document_date || null,
        receive_document_date: selectedOrder.receive_document_date || null,
        accept_date: selectedOrder.accept_date || null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrder]);
};
