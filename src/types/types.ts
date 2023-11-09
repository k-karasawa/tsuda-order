import { Database } from '../types/database.types';
import { ColumnsType } from 'antd/es/table';

type BaseOrderListDataType = Database['public']['Tables']['order_list']['Row'];

type ExtendedAttributes = {
  fullOrderCode: string;
  progress_name?: string; // Add this line if 'progress_name' is an expected field
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
  color: string;
};

export type RequestType = {
  id: number;
  name: string;
  sort: number;
};

