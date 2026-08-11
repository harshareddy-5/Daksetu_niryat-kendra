# 🌐 DAKSETU GLOBAL DEPLOYMENT GUIDE

This guide provides step-by-step instructions to deploy **DakSetu – Smart Export Assistant** globally so anyone around the world can access it online for free.

---

## 🏆 Recommended Free Cloud Deployment Architecture

| Component | Platform | Free Tier Features |
|---|---|---|
| **Frontend** | **Vercel** or **Netlify** | Global Edge CDN, Free SSL/HTTPS, Custom Domains, Continuous Deployment |
| **Backend** | **Render** or **Railway** | Free Web Service, Automatic Python 3.12 detection, HTTPS endpoint |

---

## 🚀 Method 1: Deploy with Vercel (Frontend) + Render (Backend) [Recommended]

### Step 1: Push your Code to GitHub

1. Initialize Git in your project folder (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - DakSetu Prototype"
   ```
2. Create a new repository on [GitHub](https://github.com/new) called `daksetu`.
3. Push your repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/daksetu.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Deploy Backend on Render (Free)

1. Go to [render.com](https://render.com) and sign in with GitHub.
2. Click **New +** ➔ **Web Service**.
3. Connect your `daksetu` repository.
4. Fill in the deployment settings:
   - **Name:** `daksetu-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** `Free`
5. Click **Create Web Service**.
6. Once deployed, Render will give you a public URL (e.g. `https://daksetu-backend.onrender.com`).
   - Test it by opening: `https://daksetu-backend.onrender.com/docs`

---

### Step 3: Deploy Frontend on Vercel (Free)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New...** ➔ **Project**.
3. Import your `daksetu` repository.
4. In the configuration screen:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click **Edit** and choose `frontend`.
5. Under **Environment Variables**, add:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** Your Render backend URL (e.g. `https://daksetu-backend.onrender.com`)
6. Click **Deploy**.
7. In ~1 minute, your website will be live globally at:
   👉 `https://daksetu.vercel.app` (or your custom domain)

---

## ⚡ Method 2: Deploy Frontend on Netlify (1-Click)

1. Go to [netlify.com](https://www.netlify.com) and log in.
2. Click **Add new site** ➔ **Import an existing project** ➔ **GitHub**.
3. Select your repository.
4. Settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
5. Under **Environment variables**, set:
   - `VITE_API_BASE_URL` = `https://daksetu-backend.onrender.com`
6. Click **Deploy site**.

---

## 🐳 Method 3: Deploy with Docker (AWS / DigitalOcean / VPS)

If you have a VPS or cloud server with Docker installed:

1. Clone repository on server:
   ```bash
   git clone https://github.com/YOUR_USERNAME/daksetu.git
   cd daksetu
   ```
2. Run with Docker Compose:
   ```bash
   docker compose up -d --build
   ```
3. Your full-stack application will be live at `http://YOUR_SERVER_IP` with Nginx reverse proxying `/api` to the backend container!

---

## 🔒 Security & CORS

The backend is already configured with full CORS support in `backend/app/main.py` so your Vercel/Netlify frontend can communicate with the backend without any cross-origin errors.
