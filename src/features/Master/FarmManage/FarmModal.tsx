import React from 'react';
import { Modal, Input, InputNumber, Form } from 'antd';

interface FarmModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  currentFarm: any;
  setName: (name: string) => void;
  setSort: (sort: number | null) => void;
  setPrefix: (prefix: string) => void;
  name: string;
  sort: number | null;
  prefix: string;
}

export const FarmModal: React.FC<FarmModalProps> = ({ visible, onOk, onCancel, name, sort, prefix, setName, setSort, setPrefix }) => {
  return (
    <Modal
      title={name ? '商社情報を編集' : '新しい商社情報を追加'}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form layout="vertical">
        <Form.Item label="商社の名称">
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="新規取引先名" />
        </Form.Item>
        <Form.Item label="選択表示順">
          <InputNumber
            value={sort}
            onChange={value => setSort(typeof value === 'number' ? value : null)}
            placeholder="選択表示順"
            style={{ width: '40%' }}
          />
        </Form.Item>
        <Form.Item label="受注番号の先頭記号">
          <Input value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="プレフィックス" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
