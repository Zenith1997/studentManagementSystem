const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // const token = req.headers.authorization;
  // console.log(token);
   console.log("Token verification");
  // if (!token) return res.status(401).json({ error: "Access denied" });

  // try {
  //   console.log(process.env.SECRET_KEY);
  //   jwt.verify(token, process.env.SECRET_KEY); // Verify token using the secret key
  //   console.log("Verified");
  //   next(); // Call next to proceed to the next middleware or route handler
  // } catch (error) {
  //   res.status(401).json({ error: "Invalid token" }); // Send error response if token is invalid
  //   // next();

  // }
  next();
}

module.exports = {
  verifyToken: verifyToken,
};
