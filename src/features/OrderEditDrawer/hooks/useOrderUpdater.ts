import { useState } from 'react';
import { Form, message } from 'antd';
import { updateOrder } from '../orderService';
import { OrderListDataType } from '@/types/types';

interface DatesType {
  estimate_date: string | null;
  order_date: string | null;
  desired_delivery_date: string | null;
  shipment_date: string | null;
  item_receive_date: string | null;
  item_return_date: string | null;
  send_document_date: string | null;
  receive_document_date: string | null;
  accept_date: string | null;
}

export const useOrderUpdater = (onClose: () => void, refetchOrderList: () => void, selectedOrder?: OrderListDataType) => {
  const [form] = Form.useForm();
  const [dates, setDates] = useState<DatesType>({
    estimate_date: selectedOrder?.estimate_date || null,
    order_date: selectedOrder?.order_date || null,
    desired_delivery_date: selectedOrder?.desired_delivery_date || null,
    shipment_date: selectedOrder?.shipment_date || null,
    item_receive_date: selectedOrder?.item_receive_date || null,
    item_return_date: selectedOrder?.item_return_date || null,
    send_document_date: selectedOrder?.send_document_date || null,
    receive_document_date: selectedOrder?.receive_document_date || null,
    accept_date: selectedOrder?.accept_date || null,
  });

  const [isAttention, setIsAttention] = useState(false);
  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      const mergedData = {
        ...values,
        estimate_date: dates.estimate_date,
        order_date: dates.order_date,
        desired_delivery_date: dates.desired_delivery_date,
        shipment_date: dates.shipment_date,
        item_receive_date: dates.item_receive_date,
        item_return_date: dates.item_return_date,
        send_document_date: dates.send_document_date,
        receive_document_date: dates.receive_document_date,
        accept_date: dates.accept_date,
        attention: isAttention,
      };

    const {
      ...mergedDataWithoutNames
    } = mergedData;

      console.log("@@@@@@@:", mergedDataWithoutNames);

      if (selectedOrder && selectedOrder.id) {
        const { data, error } = await updateOrder(mergedDataWithoutNames, selectedOrder.id);

        if (error) {
          console.error("Error updating order:", error);
          message.error("注文の更新に失敗しました。");
        } else {
          console.log("Order updated successfully:", data);
          message.success("注文が正常に更新されました。");
          onClose();
          refetchOrderList();
        }
      } else {
        console.error("No selected order or order ID missing");
        message.error("注文が選択されていないか、IDが不足しています。");
      }
    } catch (err) {
      console.error("Unhandled error:", err);
      message.error("未知のエラーが発生しました。");
    }
  };

  return {
    form,
    dates,
    isAttention,
    setDates,
    handleUpdate,
    setIsAttention,
  };
};
