# OAuth2 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         OAUTH2 AUTHENTICATION FLOW                       │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────┐         ┌──────────┐         ┌──────────┐         ┌──────────┐
│          │         │          │         │          │         │          │
│  USER    │         │ FRONTEND │         │ BACKEND  │         │  GOOGLE  │
│          │         │          │         │          │         │          │
└────┬─────┘         └────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │                    │
     │  1. Click Login    │                    │                    │
     │───────────────────>│                    │                    │
     │                    │                    │                    │
     │                    │  2. Redirect to    │                    │
     │                    │  /auth/google      │                    │
     │                    │───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │  3. Redirect to    │
     │                    │                    │  Google Login      │
     │                    │                    │───────────────────>│
     │                    │                    │                    │
     │  4. Enter credentials & grant permissions                    │
     │<─────────────────────────────────────────────────────────────│
     │                    │                    │                    │
     │                    │                    │  5. Callback with  │
     │                    │                    │  authorization code│
     │                    │                    │<───────────────────│
     │                    │                    │                    │
     │                    │                    │  6. Exchange code  │
     │                    │                    │  for user profile  │
     │                    │                    │───────────────────>│
     │                    │                    │                    │
     │                    │                    │  7. User profile   │
     │                    │                    │<───────────────────│
     │                    │                    │                    │
     │                    │                    │  8. Generate JWT   │
     │                    │                    │  token             │
     │                    │                    │                    │
     │                    │  9. Redirect to    │                    │
     │                    │  /auth/success     │                    │
     │                    │  ?token=XXX&user=YYY                    │
     │                    │<───────────────────│                    │
     │                    │                    │                    │
     │                    │ 10. Save token to  │                    │
     │                    │  localStorage      │                    │
     │                    │                    │                    │
     │                    │ 11. API call with  │                    │
     │                    │  Authorization:    │                    │
     │                    │  Bearer TOKEN      │                    │
     │                    │───────────────────>│                    │
     │                    │                    │                    │
     │                    │                    │ 12. Validate token │
     │                    │                    │  & return data     │
     │                    │                    │                    │
     │                    │ 13. Protected data │                    │
     │                    │<───────────────────│                    │
     │                    │                    │                    │
     │  14. Display data  │                    │                    │
     │<───────────────────│                    │                    │
     │                    │                    │                    │
```

## Key Components

### 1. **Frontend** (Your React/HTML app)

- Initiates login by redirecting to `/auth/google`
- Receives token after successful authentication
- Stores token in localStorage
- Sends token with every API request

### 2. **Backend** (Your Express server)

- `/auth/google` - Redirects to Google
- `/auth/google/callback` - Receives user data from Google
- Generates JWT token
- Validates tokens on protected routes

### 3. **Google OAuth**

- Handles user authentication
- Returns user profile data
- Provides authorization code

### 4. **JWT Token**

- Contains user information (id, email, name)
- Expires in 7 days
- Sent in Authorization header: `Bearer TOKEN`

---

## Request/Response Examples

### Initial Login Request

```
GET http://localhost:5000/auth/google
→ Redirects to Google login page
```

### After Google Authentication

```
Google redirects to:
http://localhost:5000/auth/google/callback?code=AUTHORIZATION_CODE

Backend processes and redirects to:
http://localhost:3000/auth/success?token=JWT_TOKEN&user=USER_DATA
```

### Protected API Request

```
GET http://localhost:5000/api/profile
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response:
{
  "success": true,
  "user": {
    "id": "123456789",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

## Security Features

✅ **JWT Tokens** - Stateless authentication  
✅ **7-day expiration** - Tokens automatically expire  
✅ **HTTPS in production** - Secure cookies  
✅ **CORS configured** - Only your frontend can access  
✅ **Session management** - Express sessions for OAuth flow  
✅ **Token validation** - Middleware checks every request

---

## Token Structure

```javascript
// JWT Payload
{
  "id": "google-user-id",
  "email": "user@example.com",
  "name": "John Doe",
  "iat": 1234567890,  // Issued at
  "exp": 1234567890   // Expires at
}
```

---

## Common Use Cases

### Check if User is Logged In

```javascript
const token = localStorage.getItem("authToken");
if (token) {
  // User is logged in
  // Verify token with backend
  fetch("/auth/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
```

### Logout

```javascript
localStorage.removeItem("authToken");
localStorage.removeItem("user");
window.location.href = "/login";
```

### Auto-attach Token to All Requests (Axios)

```javascript
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```
