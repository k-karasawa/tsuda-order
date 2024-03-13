import { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { updateOrder } from '../orderService';
import { OrderListDataType } from '@/types/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useSupabaseClient } from "@/hooks";

dayjs.extend(utc);
dayjs.extend(timezone);

const PROGRESS_DESIRED_DELIVERY = 3;
const PROGRESS_ESTIMATE = 4;
const PROGRESS_VERIFICATION = 5;
const PROGRESS_ACCEPTANCE = 7;

const validateProgress = (progress: number, form: any) => {
  const values = form.getFieldsValue();

  switch (progress) {
    case PROGRESS_DESIRED_DELIVERY:
      if (!values.desired_delivery_date || !values.order_form_code) {
        message.error('希望納期 または 注文書Noが入っていません。');
        return false;
      }
      break;
    case PROGRESS_ESTIMATE:
      if (!values.estimate_code || !values.amount) {
        message.error('見積No, または 金額が入っていません。');
        return false;
      }
      break;
      case PROGRESS_VERIFICATION:
        if (!values.shipment_date) {
          message.error('検証中に移行するため、出荷日を登録してください。');
          return false;
        }
      break;
    case PROGRESS_ACCEPTANCE:
      if (!values.accept_date) {
        message.error('案件を完了させるため、検収日を登録してください。');
        return false;
      }
      break;
    default:
      // Handle other cases or do nothing
      break;
  }
  return true;
};

export const useOrderUpdater = (onClose: () => void, refetchOrderList: () => void, selectedOrder?: OrderListDataType) => {
  const [form] = Form.useForm();
  const [isAttention, setIsAttention] = useState(false);
  const [initialProgress, setInitialProgress] = useState<number | null>(null);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (selectedOrder) {
      setInitialProgress(selectedOrder.progress);
      form.setFieldsValue(selectedOrder);
      form.setFieldsValue({ attention: isAttention });
    }
  }, [selectedOrder, isAttention, form]);

  const handleUpdate = async () => {
    const values = form.getFieldsValue();
    if (!validateProgress(values.progress, form)) {
      return;
    }

    // 日付データをJSTに変換し、フォーマットする処理は、必要に応じてここに追加
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
    isAttention,
    setIsAttention,
    initialProgress,
    setInitialProgress,
    handleUpdate,
  };
};
