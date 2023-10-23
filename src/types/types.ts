import { Database } from '@/types/database.types';
import { ColumnsType } from 'antd/es/table';

type BaseOrderListDataType = Database['public']['Tables']['order_list']['Row'];

type ExtendedAttributes = {
  fullOrderCode: string;
};

export type OrderListDataType = BaseOrderListDataType & ExtendedAttributes;

export interface OrderListPresentationProps {
  data: OrderListDataType[];
  refetchOrderList: () => void;
  request_name?: string;
  columns?: ColumnsType<OrderListDataType>;
}

export type ProgressType = {
  id: number;
  progress: string;
};
