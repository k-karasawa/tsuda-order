import React from 'react';
import { Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface RequestColumnProps {
  setCurrentRequest: React.Dispatch<React.SetStateAction<any>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteRequest: (id: number) => void;
}

export const RequestColumns = ({
  setCurrentRequest,
  setVisible,
  setName,
  setSort,
  handleDeleteRequest
}: RequestColumnProps) => {
  return [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '選択表示順',
      dataIndex: 'sort'
    },
    {
      title: '',
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => {
              setCurrentRequest(record);
              setVisible(true);
              setName(record.name);
              setSort(record.sort);
            }}
            style={{ marginRight: '40px' }}
          >
            <EditOutlined />
          </a>
          <Popconfirm
            title="このリクエスト情報を削除してもよろしいですか？"
            onConfirm={() => handleDeleteRequest(record.id)}
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
