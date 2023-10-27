import React from 'react';
import { Modal, Input } from 'antd';

interface CustomerModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  currentCustomer: any;
  setName: (name: string) => void;
  name: string;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({ visible, onOk, onCancel, name, setName }) => {
  return (
    <Modal
      title={name ? '顧客情報を編集' : '新しい顧客情報を追加'}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="新規で追加する顧客の名称を入力" />
    </Modal>
  );
};
