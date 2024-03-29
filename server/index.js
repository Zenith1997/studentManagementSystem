const express = require("express");
const pool = require('./configs/database');
const app = express();
const port = 3000;
app.use(express.json());
// Import the database connection

// ...


// Create MySQL connection
const connection = pool.getConnection((err, connection) => {
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

// ...

// Define your API routes
// GET route to fetch all students
app.get("/students", (req, res) => {
  // Create MySQL connection
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      res.status(500).json({ error: "Failed to connect to the database" });
      return;
    }

    console.log("Connected to the database!");

    // Fetch all students from the database
    connection.query("SELECT * FROM students", (err, results) => {
      if (err) {
        console.error("Error fetching students: ", err);
        res.status(500).json({ error: "Failed to fetch students" });
        return;
      }
      res.json(results);

      // Release the connection back to the pool
      connection.release();
    });
  });
});
// POST route to add a new student
// POST route to add a new student
app.post("/students", (req, res) => {
  console.log(req.body);
  const { name, age, grade } = req.body; // Assuming the request body contains name, age, and grade

  // Create MySQL connection
  const connection = pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      res.status(500).json({ error: "Failed to connect to the database" });
      return;
    }

    console.log("Connected to the database!");

    // Insert new student into the database
    connection.query(
      "INSERT INTO students (name, age, grade) VALUES (?, ?, ?)",
      [name, age, grade],
      (err, result) => {
        if (err) {
          console.error("Error adding student: ", err);
          res.status(500).json({ error: "Failed to add student" });
          return;
        }
        res.status(201).json({
          message: "Student added successfully",
          studentId: result.insertId,
        });

        // Release the connection back to the pool
        connection.release();
      }
    );
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
