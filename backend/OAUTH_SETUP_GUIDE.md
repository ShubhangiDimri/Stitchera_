# Stitchera Backend - OAuth2 Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

Already done! The following packages were installed:

- `passport` - Authentication middleware
- `passport-google-oauth20` - Google OAuth2 strategy
- `express-session` - Session management
- `jsonwebtoken` - JWT token generation

### 2. Set Up Google OAuth2 Credentials

#### Step-by-step:

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project** (or select existing)
   - Click "Select a project" → "New Project"
   - Name it "Stitchera" or whatever you prefer

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth2 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add these URLs:
     - **Authorized JavaScript origins**: `http://localhost:5000`
     - **Authorized redirect URIs**: `http://localhost:5000/auth/google/callback`
   - Click "Create"

5. **Copy Your Credentials**
   - You'll get a **Client ID** and **Client Secret**
   - Keep these safe!

### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Then edit `.env` and add your credentials:

```env
PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:3000

SESSION_SECRET=generate-a-random-string-here
JWT_SECRET=generate-another-random-string-here

GOOGLE_CLIENT_ID=your-actual-client-id-from-google
GOOGLE_CLIENT_SECRET=your-actual-client-secret-from-google
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
```

**Pro tip**: Generate random secrets using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm install -D nodemon
npm run dev
```

Add this to your `package.json` scripts:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

---

## 📡 API Endpoints

### Authentication Endpoints

#### 1. **Initiate Google Login**

```
GET http://localhost:5000/auth/google
```

- Redirects user to Google login page
- User grants permissions
- Google redirects back to your callback URL

**Usage in Frontend:**

```javascript
// Simple redirect
window.location.href = "http://localhost:5000/auth/google";

// Or as a button
<button
  onClick={() => (window.location.href = "http://localhost:5000/auth/google")}
>
  Login with Google
</button>;
```

#### 2. **OAuth Callback** (Automatic)

```
GET http://localhost:5000/auth/google/callback
```

- Google redirects here after successful login
- Backend generates JWT token
- Redirects to frontend with token: `http://localhost:3000/auth/success?token=JWT_TOKEN&user=USER_DATA`

**Frontend Handler Example:**

```javascript
// In your frontend (e.g., React component at /auth/success)
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const user = JSON.parse(decodeURIComponent(params.get("user")));

  if (token) {
    // Save token to localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to dashboard
    window.location.href = "/dashboard";
  }
}, []);
```

#### 3. **Get Current User**

```
GET http://localhost:5000/auth/user
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "123456789",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Frontend Example:**

```javascript
const token = localStorage.getItem("authToken");

fetch("http://localhost:5000/auth/user", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data.user));
```

#### 4. **Logout**

```
GET http://localhost:5000/auth/logout
```

**Response:**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Protected API Endpoints (Examples)

#### 1. **Get Profile**

```
GET http://localhost:5000/api/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "success": true,
  "message": "This is a protected route",
  "user": {
    "id": "123456789",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### 2. **Get Dashboard**

```
GET http://localhost:5000/api/dashboard
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "success": true,
  "message": "Welcome to your dashboard",
  "user": { ... },
  "data": {
    "stats": {
      "totalProjects": 0,
      "completedTasks": 0
    }
  }
}
```

---

## 🔒 How to Protect Your Own Routes

Use the `authenticateToken` middleware:

```javascript
const { authenticateToken } = require("../middleware/auth");

// Protect a route
router.get("/my-protected-route", authenticateToken, (req, res) => {
  // req.user contains the decoded JWT data
  res.json({
    message: "You are authenticated!",
    user: req.user,
  });
});
```

---

## 🎨 Frontend Integration Example (React)

### Login Button Component

```javascript
function LoginButton() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}
```

### Auth Success Handler

```javascript
// pages/AuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");

    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", user);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
}
```

### Protected API Call

```javascript
async function fetchProtectedData() {
  const token = localStorage.getItem("authToken");

  const response = await fetch("http://localhost:5000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
```

### Axios Interceptor (Alternative)

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Use it
api.get("/api/profile").then((res) => console.log(res.data));
```

---

## 🧪 Testing the OAuth Flow

### Using Browser:

1. Start your backend: `npm start`
2. Visit: `http://localhost:5000/auth/google`
3. Login with Google
4. You'll be redirected to your frontend with the token

### Using Postman/Thunder Client:

1. **Test Health Check:**

   ```
   GET http://localhost:5000/health
   ```

2. **Get User (with token):**

   ```
   GET http://localhost:5000/auth/user
   Headers:
     Authorization: Bearer YOUR_JWT_TOKEN_HERE
   ```

3. **Test Protected Route:**
   ```
   GET http://localhost:5000/api/profile
   Headers:
     Authorization: Bearer YOUR_JWT_TOKEN_HERE
   ```

---

## 🛠️ Troubleshooting

### "Error: Missing credentials"

- Make sure you created a `.env` file
- Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set

### "Redirect URI mismatch"

- Go to Google Cloud Console
- Add `http://localhost:5000/auth/google/callback` to authorized redirect URIs
- Make sure the URL matches exactly (including http/https)

### CORS errors

- Check that `FRONTEND_URL` in `.env` matches your frontend URL
- Make sure your frontend sends credentials: `credentials: 'include'`

### Token not working

- Check that the token is being sent in the `Authorization` header
- Format: `Bearer YOUR_TOKEN_HERE`
- Verify `JWT_SECRET` is the same in `.env`

---

## 🎯 Next Steps

1. **Add Database Integration**: Save users to MySQL when they login
2. **Add More OAuth Providers**: GitHub, Facebook, Twitter, etc.
3. **Implement Refresh Tokens**: For better security
4. **Add Role-Based Access Control**: Admin, user, etc.
5. **Add Email Verification**: For additional security

---

## 📚 File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── passport.js          # OAuth2 configuration
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── api.js               # Protected API routes (example)
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
├── .env                         # Your environment variables (create this!)
├── .env.example                 # Environment variables template
└── package.json
```

---

**Need help?** Let me know if you have any questions! 🚀
