import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/generate", (req, res) => {
  res.send("Use POST request instead of GET");
});
app.post("/generate", async (req, res) => {
  try {
    const { text, type, tone } = req.body;

    // validation
    if (!text || !type) {
      return res.status(400).json({
        error: "text and type are required",
      });
    }

    // prompt map
    const promptMap = {
      summarize: `Summarize this text:\n${text}`,
      improve: `Improve this text professionally:\n${text}`,
      translate: `Translate this text to English:\n${text}`,
      explain: `Explain this in simple terms:\n${text}`,
      convert_tone: tone === "casual"
        ? `Rewrite the following text in a casual tone:\n${text}`
        : `Rewrite the following text in a formal tone:\n${text}`,
    };

    const prompt = promptMap[type];

    if (!prompt) {
      return res.status(400).json({
        error: "Invalid type",
      });
    }
    const ollamaResponse = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt,
        stream: false
      }
    );

    const output = ollamaResponse.data.response || "No response generated";
    return res.json({
      success: true,
      result: output,
    });

  } catch (err) {
    console.error("OpenAI failed:", err.code);

    // ✅ better fallback (based on type)
    const fallbackMap = {
      summarize: "📄 Summary feature working (mock response)",
      improve: "✨ Improved version ready (mock response)",
      translate: "🌍 Translation ready (mock response)",
      explain: "🧠 Explanation ready (mock response)",
      convert_tone: tone === "casual"
        ? "😎 Casual tone conversion (mock response)"
        : "🏛️ Formal tone conversion (mock response)",
    };

    return res.json({
      success: false,
      result:
        fallbackMap[req.body.type] ||
        "⚠️ AI unavailable (quota issue), but backend is working 🚀",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});