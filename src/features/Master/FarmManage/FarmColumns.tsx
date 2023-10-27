import React from 'react';
import { Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface FarmColumnProps {
  setCurrentFarm: React.Dispatch<React.SetStateAction<any>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<number | null>>;
  setPrefix: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteFarm: (id: number) => void;
}

export const FarmColumns = ({
  setCurrentFarm,
  setVisible,
  setName,
  setSort,
  setPrefix,
  handleDeleteFarm
}: FarmColumnProps) => {
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
      title: '受注番号の先頭記号',
      dataIndex: 'prefix'
    },
    {
      title: '',
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => {
              setCurrentFarm(record);
              setVisible(true);
              setName(record.name);
              setSort(record.sort);
              setPrefix(record.prefix);
            }}
            style={{ marginRight: '40px' }}
          >
            <EditOutlined />
          </a>
          <Popconfirm
            title="この商社情報を削除してもよろしいですか？"
            onConfirm={() => handleDeleteFarm(record.id)}
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
