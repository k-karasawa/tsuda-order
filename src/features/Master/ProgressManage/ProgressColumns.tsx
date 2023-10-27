import React from 'react';
import { Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface ProgressColumnProps {
  setCurrentProgress: React.Dispatch<React.SetStateAction<any>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteProgress: (id: number) => void;
}

export const ProgressColumns = ({
  setCurrentProgress,
  setVisible,
  setProgress,
  setSort,
  handleDeleteProgress
}: ProgressColumnProps) => {
  return [
    {
      title: '進捗',
      dataIndex: 'progress'
    },
    {
      title: '選択表示順',
      dataIndex: 'sort'
    },
    {
      title: '表示色',
      dataIndex: 'color',
      render: (color: string) => (
        <div style={{ width: '20px', height: '20px', backgroundColor: color }} />
      ),
    },
    {
      title: '',
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => {
              setCurrentProgress(record);
              setVisible(true);
              setProgress(record.progress);
              setSort(record.sort);
            }}
            style={{ marginRight: '40px' }}
          >
            <EditOutlined />
          </a>
          <Popconfirm
            title="この進捗情報を削除してもよろしいですか？"
            onConfirm={() => handleDeleteProgress(record.id)}
            okText="はい"
            cancelText="いいえ"
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </>
      )
    }
  ];
};
