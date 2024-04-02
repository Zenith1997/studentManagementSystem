const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  console.log("verifyToken");
  const token = req.headers.authorization;
  console.log(token);

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    console.log("verifyToken ff");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next(); // Call next to proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
