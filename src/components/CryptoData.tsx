
import React, { useEffect, useState } from "react";
import axios from "axios";

import { io } from "socket.io-client";

const CryptoData: React.FC = () => {
  const [binanceData, setBinanceData] = useState<any[]>([]);
  const [bybitData, setBybitData] = useState<any[]>([]);
  const [kucoinData, setKucoinData] = useState<any[]>([]);
  const [mexcData, setMexcData] = useState<any[]>([]);

  const fetchBinanceData = async () => {
    try {
      const response = await axios.get("https://api.binance.com/api/v3/ticker/price");
      setBinanceData(response.data);
    } catch (error) {
      console.error("Error fetching Binance data", error);
    }
  };

  const fetchBybitData = async () => {
    try {
      const response = await axios.get("https://api.bybit.com/v2/public/tickers");
      setBybitData(response.data.result);
    } catch (error) {
      console.error("Error fetching Bybit data", error);
    }
  };

  const fetchKuCoinData = async () => {
    try {
      const response = await axios.get("https://api.kucoin.com/api/v1/market/allTickers");
      setKucoinData(response.data.data.ticker);
    } catch (error) {
      console.error("Error fetching KuCoin data", error);
    }
  };

  const fetchMexcData = async () => {
    try {
      const response = await axios.get("https://www.mexc.com/api/v2/market/ticker");
      setMexcData(response.data.data);
    } catch (error) {
      console.error("Error fetching MEXC data", error);
    }
  };

  useEffect(() => {
    fetchBinanceData();
    fetchBybitData();
    fetchKuCoinData();
    fetchMexcData();

    const socket = io("wss://stream.binance.com:9443/ws/!ticker@arr");

    socket.on("message", (data: any) => {
      const newData = JSON.parse(data);
    });

    return () => {
      socket.disconnect(); 
    };
  }, []);

  return (
    <div>
      <h1>Live Crypto Data</h1>
      <h2>Binance</h2>
      <pre>{JSON.stringify(binanceData, null, 2)}</pre>
      <h2>Bybit</h2>
      <pre>{JSON.stringify(bybitData, null, 2)}</pre>
      <h2>KuCoin</h2>
      <pre>{JSON.stringify(kucoinData, null, 2)}</pre>
      <h2>MEXC</h2>
      <pre>{JSON.stringify(mexcData, null, 2)}</pre>
    </div>
  );
};

export default CryptoData;
