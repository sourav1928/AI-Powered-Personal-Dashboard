import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/chat",
        { message: input }
      );

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#007bff",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        💬
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            left: "20px",
            width: "300px",
            height: "400px",
            background: "white",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            Chat Assistant
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    background:
                      msg.sender === "user" ? "#007bff" : "#eee",
                    color:
                      msg.sender === "user" ? "white" : "black",
                    padding: "8px",
                    borderRadius: "8px",
                    display: "inline-block",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div>Typing...</div>}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, border: "none", padding: "10px" }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 15px",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
