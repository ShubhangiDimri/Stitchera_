const express = require("express");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/profile
// @desc    Get user profile (protected route example)
// @access  Private
router.get("/profile", authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: "This is a protected route",
        user: req.user,
    });
});

// @route   GET /api/dashboard
// @desc    Get dashboard data (protected route example)
// @access  Private
router.get("/dashboard", authenticateToken, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to your dashboard",
        user: req.user,
        data: {
            // Add your dashboard data here
            stats: {
                totalProjects: 0,
                completedTasks: 0,
            },
        },
    });
});

module.exports = router;
