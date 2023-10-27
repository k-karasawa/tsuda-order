import React from 'react';
import { Modal, Input, InputNumber } from 'antd';

interface CustomerDepartmentModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  currentDepartment: any;
  setDepartment: (department: string) => void;
  setSort: (sort: number | null) => void;
  department: string;
  sort: number | null;
}

export const CustomerDepartmentModal: React.FC<CustomerDepartmentModalProps> = ({
  visible,
  onOk,
  onCancel,
  currentDepartment,
  setDepartment,
  setSort,
  department,
  sort
}) => {
  return (
    <Modal
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={currentDepartment ? '部署情報の編集' : '新しい部署の追加'}
    >
      <div style={{ marginBottom: '10px' }}>
        <label>部署名:</label>
        <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>表示順:</label>
        <div style={{ marginTop: '5px' }}>
          <InputNumber value={sort} onChange={value => setSort(value)} />
        </div>
      </div>
    </Modal>
  );
};
