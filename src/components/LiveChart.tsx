import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement);

const LiveChart = () => {
  const [selectedType, setSelectedType] = useState("Spot"); // Dropdown selection
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Spot - Binance",
        data: [],
        fill: false,
        borderColor: "#0096FF",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#0096FF",
        borderWidth: 2,
        category: "Spot",
      },
      {
        label: "Future - Binance",
        data: [],
        fill: false,
        borderColor: "#FF007F",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF007F",
        borderWidth: 2,
        category: "Future",
      },
      {
        label: "Spot - MEXC",
        data: [],
        fill: false,
        borderColor: "#00CC99",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#00CC99",
        borderWidth: 2,
        category: "Spot",
      },
      {
        label: "Future - MEXC",
        data: [],
        fill: false,
        borderColor: "#FF4500",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF4500",
        borderWidth: 2,
        category: "Future",
      },
      {
        label: "Spot - ByBit",
        data: [],
        fill: false,
        borderColor: "#800080",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#800080",
        borderWidth: 2,
        category: "Spot",
      },
      {
        label: "Future - ByBit",
        data: [],
        fill: false,
        borderColor: "#FF1493",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF1493",
        borderWidth: 2,
        category: "Future",
      },
      {
        label: "Spot - KuCoin",
        data: [],
        fill: false,
        borderColor: "#FFD700",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FFD700",
        borderWidth: 2,
        category: "Spot",
      },
      {
        label: "Future - KuCoin",
        data: [],
        fill: false,
        borderColor: "#DC143C",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#DC143C",
        borderWidth: 2,
        category: "Future",
      },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      const timestamp = new Date().toLocaleTimeString();
      const newPrices = Array(8).fill(null).map(() => Math.random() * 1000 + 20000);
      
      setData((prevData: any) => {
        const updatedData = { ...prevData };
        updatedData.labels.push(timestamp);
        updatedData.datasets.forEach((dataset: { data: number[] }, index: number) => {
          dataset.data.push(newPrices[index]);
          if (dataset.data.length > 50) dataset.data.shift();
        });
        if (updatedData.labels.length > 50) updatedData.labels.shift();
        return updatedData;
      });
    };
    
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-center text-lg font-semibold mb-4">Live Spot & Future Data</h2>
      <div className="flex justify-center mb-4">
        <select
          className="p-2 border rounded-md"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="Spot">Spot</option>
          <option value="Future">Future</option>
        </select>
      </div>
      <Line
        data={{
          labels: data.labels,
          datasets: data.datasets.filter((dataset: any) => dataset.category === selectedType),
        }}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Binance, MEXC, ByBit, KuCoin - Spot vs. Futures",
              font: { size: 16 },
            },
            legend: {
              position: "bottom",
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Time" },
            },
            y: {
              title: { display: true, text: "Price ($)" },
              beginAtZero: false,
            },
          },
          elements: {
            point: {
              radius: 4,
              hoverRadius: 6,
            },
          },
        }}
      />
    </div>
  );
};

export default LiveChart;
