const pool = require('../db/db'); // Import your MySQL pool
const { generateToken } = require('../utils/token');

// Controller function for user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Fetch user by email from the database
    const [userRows] = await pool.query('SELECT * FROM User WHERE email = ?', [email]);
    console.log(userRows);
    // Check if user exists
    if (userRows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userRows[0];

    // Compare passwords (insecure comparison)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user.UserId);

    // Send token in response
    res.json({ token });
  } catch (error) {
    console.error("Error performing login:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
