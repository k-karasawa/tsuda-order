import React from 'react';
import { Modal, Input, InputNumber, Select } from 'antd';

interface ProgressModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  currentProgress: any;
  setProgress: (progress: string) => void;
  setSort: (sort: number) => void;
  progress: string;
  sort: number | null;
  setColor: (color: string) => void;
  color: string;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({
  visible,
  onOk,
  onCancel,
  currentProgress,
  setProgress,
  setSort,
  progress,
  sort,
  setColor,
  color
}) => {
  const colorOptions = [
    'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'pink', 'gray'
  ];

  return (
    <Modal title={currentProgress ? '進捗情報の編集' : '進捗情報の追加'} visible={visible} onOk={onOk} onCancel={onCancel}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>進捗:</div>
        <Input value={progress} onChange={e => setProgress(e.target.value)} />
      </div>
      <div>
        <div style={{ marginBottom: '10px' }}>選択表示順:</div>
        <InputNumber value={sort} onChange={value => setSort(Number(value))} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>色:</div>
        <Select
          value={color}
          onChange={(value: string) => setColor(value)}
          style={{ width: '100%' }}
        >
          {colorOptions.map(option => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
};
