import React from 'react';
import { Modal, Input, InputNumber, Form } from 'antd';

interface CustomerModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  currentCustomer: any;
  setName: (name: string) => void;
  name: string;
  sort: number | null;
  setSort: (sort: number | null) => void;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({ visible, onOk, onCancel, name, setName, sort, setSort }) => {
  return (
    <Modal
      title={name ? '顧客情報を編集' : '新しい顧客情報を追加'}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="顧客の名称">
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="新規顧客名" />
        </Form.Item>
        <Form.Item label="選択表示順">
          <InputNumber
            value={sort}
            onChange={value => setSort(typeof value === 'number' ? value : null)}
            placeholder="選択表示順"
            style={{ width: '40%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
