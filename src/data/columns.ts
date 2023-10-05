import type { ColumnsType } from 'antd/es/table';
import { OrderListDataType } from '../types/types';

export const columns: ColumnsType<OrderListDataType> = [
  {
    dataIndex: 'attention',
    fixed: 'left', width: 50,
    // onCell: () => ({ style: { background: '#f5f5f5' } }),
  },
  { title: 'ID', dataIndex: 'id',fixed: 'left', width: 50, },
  {
    title: '受注番号',
    dataIndex: 'order_code',
    width: 100,
    filterSearch: true
    //前方一致か、完全一致かどうしようか考える
    // onFilter: (value: any, record) => {
    //   if (typeof value === 'string') {
    //     return record.order_code.indexOf(value) === 0;
    //   }
    //   return false;
    // },
  },
  {
    title: '優先度',
    dataIndex: 'priority_level',
    width: 100,
    sorter: (a, b) => (a.estimate_date || '').localeCompare(b.estimate_date || ''),
  },
  {
    title: '進捗',
    dataIndex: 'progress_name',
    width: 100,
    filterSearch: true,
    sorter: (a, b) => (a.estimate_date || '').localeCompare(b.estimate_date || ''),
  },
  {
    title: '依頼内容',
    dataIndex: 'request_name',
    width: 100
  },
  {
    title: '顧客',
    dataIndex: 'customer_name',
    width: 100
  },
  {
    title: '拠点',
    dataIndex: 'customer_location',
    width: 100
  },
  {
    title: '部署',
    dataIndex: 'customer_department_name',
    width: 100
  },
  {
    title: 'グループ',
    dataIndex: 'customer_group',
    width: 100
  },
  {
    title: '担当者',
    dataIndex: 'customer_person',
    width: 100,
    filterSearch:true
  },
  {
    title: '商社',
    dataIndex: 'farm_name',
    width: 100
  },
  {
    title: '品番',
    dataIndex: 'item_code',
    width: 100,
    filterSearch: true
  },
  {
    title: '品名',
    dataIndex: 'item_name',
    width: 100,
    filterSearch: true
  },
  {
    title: 'ロット',
    dataIndex: 'lot',
    width: 100
  },
  {
    title: 'ソフトVer,',
    dataIndex: 'soft',
    width: 100
  },
  {
    title: '台数',
    dataIndex: 'quantity',
    width: 100
  },
  {
    title: '見積日',
    dataIndex: 'estimate_date',
    width: 120,
    sorter: (a, b) => (a.estimate_date || '').localeCompare(b.estimate_date || ''),
  },
  {
    title: '受注日',
    dataIndex: 'order_date',
    width: 120,
    sorter: (a, b) => (a.order_date || '').localeCompare(b.order_date || '')
  },
  {
    title: '希望納期',
    dataIndex: 'desired_delivery_date',
    width: 120,
    sorter: (a, b) => (a.desired_delivery_date || '').localeCompare(b.desired_delivery_date || '')
  },
  {
    title: '出荷日',
    dataIndex: 'shipment_date',
    width: 120,
    sorter: (a, b) => (a.shipment_date || '').localeCompare(b.shipment_date || '')
  },
  {
    title: '現品受領日',
    dataIndex: 'item_receive_date',
    width: 120,
    sorter: (a, b) => (a.item_receive_date || '').localeCompare(b.item_receive_date || '')
  },
  {
    title: '現品返却日',
    dataIndex: 'item_return_date',
    width: 120,
    sorter: (a, b) => (a.item_return_date || '').localeCompare(b.item_return_date || '')
  },
  {
    title: '資料送付日',
    dataIndex: 'send_document_date',
    width: 120,
    sorter: (a, b) => (a.send_document_date || '').localeCompare(b.send_document_date || '')
  },
  {
    title: '資料受領日',
    dataIndex: 'receive_document_date',
    width: 120,
    sorter: (a, b) => (a.receive_document_date || '').localeCompare(b.receive_document_date || '')
  },
  {
    title: '注文番号',
    dataIndex: 'customer_management_code',
    width: 100,
    filterSearch: true
  },
  {
    title: '検収日',
    dataIndex: 'accept_date',
    width: 120,
    sorter: (a, b) => (a.accept_date || '').localeCompare(b.accept_date || ''),
  },
  {
    title: '見積No,',
    dataIndex: 'estimate_code',
    width: 100,
    filterSearch: true
  },
  {
    title: '注文書No,',
    dataIndex: 'order_form_code',
    width: 120,
    filterSearch: true
  },
  { title: '金額', dataIndex: 'amount', width: 100 },
  {
    title: '備考',
    dataIndex: 'comment',
    width: 200,
    filterSearch: true
  },
  {
    title: '登録日',
    dataIndex: 'created_at',
    width: 120
  },
];
