const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ollama backend running");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: message,
        stream: false
      }
    );

    res.json({
      reply: response.data.response
    });
  } catch (error) {
    console.error("Ollama error:", error.message);
    res.status(500).json({ error: "Ollama request failed" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
