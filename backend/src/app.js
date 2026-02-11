// Load environment variables FIRST before any other imports
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("./config/passport");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);


app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Stitchera backend running successfully"
  });
});

module.exports = app;
