# Task Management System

A full-stack Task Management System built with React (Vite) and Node.js (Express).

## 🚀 Live Links
- **Frontend Application:** [https://task-management-system-mocha-nine.vercel.app](https://task-management-system-mocha-nine.vercel.app)
- **Backend API:** [https://task-management-system-kym3.onrender.com](https://task-management-system-kym3.onrender.com)

## 🔐 Admin Credentials
To access the admin features, use the following credentials:
- **Email:** `admin@gmail.com`
- **Password:** `123456`

## 💻 Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Notifications:** React Toastify

### Backend
- **Framework:** Node.js / Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Helmet, Express Rate Limit, CORS, BcryptJS

## 🛠️ Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/sahilnikalje/task-management-system.git
cd task-management-system
```

### 2. Backend Setup (Port: 3000)
Navigate to the `Backend` directory, install dependencies, and start the server:
```bash
cd Backend
npm install

# Make sure to set up your environment variables (.env file) before running the backend.
# Typically includes: PORT=3000, MONGODB_URI, JWT_SECRET, etc.

# Start the server (using nodemon or node index.js depending on your scripts)
npx nodemon index.js
```

### 3. Frontend Setup (Port: 5173)
Open a new terminal, navigate to the `Frontend` directory, install dependencies, and run the development server:
```bash
cd Frontend
npm install
npm run dev
```
The frontend should now be running on `http://localhost:5173`.

## 📁 Project Structure
```
task-management-system/
├── Backend/      # Contains Node.js, Express server, and MongoDB connection
└── Frontend/     # Contains the React + Vite web application
```
