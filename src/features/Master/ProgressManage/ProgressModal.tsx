import React from 'react';
import { Modal, Input, InputNumber, ColorPicker } from 'antd';

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

const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

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
        <ColorPicker
          value={color}
          showText
          onChange={(colorValue: any) => {
            const rgb = colorValue.metaColor;
            const rgbColor = rgbToHex(rgb.r, rgb.g, rgb.b);
            setColor(rgbColor);
          }}
        />
      </div>
    </Modal>
  );
};
