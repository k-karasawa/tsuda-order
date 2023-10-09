import { Database } from '@/types/database.types';

export type OrderListDataType = Database['public']['Tables']['order_list']['Row'];

export interface OrderListPresentationProps {
  data: OrderListDataType[];
  refetchOrderList: () => void;
}
