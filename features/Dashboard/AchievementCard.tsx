import React from 'react';
import dynamic from 'next/dynamic';

interface DemoLiquidProps {}

const DynamicLiquid = dynamic(() => import('@ant-design/plots').then((mod) => mod.Liquid), {
  ssr: false,
});

export const AchievementCard: React.FC<DemoLiquidProps> = () => {
  const config = {
    percent: 0.4,
    statistic: {
      content: {
        style: {
          fontSize: '24px',
          fontWeight: '250' , //'bold'、'bolder'、'lighter'、'100'-'900'とか
        }
      }
    },
    shape: (x: number, y: number, width: number, height: number) => {
      const path: any[] = [];
      const w = Math.min(width, height);

      for (let i = 0; i < 5; i++) {
        path.push([
          i === 0 ? 'M' : 'L',
          (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
          (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
        ]);
        path.push([
          'L',
          (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
          (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
        ]);
      }

      path.push(['Z']);
      return path;
    },
    outline: {
      border: 2,
      distance: 4,
      style: {
        stroke: '#5d2e8c',
        strokeOpacity: 0.65,
        opacity: 0.5,
      },
    },
    wave: {
      length: 128,
    },
    theme: {
      styleSheet: {
        brandColor: '#a15ce6',
      },
    },
  };

	return (
  <div style={{marginTop: '-55px'}}>
    <DynamicLiquid {...config} />;
	</div>
	);
};
