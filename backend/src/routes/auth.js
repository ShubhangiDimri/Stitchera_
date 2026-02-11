const express = require("express");
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");
const path = require("path");

const router = express.Router();

// @route   GET /auth/test
// @desc    Serve OAuth test page
// @access  Public
router.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "../../test-oauth.html"));
});

// @route   GET /auth/success
// @desc    Serve OAuth success page
// @access  Public
router.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../../success.html"));
});



// @route   GET /auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// @route   GET /auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/auth/failure",
        session: false
    }),
    (req, res) => {
        try {
            // Generate JWT token
            const token = jwt.sign(
                {
                    id: req.user.id,
                    email: req.user.email,
                    name: req.user.name,
                },
                process.env.JWT_SECRET || "your-secret-key",
                { expiresIn: "7d" }
            );

            // Check if request is from test page (no frontend URL or localhost test)
            const referer = req.get('referer') || '';
            const isTestPage = referer.includes('test-oauth.html') || referer.includes('/auth/test') || !process.env.FRONTEND_URL;

            if (isTestPage) {
                // Redirect to success page with token
                res.redirect(`/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`);
            } else {
                // Redirect to frontend with token
                const frontendURL = process.env.FRONTEND_URL || "http://localhost:3000";
                res.redirect(`${frontendURL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`);
            }
        } catch (error) {
            console.error("Error in OAuth callback:", error);
            res.redirect("/auth/failure");
        }
    }
);

// @route   GET /auth/failure
// @desc    OAuth failure redirect
// @access  Public
router.get("/failure", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Authentication failed",
    });
});

// @route   GET /auth/logout
// @desc    Logout user
// @access  Public
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error logging out",
            });
        }
        res.json({
            success: true,
            message: "Logged out successfully",
        });
    });
});

// @route   GET /auth/user
// @desc    Get current user from JWT
// @access  Private
router.get("/user", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
        res.json({
            success: true,
            user: decoded,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
});

module.exports = router;
