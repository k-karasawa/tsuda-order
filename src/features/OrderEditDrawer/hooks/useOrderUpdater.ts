import { useState } from 'react';
import { Form, message } from 'antd';
import { updateOrder } from '../orderService';
import { OrderListDataType } from '@/types/types';
import { DatesType } from '../types/types';
import dayjs from 'dayjs';

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
      let newAcceptDate = dates.accept_date;
      let newShipmentDate = dates.shipment_date;
      let newSendDocumentDate = dates.send_document_date;
      let shipmentDateUpdated = false;
      let sendDocumentDateUpdated = false;

      if (values.progress === 7 && !newAcceptDate) {
        newAcceptDate = dayjs().format("YYYY-MM-DD");
        form.setFieldsValue({ accept_date: newAcceptDate });
        message.info("検収日に本日の日付を自動登録しました。");
      }

      if (values.progress === 5) {
        const today = dayjs().format("YYYY-MM-DD");
        if (!newShipmentDate) {
          newShipmentDate = today;
          form.setFieldsValue({ shipment_date: newShipmentDate });
          shipmentDateUpdated = true;
        }
        if (!newSendDocumentDate) {
          newSendDocumentDate = today;
          form.setFieldsValue({ send_document_date: newSendDocumentDate });
          sendDocumentDateUpdated = true;
        }
        if (shipmentDateUpdated && sendDocumentDateUpdated) {
          message.info("出荷日と資料送付日に本日の日付を自動登録しました。");
        } else if (shipmentDateUpdated) {
          message.info("出荷日に本日の日付を自動登録しました。");
        } else if (sendDocumentDateUpdated) {
          message.info("資料送付日に本日の日付を自動登録しました。");
        }
      }

      const mergedData = {
        ...values,
        estimate_date: dates.estimate_date,
        order_date: dates.order_date,
        desired_delivery_date: dates.desired_delivery_date,
        shipment_date: newShipmentDate,
        item_receive_date: dates.item_receive_date,
        item_return_date: dates.item_return_date,
        send_document_date: newSendDocumentDate,
        receive_document_date: dates.receive_document_date,
        accept_date: newAcceptDate,
        attention: isAttention,
      };

      if (selectedOrder && selectedOrder.id) {
        const { data, error } = await updateOrder(mergedData, selectedOrder.id);

        if (error) {
          message.error("注文の更新に失敗しました。");
        } else {
          message.success("注文が正常に更新されました。");
          onClose();
          refetchOrderList();
        }
      } else {
        message.error("注文が選択されていないか、IDが不足しています。");
      }
    } catch (err) {
      message.error("未知のエラーが発生しました。");
    }
  };

  form.setFieldsValue(selectedOrder);
  form.setFieldsValue(dates);
  form.setFieldsValue({ attention: isAttention });

  return {
    form,
    dates,
    isAttention,
    setDates,
    handleUpdate,
    setIsAttention,
  };
};
