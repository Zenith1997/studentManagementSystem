const express = require("express");
const pool = require("./configs/database");
const initializeDatabase = require("./db/db");
const app = express();
const port = 8080;
const cors = require('cors');
app.use(express.json());
const authRoutes = require("./routes/authroutes");
const studRoutes = require("./routes/studentroutes");
const { verifyToken } = require("./middleware/authMiddleware");
require("dotenv").config();
app.use(cors({ origin: "http://localhost:3000" }));

// Import the code to initialize database connection

// Call the function to initialize the database connection

initializeDatabase.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
  connection.release();
});

app.use("/auth", authRoutes);

// Apply verifyToken middleware specifically to the studRoutes
app.use("/std",studRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
