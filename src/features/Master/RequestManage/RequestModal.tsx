import React from 'react';
import { Modal, Input, InputNumber } from 'antd';

interface RequestModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  currentRequest: any;
  setName: (name: string) => void;
  setSort: (sort: number | null) => void;
  name: string;
  sort: number | null;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  visible,
  onOk,
  onCancel,
  currentRequest,
  setName,
  setSort,
  name,
  sort
}) => {
  return (
    <Modal
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      title={currentRequest ? 'リクエスト情報の編集' : '新しいリクエストの追加'}
    >
      <div style={{ marginBottom: '10px' }}>
        <label>名称:</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '5px' }}>選択表示順:</label>
        <InputNumber value={sort} onChange={(value) => setSort(value)} />
      </div>
    </Modal>
  );
};
