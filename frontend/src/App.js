import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Typography, TextField, Box, Paper, CircularProgress, Alert, Select, MenuItem, IconButton, FormControl, InputLabel, Tooltip } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("summarize");
  const [tone, setTone] = useState("formal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const modeOptions = [
    { value: "summarize", label: "Summarize" },
    { value: "improve", label: "Improve writing" },
    { value: "translate", label: "Translate" },
    { value: "explain", label: "Explain like I'm 10" },
    { value: "convert_tone", label: "Convert tone" },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    setError("");
    setLoading(true);
    setMessages((msgs) => [
      ...msgs,
      { role: "user", content: input, mode, tone: mode === "convert_tone" ? tone : undefined }
    ]);
    try {
      const res = await axios.post("http://localhost:5000/generate", {
        text: input,
        type: mode,
        ...(mode === "convert_tone" ? { tone } : {}),
      });
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: res.data.result }
      ]);
      setInput("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{  display: "flex", flexDirection: "column",  }}>
      <Box sx={{ p: 1, borderBottom: 1, borderColor: "divider", background: "#f5f7fa", position: "sticky", top: 0, zIndex: 1 }}>
        <Typography variant="h5" align="center" fontWeight={700} gutterBottom>
          AI Text Assistant
        </Typography>
      </Box>
      <Box sx={{ height:'70vh', overflowY: "auto", p: 3, background: "#f9f9f9" }}>
        {messages.map((msg, idx) => (
          <Box key={idx} sx={{ display: "flex", mb: 2, flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}>
            <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
              {msg.role === "user" ? (
                <Tooltip title="You"><PersonIcon color="primary" /></Tooltip>
              ) : (
                <Tooltip title="Assistant"><SmartToyIcon color="secondary" /></Tooltip>
              )}
            </Box>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                maxWidth: "80%",
                background: msg.role === "user" ? "#e3f2fd" : "#fffde7",
                borderRadius: msg.role === "user"
                  ? "16px 16px 0 16px"
                  : "16px 16px 16px 0",
                wordBreak: "break-word",
                whiteSpace: "pre-line",
                fontSize: 16,
              }}
            >
              {msg.content}
              {msg.role === "user" && msg.mode && (
                <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#888" }}>
                  Mode: {modeOptions.find(m => m.value === msg.mode)?.label || msg.mode}
                  {msg.mode === "convert_tone" && msg.tone ? ` (${msg.tone})` : ""}
                </Typography>
              )}
            </Paper>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
            <CircularProgress size={24} color="secondary" />
          </Box>
        )}
        <div ref={chatEndRef} />
      </Box>
      {error && (
        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
      )}
      <Box sx={{position: 'fixed', width: 'stretch' ,bottom:0 ,p: 2, borderTop: 1, borderColor: "divider", background: "#fafafa", display: "flex", gap: 1, alignItems: "center" }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="mode-label">Mode</InputLabel>
          <Select
            labelId="mode-label"
            value={mode}
            label="Mode"
            onChange={e => setMode(e.target.value)}
          >
            {modeOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {mode === "convert_tone" && (
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel id="tone-label">Tone</InputLabel>
            <Select
              labelId="tone-label"
              value={tone}
              label="Tone"
              onChange={e => setTone(e.target.value)}
            >
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
            </Select>
          </FormControl>
        )}
        <TextField
          placeholder="Type your message..."
          multiline
          maxRows={4}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          fullWidth
          size="small"
          sx={{ background: "#fff" }}
          disabled={loading}
        />
        <IconButton color="primary" onClick={handleSend} disabled={loading || !input.trim()} sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default App;