# 🤖 OpenChatAI

A simple and elegant AI Chat Assistant built with FastAPI backend and clean HTML/CSS/JavaScript frontend, powered by Ollama language models.

## 🛠️ Tech Stack

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)

</div>

## ✨ Features

- 💬 **Interactive Chat Interface** - Responsive and visually appealing chat window
- 🎨 **Clean UI/UX** - Modern design with user and AI message bubbles
- 🦙 **Ollama Integration** - Connect to local Ollama server with various LLMs
- ⚡ **Real-time Responses** - Fast API communication with auto-scrolling
- ⌨️ **Keyboard Support** - Send messages with Enter key
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔄 **Multi-line Support** - Properly renders complex AI responses

## 🚀 Quick Start

### Prerequisites

- Python 3.7+
- [Ollama](https://ollama.com/) installed
- An Ollama model (e.g., `mistral`, `llama3`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Whoishugos/hugo-OpenChatAI.git
   cd hugo-OpenChatAI
   ```

2. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn requests
   ```

3. **Pull an Ollama model**
   ```bash
   ollama pull mistral
   # or
   ollama pull llama3
   ```

4. **Run the application**
   ```bash
   uvicorn main:app --reload
   ```

5. **Open your browser**
   Navigate to `http://127.0.0.1:8000`

## 📁 Project Structure

```
.
├── main.py           # FastAPI backend
├── static/
│   └── index.html    # Frontend (HTML, CSS, JS)
└── README.md         # Documentation
```

## ⚙️ Configuration

- **Change AI Model**: Edit `MODEL_NAME` in `main.py`
- **Customize UI**: Modify CSS variables in `index.html`
- **Ollama URL**: Update `OLLAMA_URL` if using different host/port

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to get response" | Ensure Ollama server is running |
| "Invalid JSON response" | Check model is fully downloaded |
| Frontend not loading | Verify `static/index.html` exists |

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
