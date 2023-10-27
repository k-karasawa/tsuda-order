import React from 'react';
import { Tag } from 'antd';
import { useProgress } from '@/hooks/useProgress';

interface ColorfulTagProps {
  text: string;
}

export const ColorfulTag: React.FC<ColorfulTagProps> = ({ text }) => {
  const { data: progresses } = useProgress();

  const matchingProgress = progresses?.find(p => p.progress === text);
  const color = matchingProgress ? matchingProgress.color : 'gray';

  return <Tag color={color}>{text}</Tag>;
}
