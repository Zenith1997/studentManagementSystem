const express = require("express");
const authController = require("../controllers/authController");
const validateEmail = require("../middleware/validateEmail");

const router = express.Router();



// Example route for user login
router.post("/login", validateEmail, authController.login);



module.exports = router;
