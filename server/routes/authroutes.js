const express = require("express");
const authController = require("../controllers/authController");
const validateEmail = require("../middleware/validateEmail");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Example route for user login
router.post("/login",authController.login);

module.exports = router;
