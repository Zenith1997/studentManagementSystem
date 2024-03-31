// token.js

const jwt = require('jsonwebtoken');

// Function to generate JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ userId }, '232@@5', { expiresIn: '1h' });
};
