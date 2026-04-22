# 🚀 AI Text Assistant (Ollama Powered)

A **privacy-first AI Text Assistant** built using React and Node.js, powered by locally hosted LLMs via Ollama.
This application enables users to process and enhance text without relying on external AI APIs.

---

## ✨ Features

* 📝 Text Summarization
* ✍️ Writing Improvement
* 🌍 Translation
* 💻 Code Explanation
* 🎯 Tone Conversion (Casual / Professional)
* ⚡ Fast local inference using LLMs
* 🔒 Privacy-first (no external API dependency)

---

## 🧠 Use Cases

* Improve professional emails
* Summarize articles or notes
* Generate LinkedIn posts
* Translate content
* Explain code snippets
* Rewrite resume bullet points

---

## 🧱 Architecture

```text
Frontend (React)
      ↓
Backend (Node.js API)
      ↓
Ollama (Local LLM)
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* MUI

### Backend

* Node.js
* Express.js
* REST APIs

### AI Engine

* Ollama (Mistral / Phi / LLaMA models)

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ai-text-assistant.git
cd ai-text-assistant
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

---

### 3️⃣ Install Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

---

### 4️⃣ Pull Model

```bash
ollama pull mistral
```

---

### 5️⃣ Start Ollama Server

```bash
ollama serve
```

---

### 6️⃣ Run Backend

```bash
node index.js
```

---

### 7️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🌐 API Documentation

### Endpoint

```
POST /generate
```

### Request Body

```json
{
  "text": "Your input text",
  "type": "summarize | improve | translate | explain"
}
```

### Response

```json
{
  "result": "Processed AI output"
}
```

---

## 🔐 Notes

* Ollama runs locally on your machine
* Ensure the model is pulled before starting
* Backend communicates with Ollama via local API

---

## 🔥 Key Highlights

* Built a **full-stack AI application** using local LLMs
* Eliminated dependency on external APIs (cost-efficient)
* Demonstrates **AI + Backend integration**
* Designed with a focus on **privacy-first AI systems**

---

## 📌 Future Enhancements

* 📄 File upload (PDF/DOC analysis)
* 🔄 Streaming responses
* 🗂️ User authentication + history
* 🌙 Dark mode
* 🌐 Browser extension

---

## 🧠 Learning Outcomes

* Working with local LLMs (Ollama)
* Building AI-powered REST APIs
* Prompt engineering basics
* Handling structured AI responses

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📧 Contact

**Manorma Sharma**

* 🌐 Portfolio: https://manormasharma.github.io/Portfolio/
* 💼 LinkedIn: https://linkedin.com/in/manorma-sharma

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
