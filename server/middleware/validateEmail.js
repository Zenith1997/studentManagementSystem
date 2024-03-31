const { body, validationResult } = require('express-validator');

// Define the middleware function with email regex validation
const validateEmail = [
  // Validate email using regex
  body('email').isEmail().withMessage('Invalid email address').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
];

module.exports = validateEmail;
