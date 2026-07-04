# Memories Project

# 🎞️ MemoryVerse

A cinematic digital memory-keeping app where you can log life's moments — with a title, description, photo, date, and location — and browse them as a clean, chronological timeline styled like frames on a filmstrip.

Built as a semester project to practice full-stack development: authentication, file uploads, database modeling, and a custom-designed frontend.

---

## 📖 About

MemoryVerse lets a user create a private (or public) journal of memories. Each memory can include a photo, description, location, and date, and everything is organized into a visual timeline. It also includes a slideshow mode to relive saved memories one by one.

The goal was to go beyond a default-styled CRUD app and give it a real visual identity — a dark, cinematic theme where the timeline is literally laid out like a strip of film.

---

## ✨ Features

- 🔐 User authentication (register/login/logout) with session-based auth
- 🖼️ Add memories with photo upload, title, description, date, and location
- 🌍 Public/Private visibility control per memory
- 🎬 Cinematic timeline view of all memories
- 📽️ Built-in slideshow mode to auto-play through memory photos
- ✏️ Edit and delete existing memories
- 📱 Responsive design across desktop and mobile

---

## 🛠️ Tech Stack

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose (ODM)
- Express-session (authentication/session handling)
- bcrypt.js (password hashing)
- Multer + Cloudinary (image upload & storage)

**Frontend**
- EJS (server-rendered templating)
- HTML5 & CSS3 (custom cinematic theme, no framework)
- Vanilla JavaScript (fetch API for all client-server communication)

**Tools**
- Git & GitHub for version control
- dotenv for environment configuration

---

## 📸 Screenshots

> Screenshots are in the `/screenshots` folder — see below to add yours.

### Register
![Register Page](screenshots/Register.png)

### Login
![Login Page](screenshots/Login.png)

### Dashboard
![Dashboard](screenshots/Dashboard.png)

### Timeline
![Timeline](screenshots/Timeline.png)

### Add Memory
![Add Memory](screenshots/AddMemory.png)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB (local or MongoDB Atlas connection string)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/memoryverse.git

# Move into the backend folder
cd memoryverse/backend

# Install dependencies
npm install

# Create a .env file with the following variables
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# SESSION_SECRET=your_secret_key
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Run the app
npm run dev
```

The app will be running at `http://localhost:5000`.

---

## 📂 Project Structure

```
Memories/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route logic (auth, memories)
│   ├── middleware/      # Auth guard, file upload handling
│   ├── models/          # Mongoose schemas (User, Memory)
│   ├── public/          # Frontend CSS & JS
│   ├── routes/          # API routes
│   ├── views/           # EJS templates (login, register, dashboard, timeline, add-memory)
│   └── server.js        # App entry point
├── screenshots/         # App screenshots for this README
└── README.md
```

---

## 🎯 What I Learned

Working on this project helped me practice:
- Structuring a full REST API with Express
- Session-based authentication and protected routes
- Handling file uploads and storing images via Cloudinary
- Designing a MongoDB schema for a real-world use case
- Building a cohesive, custom frontend design rather than relying on a UI framework

---

## 📬 Contact

Feel free to reach out if you have feedback or questions about this project.
