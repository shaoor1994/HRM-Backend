
 const sql = require('mssql');

// // Create a database connection configuration
const config = {
  server: 'SAAD-ALI',
  user: 'sa', // Replace with your database username
   password: 'sa@1234', // Replace with your database password
  // Replace with your database server name or IP address
  database: 'HRM', // Replace with your database name
  dialect:'mssql',
  port:1433,
  options: {
    encrypt: false, // Change to true if using SSL/TLS encryption
    trustServerCertificate: true,
     // Change to false if not using self-signed certificates
     instancename:'SQLEXPRESS02'
  },
};

// // Connect to the database
// sql.connect(config)
//   .then(() => {
//     console.log('Connected to the database!');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to the database:', error);
//   });
const { ConnectionPool } = require('mssql');

// Database configuration
// const config = {
//   user: 'your_username',
//   password: 'your_password',
//   server: 'your_server', // e.g., localhost\\SQLEXPRESS
//   database: 'your_database',
// };

// Create a pool for the database connection
const pool = new ConnectionPool(config);

// Function to connect to the database
const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err; // Throw the error to handle it in the calling code
  }
};

module.exports = { pool, connectDB };
