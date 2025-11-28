const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

// POST /api/auth/register - Register user baru
router.post("/register", authController.register);

// POST /api/auth/login - Login user
router.post("/login", authController.login);

// GET /api/auth/profile/:id - Get user profile
router.get("/profile/:id", authController.getProfile);

module.exports = router;
