import React from 'react';
import dynamic from 'next/dynamic';

interface AchievementCardProps {
  totalOrders: number;
  acceptedOrders: number;
}

const DynamicLiquid = dynamic(() => import('@ant-design/plots').then((mod) => mod.Liquid), {
  ssr: false,
});

export const AchievementCard: React.FC<AchievementCardProps> = ({ totalOrders, acceptedOrders }) => {
  const percent = totalOrders ? acceptedOrders / totalOrders : 0;
  const config = {
    percent,
    outline: {
      border: 2,
      distance: 2,
    },
    wave: {
      length: 128,
    },
    statistic: {
      content: {
        style: {
          fontSize: '16px',
        },
      },
    },
  };

  return (
    <div style={{marginTop: '-13px', marginLeft: '110px'}}>
      <DynamicLiquid {...config} style={{ width: '100px', height: '100px' }} />
    </div>
  );
};
