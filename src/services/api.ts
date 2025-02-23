import axios from "axios";


const normalizeData = (data: any[], exchange: string, priceKey: string, symbolKey: string) => {
  return data.map((item) => ({
    exchange,
    symbol: item[symbolKey].replace(/[-_]/g, "").toUpperCase(), 
    price: parseFloat(item[priceKey]),
  }));
};


export const fetchBinanceSpot = async () => {
  try {
    const response = await axios.get("https://api.binance.com/api/v3/ticker/price");
    return normalizeData(response.data, "Binance", "price", "symbol");
  } catch (error) {
    console.error("Error fetching Binance data:", error);
    return [];
  }
};


export const fetchBybitSpot = async () => {
  try {
    const response = await axios.get("https://api.bybit.com/v2/public/tickers");
    return normalizeData(response.data.result, "ByBit", "last_price", "symbol");
  } catch (error) {
    console.error("Error fetching ByBit data:", error);
    return [];
  }
};


export const fetchKuCoinSpot = async () => {
  try {
    const response = await axios.get("https://api.kucoin.com/api/v1/market/allTickers");
    return normalizeData(response.data.data.ticker, "KuCoin", "last", "symbol");
  } catch (error) {
    console.error("Error fetching KuCoin data:", error);
    return [];
  }
};


export const fetchMexcSpot = async () => {
  try {
    const response = await axios.get("https://www.mexc.com/api/v2/market/ticker");
    return normalizeData(response.data.data, "MEXC", "p", "s");
  } catch (error) {
    console.error("Error fetching MEXC data:", error);
    return [];
  }
};


export const fetchAllSpotData = async () => {
  const [binance, bybit, kucoin, mexc] = await Promise.all([
    fetchBinanceSpot(),
    fetchBybitSpot(),
    fetchKuCoinSpot(),
    fetchMexcSpot(),
  ]);
  return [...binance, ...bybit, ...kucoin, ...mexc];
};
