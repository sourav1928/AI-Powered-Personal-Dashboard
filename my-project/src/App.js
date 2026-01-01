import React, { useState, useEffect } from "react";
import "./App.css";
import ChatBot from "./components/ChatBot"; // Import chatbot

function App() {
  const [weather, setWeather] = useState(null);
  const [quote, setQuote] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [stock, setStock] = useState(null);

  // Fetch Weather
  useEffect(() => {
    const apiKey = "c4d6d9933e6b467aadb90721252008";
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Delhi&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.location) setWeather(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch Quote
  useEffect(() => {
    fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": "DSvJaeLe1Z+O0eyEmQQU+A==70DxKniZDwsgL6TY",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.length > 0)
          setQuote(`${data[0].quote} — ${data[0].author}`);
      })
      .catch((err) => console.error("Quote fetch error:", err));
  }, []);

  // Fetch Stock Data
  useEffect(() => {
    const stockApiKey = "d2iopahr01qhm15bflp0d2iopahr01qhm15bflpg";
    const symbol = "AAPL";
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${stockApiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.c) setStock({ symbol, ...data });
      })
      .catch((err) => console.error("Stock fetch error:", err));
  }, []);

  // Add Todo
  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>AI-Powered Personal Dashboard</h1>
        <p>Your daily dose of weather, motivation, stocks, and productivity</p>
      </header>

      <main>
        {/* Weather */}
        <div className="card">
          <h2>Weather</h2>
          {weather ? (
            <div>
              <p>
                {weather.location.name}: {weather.current.temp_c}°C,{" "}
                {weather.current.condition.text}
              </p>
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
              />
            </div>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>

        {/* Quote */}
        <div className="card">
          <h2>Quote of the Day</h2>
          <p>{quote || "Loading..."}</p>
        </div>

        {/* Stock */}
        <div className="card">
          <h2>Stock Tracker</h2>
          {stock ? (
            <div>
              <p>Symbol: {stock.symbol}</p>
              <p>Current Price: ${stock.c}</p>
              <p>High: ${stock.h}</p>
              <p>Low: ${stock.l}</p>
              <p>Open: ${stock.o}</p>
              <p>Previous Close: ${stock.pc}</p>
            </div>
          ) : (
            <p>Loading stock data...</p>
          )}
        </div>

        {/* To-do */}
        <div className="card">
          <h2>To-Do List</h2>
          <div className="todo-input">
            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a task..."
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ul>
            {todos.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </main>

      {/* Floating Chatbot Assistant */}
      <ChatBot />
    </div>
  );
}

export default App;
