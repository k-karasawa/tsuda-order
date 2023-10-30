import React from 'react';
import { Drawer } from 'antd';

interface SecondaryDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export const SecondaryDrawer: React.FC<SecondaryDrawerProps> = ({ visible, onClose }) => {
  return (
    <Drawer
      title="出戻登録の詳細"
      width={600}
      onClose={onClose}
      visible={visible}
      destroyOnClose
    >
      {/* ここにドロワーの内容を追加します */}
      <div>ドロワーの内容</div>
    </Drawer>
  );
};
