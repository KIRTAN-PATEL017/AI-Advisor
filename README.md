# 🧠 AI Career Advisor

An AI-powered web app that analyzes a user's resume (PDF or text input) and intelligently guesses their current occupation or role. Built to explore real-world AI integration.

---

## 🚀 Features

- 📄 Upload a resume (PDF) or paste resume text
- 🔍 AI analyzes skills, experience, and keywords
- 🧑‍💼 Predicts the most likely job title or career path
- 🔁 Support for multiple AI models (easy to switch) (Models used using Hugging Face Inference APIs)
- 🎨 Clean and responsive UI with TailwindCSS
- ⚡ Deployed frontend (Vercel) & backend (Render)

---

## 🛠 Tech Stack

### Frontend
- React (with Vite)
- Tailwind CSS
- TypeScript
- Sonner (for toasts)

### Backend
- Node.js + Express
- Multer (for file uploads)
- pdf-parse / pdf-lib (for PDF text extraction)
- Hugging Face Inference API
- CORS, dotenv, etc.

---

## 🧑‍💻 Getting Started
### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/ai-career-advisor.git
cd ai-career-advisor
```

### 2. Setup Environment Variables
```bash
OPENAI_API_KEY=your_openai_key
```

### 3. Install Dependencies
```bash
# Client
cd client
npm install

# Server
cd ../server
npm install
```
