// token.js

const jwt = require('jsonwebtoken');

// Function to generate JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
};
