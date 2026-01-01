import React, { useEffect, useState } from "react";
import axios from "axios";

const StockTracker = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "d2iopahr01qhm15bflp0d2iopahr01qhm15bflpg";
  const SYMBOL = "AAPL"; // Example: Apple Inc.

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${SYMBOL}&token=${API_KEY}`
        );
        setStockData(res.data);
      } catch (err) {
        setError("Failed to fetch stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) return <p>Loading stock data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ background: "#222", color: "#fff", padding: "10px", borderRadius: "8px" }}>
      <h3>{SYMBOL} Stock Tracker</h3>
      <p>Current Price: ${stockData.c}</p>
      <p>High: ${stockData.h}</p>
      <p>Low: ${stockData.l}</p>
      <p>Open: ${stockData.o}</p>
      <p>Previous Close: ${stockData.pc}</p>
    </div>
  );
};

export default StockTracker;
