import React from 'react';
import { Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface CustomerDepartmentColumnProps {
  setCurrentDepartment: React.Dispatch<React.SetStateAction<any>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<number | null>>;
  handleDeleteDepartment: (id: number) => void;
}

export const CustomerDepartmentColumns = ({
  setCurrentDepartment,
  setVisible,
  setDepartment,
  setSort,
  handleDeleteDepartment
}: CustomerDepartmentColumnProps) => {
  return [
    {
      title: '部署名',
      dataIndex: 'department',
      width: 200
    },
    {
      title: '選択表示順',
      dataIndex: 'sort',
      width: 200
    },
    {
      title: '顧客名',
      dataIndex: 'customer',
      key: 'name',
      render: (customer: any) => customer?.name || '',
      width: 200
    },
    {
      title: '',
      render: (_: any, record: any) => (
        <>
          <a
            onClick={() => {
              setCurrentDepartment(record);
              setVisible(true);
              setDepartment(record.department);
              setSort(record.sort);
            }}
            style={{ marginRight: '40px' }}
          >
            <EditOutlined />
          </a>
          <Popconfirm
            title="この部署情報を削除してもよろしいですか？"
            onConfirm={() => handleDeleteDepartment(record.id)}
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
