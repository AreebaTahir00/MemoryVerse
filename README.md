# Memories Project

## Setup
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your MongoDB URI and session secret
4. Create an `uploads/` folder in backend: `mkdir uploads`
5. `npm run dev`

## Project Structure
```
backend/
  config/db.js          - MongoDB connection
  controllers/          - Route logic
  middleware/           - Auth + upload middleware
  models/               - Mongoose schemas
  routes/               - Express routes
  public/app.js         - Frontend JavaScript
  views/                - HTML pages
  uploads/              - Uploaded images (auto-created)
  server.js             - App entry point
```
