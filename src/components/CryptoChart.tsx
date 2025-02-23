

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CryptoChart: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  const getChartData = () => {
    return [
      { time: "2025-02-01", price: 45000 },
      { time: "2025-02-02", price: 46000 },
      { time: "2025-02-03", price: 47000 },
      { time: "2025-02-04", price: 48000 },
      { time: "2025-02-05", price: 49000 },
    ];
  };

  useEffect(() => {
    setChartData(getChartData()); 
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CryptoChart;
