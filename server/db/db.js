const mysql2 = require("mysql2/promise");

// Import the required modules

// Create MySQL connection pool
const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "Zenith",
  database: "world",
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  console.log("Connected to the database!");

  try {
    // Perform database operations here

    // Release the connection back to the pool
    connection.release();
  } catch (error) {
    console.error("Error performing database operations:", error);
  }
});

// Export the connection pool
module.exports = pool;
