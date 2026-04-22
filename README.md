# 🚀 AI Text Assistant (Ollama Powered)

A **privacy-first AI Text Assistant** built using React and Node.js, powered by locally hosted LLMs via Ollama.  
This application allows users to process text without relying on external AI APIs.

---

## ✨ Features

- 📝 Text Summarization  
- ✍️ Writing Improvement  
- 🌍 Translation  
- 💻 Code Explanation  
- 🎯 Tone Conversion (Casual / Professional)  
- ⚡ Fast responses using local LLM  
- 🔒 Privacy-first (no external API calls)

---

## 🧠 How It Works

```text
User Input → Node.js Backend → Ollama (Local LLM) → Response → Frontend UI


## Project Structure

- **backend/**: Node.js/Express backend server
- **frontend/**: React-based frontend application

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
	```bash
	git clone <repository-url>
	cd AI-Text-Assistant
	```

2. **Install backend dependencies:**
	```bash
	cd backend
	npm install
	```

3. **Install frontend dependencies:**
	```bash
	cd ../frontend
	npm install
	```

### Running the Application

#### Start the Backend
```bash
cd backend
npm start
```

#### Start the Frontend
```bash
cd frontend
npm start
```

The frontend will typically run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000) by default.

## License
MIT