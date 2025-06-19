
---

## ✅ `frontend/README.md` – React + Vite

```markdown
# 🎨 BaniyaMart Frontend – React + Vite
```

This is the **frontend** of the BaniyaMart grocery store app, built with modern tools to offer a smooth and fast user experience.

---

## 🚀 Tech Stack

| Layer     | Technology           |
|-----------|----------------------|
| Framework | React (via Vite)     |
| Styling   | Tailwind CSS         |
| Routing   | React Router DOM     |
| State     | useState, useEffect  |
| API Calls | Axios (or Fetch)     |

---

## ✨ Features

- Product list with images, names, and prices
- Responsive UI
- API integration with Spring Boot
- Clean folder structure for scaling

---

## 🔧 Setup Instructions

### 1. 📁 Open `frontend/` directory
```bash
cd frontend
```

### 2. 📦 Install dependencies
```bash
npm install
```

### 3. ▶️ Start development server
```bash
npm run dev
```
Then open in your browser:
```bash
http://localhost:5173
```

🔗 Backend API Integration
By default, the frontend will expect the backend to run at:
```bash
http://localhost:8080
```

Make sure:
1. Backend is running
2. CORS is enabled
3. You’re calling correct endpoints (e.g., /products)


🧱 Project Structure
frontend/
├── public/            # Static files
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page-level components
│   ├── services/      # API functions
│   └── App.jsx        # Root component
