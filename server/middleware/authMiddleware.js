const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
   const token = req.header('x-auth-token');
  // console.log(token);
   console.log("Token verification");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
  
    jwt.verify(token, process.env.SECRET_KEY); // Verify token using the secret key
  
    next(); // Call next to proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Invalid token" }); // Send error response if token is invalid
   

  }

}

module.exports = {
  verifyToken: verifyToken,
};
