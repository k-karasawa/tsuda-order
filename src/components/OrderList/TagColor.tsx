import React from 'react';
import { Tag } from 'antd';

const ProgressColors: { [key: string]: string } = {
  '作業中': 'blue',
  'OH作業中': 'blue',
  '受注済': 'blue',
  '見積提出': 'blue',
  '検証中': 'purple',
  '失注': '#f5f5f5',
  '完了': 'green',
  '仮見積': 'orange',
};

interface ColorfulTagProps {
  text: string;
}

export const ColorfulTag: React.FC<ColorfulTagProps> = ({ text }) => {
  const color = ProgressColors[text] || 'gray';
  return <Tag color={color}>{text}</Tag>;
}
