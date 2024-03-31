require('dotenv').config()

const jwt = require('jsonwebtoken');

// Function to generate JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};
