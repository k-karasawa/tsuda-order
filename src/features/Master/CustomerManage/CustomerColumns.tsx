import React from 'react';
import { Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface CustomerColumnProps {
  setCurrentCustomer: React.Dispatch<React.SetStateAction<any>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteCustomer: (id: number) => void;
}

export const CustomerColumns = ({
  setSort,
  setCurrentCustomer,
  setVisible,
  setName,
  handleDeleteCustomer
}: CustomerColumnProps) => {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      width: 200
    },
    {
      title: '選択表示順',
      dataIndex: 'sort',
      width: 200
    },
    {
      title: '',
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => {
              setCurrentCustomer(record);
              setVisible(true);
              setName(record.name);
              setSort(record.sort);
            }}
            style={{ marginRight: '40px' }}
          >
            <EditOutlined />
          </a>
          <Popconfirm
            title="この顧客情報を削除してもよろしいですか？"
            onConfirm={() => handleDeleteCustomer(record.id)}
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
