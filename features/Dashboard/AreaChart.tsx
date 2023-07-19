import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  {
    "name": "1月",
    "uv": 4000,
    "pv": 2400,
    "amt": 3400,
    "nv": 1200
  },
  {
    "name": "2月",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210,
    "nv": 2600
  },
  {
    "name": "3月",
    "uv": 2000,
    "pv": 8800,
    "amt": 3400,
    "nv": 800
  },
  {
    "name": "4月",
    "uv": 3600,
    "pv": 3908,
    "amt": 2000,
    "nv": 2500
  },
  {
    "name": "5月",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181,
    "nv": 2350
  },
  {
    "name": "6月",
    "uv": 2390,
    "pv": 3800,
    "amt": 3500,
    "nv": 2200
  },
  {
    "name": "7月",
    "uv": 3490,
    "pv": 4300,
    "amt": 5100,
    "nv": 1300
  },
];

export const AreaChartPage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

	return (
		<AreaChart width={880} height={280} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.7}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.7}/>
        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ffc658" stopOpacity={0.7}/>
        <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorNv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ff85c0" stopOpacity={0.7}/>
        <stop offset="95%" stopColor="#ff85c0" stopOpacity={0}/>
          </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      <Area type="monotone" dataKey="amt" stroke="#ffc658" fillOpacity={1} fill="url(#colorAmt)" />
      <Area type="monotone" dataKey="nv" stroke="#ff85c0" fillOpacity={1} fill="url(#colorNv)" />
		</AreaChart>
	);
}
