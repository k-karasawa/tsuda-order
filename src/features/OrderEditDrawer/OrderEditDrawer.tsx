import React, { useState } from 'react';
import { Drawer } from 'antd';

interface OrderEditDrawerProps {
  children: (showDrawer: () => void) => React.ReactNode;
}

export const OrderEditDrawer: React.FC<OrderEditDrawerProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      {children(showDrawer)}
      <Drawer
        title="Edit Order"
        width={720}
        onClose={onClose}
        open={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {/* Drawer content goes here */}
      </Drawer>
    </>
  );
};
