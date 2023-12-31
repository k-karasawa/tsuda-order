export type ReturnData = {
  return_date: string;
  reshipment_date: string | null;
  remark: string;
};

export type ExistingData = {
  id: number;
  return_date: string;
  reshipment_date: string;
  remark: string;
  return_orderlist_id: string | number;
};

export interface DatesType {
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

export interface ExistingDataListProps {
  data: ExistingData[];
  onAddNew: () => void;
  onClose?: () => void;
}

export interface SecondaryDrawerProps {
  visible: boolean;
  onClose: () => void;
  selectedOrder?: { id: number };
}

export interface ExistingDataListItemProps {
  data: ExistingData;
  isEditing: boolean;
  onEditChange: (key: keyof ExistingData, value: any) => void;
}
