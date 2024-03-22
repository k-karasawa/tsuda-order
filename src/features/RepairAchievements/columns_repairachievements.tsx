export const columns = [
  {
    title: '品番 - 対応内容',
    dataIndex: 'item_code',
    key: 'item_code',
  },
  {
    title: '件数',
    dataIndex: 'count',
    key: 'count',
    render: (text: number, record: { children?: Array<{ key: string; item_code: string; count: number }>; total_count: number }) => {
      return record.children ? record.total_count : text;
    },
  },
];
