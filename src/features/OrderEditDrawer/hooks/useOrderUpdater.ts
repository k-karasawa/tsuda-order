import { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { updateOrder } from '../orderService';
import { OrderListDataType } from '@/types/types';
import { DatesType } from '../types/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useSupabaseClient } from "@/hooks";

dayjs.extend(utc);
dayjs.extend(timezone);

const PROGRESS_DESIRED_DELIVERY = 3;
const PROGRESS_ESTIMATE = 4;
const PROGRESS_SHIPMENT = 5;
const PROGRESS_ACCEPTANCE = 7;

const updateDateIfEmpty = (currentDate: string | null, fieldName: string, form: any) => {
  if (!currentDate) {
    const today = dayjs().format('YYYY-MM-DD');
    form.setFieldsValue({ [fieldName]: today });
    message.info(`${fieldName}に本日の日付を自動登録しました。`);
    return today;
  }
  return currentDate;
};

const validateProgress = (progress: number, values: any, dates: DatesType, form: any) => {
  switch (progress) {
    case PROGRESS_DESIRED_DELIVERY:
      if (!dates.desired_delivery_date || !values.order_form_code) {
        message.error('希望納期 または 注文書Noが入っていません。');
        return false;
      }
      dates.order_date = updateDateIfEmpty(dates.order_date, '受注日', form);
      break;
    case PROGRESS_ESTIMATE:
      if (!values.estimate_code || !values.amount) {
        message.error('見積No, または 金額が入っていません。');
        return false;
      }
      dates.estimate_date = updateDateIfEmpty(dates.estimate_date, '見積日', form);
      break;
    case PROGRESS_SHIPMENT:
      dates.shipment_date = updateDateIfEmpty(dates.shipment_date, '出荷日', form);
      dates.send_document_date = updateDateIfEmpty(dates.send_document_date, '資料送付日', form);
      break;
    case PROGRESS_ACCEPTANCE:
      dates.accept_date = updateDateIfEmpty(dates.accept_date, '検収日', form);
      break;
    default:
      // Handle other cases or do nothing
      break;
  }
  return true;
};

export const useOrderUpdater = (onClose: () => void, refetchOrderList: () => void, selectedOrder?: OrderListDataType) => {
  const [form] = Form.useForm();
  const [dates, setDates] = useState<DatesType>({
    desired_delivery_date: null,
    estimate_date: null,
    shipment_date: null,
    send_document_date: null,
    accept_date: null,
    order_date: null,
    item_receive_date: null,
    item_return_date: null,
    receive_document_date: null,
  });
  const [isAttention, setIsAttention] = useState(false);
  const [initialProgress, setInitialProgress] = useState<number | null>(null);
  const supabaseClient = useSupabaseClient();


  useEffect(() => {
    if (selectedOrder) {
      setInitialProgress(selectedOrder.progress);
    }
  }, [selectedOrder]);

  useEffect(() => {
    if (selectedOrder) {
      form.setFieldsValue(selectedOrder);
      form.setFieldsValue(dates);
      form.setFieldsValue({ attention: isAttention });
    }
  }, [selectedOrder, dates, isAttention, form]);

  const handleUpdate = async () => {
    const values = form.getFieldsValue();
    if (!validateProgress(values.progress, values, dates, form)) {
      return;
    }

    // 日付データをJSTに変換し、フォーマットする
    const formatDate = (date: string | null) => date ? dayjs.utc(date).tz('Asia/Tokyo').format('YYYY-MM-DD') : null;
    values.estimate_date = formatDate(values.estimate_date);
    values.order_date = formatDate(values.order_date);
    values.desired_delivery_date = formatDate(values.desired_delivery_date);
    values.shipment_date = formatDate(values.shipment_date);
    values.item_receive_date = formatDate(values.item_receive_date);
    values.item_return_date = formatDate(values.item_return_date);
    values.send_document_date = formatDate(values.send_document_date);
    values.receive_document_date = formatDate(values.receive_document_date);
    values.accept_date = formatDate(values.accept_date);

    if (initialProgress !== values.progress) {
      values.status_updated_at = dayjs().tz('Asia/Tokyo').format('YYYY-MM-DD');
    }

    if (selectedOrder && selectedOrder.id) {
      const { data, error } = await updateOrder(supabaseClient, values, selectedOrder.id);
      if (error) {
        message.error('注文の更新に失敗しました。');
      } else {
        message.success('注文が正常に更新されました。');
        onClose();
        refetchOrderList();
      }
    } else {
      message.error('注文が選択されていないか、IDが不足しています。');
    }
  };

  return {
    form,
    dates,
    isAttention,
    setDates,
    handleUpdate,
    setIsAttention,
    initialProgress,
    setInitialProgress,
  };
};
