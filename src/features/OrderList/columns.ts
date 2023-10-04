import type { ColumnsType } from 'antd/es/table';
import { OrderListDataType } from './types';

export const columns: ColumnsType<OrderListDataType> = [
  { title: 'ID', dataIndex: 'id' },
  { title: '受注番号', dataIndex: 'order_code' },
  { title: '進捗', dataIndex: 'progress' },
  { title: '依頼内容', dataIndex: 'request' },
  { title: '顧客', dataIndex: 'customer' },
  { title: '拠点', dataIndex: 'customer_location' },
  { title: '部署', dataIndex: 'customer_department' },
  { title: 'グループ', dataIndex: 'customer_group' },
  { title: '担当者', dataIndex: 'customer_person' },
  { title: '品番', dataIndex: 'item_code' },
  { title: '品名', dataIndex: 'item_name' },
  { title: 'ロット', dataIndex: 'lot' },
  { title: 'ソフトVer,', dataIndex: 'soft' },
  { title: '台数', dataIndex: 'quantity' },
  {
    title: '見積日',
    dataIndex: 'estimate_date',
    sorter: (a, b) => (a.estimate_date || '').localeCompare(b.estimate_date || ''),
  },
  { title: '受注日', dataIndex: 'order_date' },
  { title: '希望納期', dataIndex: 'desired_delivery_date' },
  { title: '出荷日', dataIndex: 'shipment_date' },
  { title: '現品受領日', dataIndex: 'item_receive_date' },
  { title: '現品返却日', dataIndex: 'item_return_date' },
  { title: '資料送付日', dataIndex: 'send_document_date' },
  { title: '資料受領日', dataIndex: 'receive_document_date' },
  { title: '注文番号', dataIndex: 'customer_management_code' },
  {
    title: '検収日',
    dataIndex: 'accept_date',
    sorter: (a, b) => (a.accept_date || '').localeCompare(b.accept_date || ''),
  },
  { title: '見積No,', dataIndex: 'estimate_code' },
  { title: '注文書No,', dataIndex: 'order_form_code' },
  { title: '金額', dataIndex: 'amount' },
  { title: '備考', dataIndex: 'comment' },
  { title: '登録日', dataIndex: 'created_at' },
];

export default columns;
