import { useState } from 'react';
import { Form, message } from 'antd';
import { updateOrder } from '../orderService';
import { OrderListDataType } from '@/types/types';
import { useLookupTables } from '../lookupTables';

export const useOrderUpdater = (onClose: () => void, refetchOrderList: () => void, selectedOrder?: OrderListDataType) => {
  const [form] = Form.useForm();
  const [dates, setDates] = useState({
    estimate_date: selectedOrder?.estimate_date || null,
  });

  const [isAttention, setIsAttention] = useState(false);
  const { lookupTables } = useLookupTables();
  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      const progressId = lookupTables.progress[values.progress_name];
      const priorityId = lookupTables.priority[values.priority_level];
      const requestId = lookupTables.request[values.request_name];
      const customerId = lookupTables.customer[values.customer_name];
      const departmentId = lookupTables.customer_department[values.customer_department_name];
      const farmId = lookupTables.farm[values.farm_name];

      const mergedData = {
        ...values,
        progress: progressId,
        priority: priorityId,
        request: requestId,
        customer: customerId,
        customer_department: departmentId,
        farm: farmId,
        estimate_date: dates.estimate_date,
        attention: isAttention,
      };

      // 不要な名前のキーを削除
      const {
        progress_name,
        priority_level,
        request_name,
        customer_name,
        farm_name,
        customer_department_name,
        ...mergedDataWithoutNames
      } = mergedData;

      console.log('Merged Data without names:', mergedDataWithoutNames);

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

