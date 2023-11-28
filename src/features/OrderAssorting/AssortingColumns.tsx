import { columns } from '@/data/columns';
import { Typography } from 'antd';

const ellipsisRender = (text: string) => (
  <Typography.Text ellipsis={{ tooltip: true }}>{text}</Typography.Text>
);

export const customColumnsForAssorting = [
  columns[0], // チェックボックス
  {
    ...columns[2], // 受注番号
    width: 100
  },
  {
    ...columns[6], // 顧客
    render: ellipsisRender,
    width: 120
  },
  {
    ...columns[7], // 拠点
    windth: 80
  },
  {
    ...columns[12], // 品番
    render: ellipsisRender,
    width: 200
  },
  columns[4], // 進捗
  columns[19], // 希望納期
  {
    ...columns[30], // 金額
    render: (amount: number | null) => amount !== null ? amount.toLocaleString() : '-',
    align: 'right'
  },
  columns[3], // 優先度
  {
    ...columns[13], // 品名
    render: ellipsisRender
  },
  columns[8], // 部署
  columns[16], // 台数
  columns[20], // 出荷日
  columns[21], // 現品受領日
  columns[22], // 現品返却日
  columns[24], // 資料受領日
];


