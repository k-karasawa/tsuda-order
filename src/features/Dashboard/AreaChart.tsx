import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ResponsiveContainer } from 'recharts';

const data = [
  {
    "name": "1月",
    "Tリバース": 4000,
    "Sリバース": 2400,
    "Mリバース": 3400,
    "特機": 1200
  },
  {
    "name": "2月",
    "Tリバース": 3000,
    "Sリバース": 1398,
    "Mリバース": 2210,
    "特機": 2600
  },
  {
    "name": "3月",
    "Tリバース": 2000,
    "Sリバース": 8800,
    "Mリバース": 3400,
    "特機": 800
  },
  {
    "name": "4月",
    "Tリバース": 3600,
    "Sリバース": 3908,
    "Mリバース": 2000,
    "特機": 2500
  },
  {
    "name": "5月",
    "Tリバース": 1890,
    "Sリバース": 4800,
    "Mリバース": 2181,
    "特機": 2350
  },
  {
    "name": "6月",
    "Tリバース": 2390,
    "Sリバース": 3800,
    "Mリバース": 3500,
    "特機": 2200
  },
  {
    "name": "7月",
    "Tリバース": 3490,
    "Sリバース": 4300,
    "Mリバース": 5100,
    "特機": 1300
  },
];

export const AreaChartPage: React.FC<{ orderData: any[] }> = ({ orderData }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null; // or return a placeholder/loading state
  }

	return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart width={800} height={280} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
            <linearGradient id="colorTリバース" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSリバース" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMリバース" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="color特機" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff85c0" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#ff85c0" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="Tリバース" stroke="#8884d8" fillOpacity={1} fill="url(#colorTリバース)" />
        <Area type="monotone" dataKey="Sリバース" stroke="#82ca9d" fillOpacity={1} fill="url(#colorSリバース)" />
        <Area type="monotone" dataKey="Mリバース" stroke="#ffc658" fillOpacity={1} fill="url(#colorMリバース)" />
        <Area type="monotone" dataKey="特機" stroke="#ff85c0" fillOpacity={1} fill="url(#color特機)" />
      </AreaChart>
    </ResponsiveContainer>
	);
}
