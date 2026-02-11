# 🚀 OAuth2 Quick Reference

## ⚡ Setup (Do This First!)

1. **Create `.env` file:**

   ```bash
   cp .env.example .env
   ```

2. **Get Google OAuth credentials:**
   - Go to: https://console.cloud.google.com/apis/credentials
   - Create OAuth 2.0 Client ID
   - Add redirect URI: `http://localhost:5000/auth/google/callback`

3. **Update `.env` with your credentials:**

   ```env
   GOOGLE_CLIENT_ID=your-client-id-here
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   JWT_SECRET=generate-random-string
   SESSION_SECRET=generate-random-string
   ```

4. **Start server:**
   ```bash
   npm start
   # or for dev mode with auto-reload:
   npm run dev
   ```

---

## 📡 Endpoints

### Public Endpoints

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/auth/google`          | Start Google login         |
| GET    | `/auth/google/callback` | OAuth callback (automatic) |
| GET    | `/auth/logout`          | Logout user                |
| GET    | `/health`               | Health check               |

### Protected Endpoints (Require JWT Token)

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/auth/user`     | Get current user info |
| GET    | `/api/profile`   | Get user profile      |
| GET    | `/api/dashboard` | Get dashboard data    |

---

## 🔑 How to Use

### Frontend Login Button:

```javascript
<button
  onClick={() => (window.location.href = "http://localhost:5000/auth/google")}
>
  Login with Google
</button>
```

### Handle Callback (Frontend):

```javascript
// After Google redirects to: /auth/success?token=XXX&user=YYY
const token = new URLSearchParams(window.location.search).get("token");
localStorage.setItem("authToken", token);
```

### Make Protected API Calls:

```javascript
fetch("http://localhost:5000/api/profile", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});
```

---

## 🛡️ Protect Your Own Routes

```javascript
const { authenticateToken } = require("./middleware/auth");

router.get("/my-route", authenticateToken, (req, res) => {
  // req.user contains authenticated user data
  res.json({ user: req.user });
});
```

---

## 📖 Full Guide

See `OAUTH_SETUP_GUIDE.md` for detailed documentation!
