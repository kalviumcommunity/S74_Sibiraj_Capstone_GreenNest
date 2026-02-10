# GreenNest Deployment Guide

## Backend (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your repo and set:
   - **Root Directory**: `S74_Sibiraj_Capstone_GreenNest/Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
3. Add environment variables:
   - `MONGO_URI` – MongoDB connection string
   - `JWT_SECRET` – random secret for JWT
4. Deploy and copy the backend URL (e.g. `https://greennest-xxx.onrender.com`)

## Create Admin User

After backend is deployed, run locally:
```bash
cd Backend
ADMIN_EMAIL=admin@greennest.com ADMIN_PASSWORD=yourpassword node scripts/seedAdmin.js
```
Or update an existing user's role to `admin` in MongoDB.

## Frontend (Netlify)

1. Create a new site on [Netlify](https://netlify.com) and connect your repo
2. Build settings:
   - **Base directory**: `S74_Sibiraj_Capstone_GreenNest/Frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `S74_Sibiraj_Capstone_GreenNest/Frontend/dist`
3. Add environment variable:
   - `VITE_BACKEND_URL` = `https://YOUR-RENDER-URL.onrender.com/api`
4. Deploy

## Local Development

- Backend: `cd Backend && npm run dev` (port 5002)
- Frontend: `cd Frontend && npm run dev` (port 5173)
- Set `VITE_BACKEND_URL=http://localhost:5002/api` in Frontend/.env
