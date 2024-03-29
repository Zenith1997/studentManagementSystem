const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Zenith',
    database: 'world',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database!');

    try {
        // Perform database operations here

        // Release the connection back to the pool
        connection.release();
    } catch (error) {
        console.error('Error performing database operations:', error);
    }
});

// Close the connection pool when the application exits
process.on('SIGINT', () => {
    pool.end();
    process.exit();
});

// Export the pool object
module.exports = pool;