import React from 'react';
import { Modal, Input, InputNumber } from 'antd';

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
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="新規で追加する商社の名称を入力" />
      <InputNumber value={sort} onChange={value => setSort(value)} placeholder="選択肢での表示順番を数字で指定（入力なしも可）" style={{ width: '100%', marginTop: '1rem' }} />
      <Input value={prefix} onChange={e => setPrefix(e.target.value)} placeholder="受注番号の先頭に付与される記号を指定" style={{ marginTop: '1rem' }} />
    </Modal>
  );
};
