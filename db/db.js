// // // // // const pool = require('./dbPool'); // Import your database connection pool module

// // // // const mysql = require('mysql2');

// // // // const pool = mysql.createPool({
// // // //   host: 'localhost', // Replace with your database host
// // // //   user: 'SAAD-ALI/dell', // Replace with your database username
// // // //   password: 'saad@5893862', // Replace with your database password
// // // //   database: 'HRM', // Replace with your database name
// // // //   waitForConnections: true,
// // // //   connectionLimit: 10,
// // // //   queueLimit: 0,
// // // // });

// // // // // const checkDatabaseConnection = async () => {
// // // // //     try {
// // // // //       const connection = await pool.getConnection();
// // // // //       console.log('Connected to the database!');
// // // // //       connection.release();
// // // // //     } catch (error) {
// // // // //       console.error('Failed to connect to the database:', error);
// // // // //     }
// // // // //   };
  
// // // // //   checkDatabaseConnection();
  
// // // // module.exports = pool;
// // // const Sequelize = require('sequelize');

// // // // Create a new Sequelize instance
// // // const sequelize = new Sequelize('database', 'username', 'password', {
// // //   host: 'localhost',
// // //   dialect: 'mssql', // Change this to the appropriate dialect for your database (e.g., 'postgres' for PostgreSQL)
// // // });

// // // // Test the database connection
// // // sequelize
// // //   .authenticate()
// // //   .then(() => {
// // //     console.log('Connection has been established successfully.');
// // //   })
// // //   .catch((error) => {
// // //     console.error('Unable to connect to the database:', error);
// // //   });

// // // module.exports = sequelize;
// // const mysql = require('mysql2');

// // // Create a connection
// // const connection = mysql.createConnection({
// //   host: 'localhost', // Replace with your database host
// // //   user: 'SAAD-ALI/dell', // Replace with your database username
// // //   password: 'saad@5893862', // Replace with your database password
// //   database: 'HRM', // Replace with your database name
// // });

// // // Test the connection
// // connection.connect((error) => {
// //   if (error) {
// //     console.error('Failed to connect to the database:', error);
// //   } else {
// //     console.log('Connected to the database!');
// //     connection.end(); // Close the connection
// //   }
// // });
// const sql = require('msnodesqlv8');

// // Create a database connection configuration
// const config = {
//  user: 'SAAD-ALI\dell', // Replace with your database username
// //   password: 'your-password', // Replace with your database password
//   server: 'localhost', // Replace with your database server name or IP address
//   database: 'HRM', // Replace with your database name
//   options: {
//     encrypt: false, // Change to true if using SSL/TLS encryption
//     trustServerCertificate: true, // Change to false if not using self-signed certificates
//   },
// };

// // Create a connection pool
// const pool = new sql.ConnectionPool(config);

// // Connect to the database
// pool.connect().then(() => {
//   console.log('Connected to the database!');
// }).catch((error) => {
//   console.error('Failed to connect to the database:', error);
// });

const sql = require('mssql');

// Create a database connection configuration
const config = {
  // user: 'SAAD-ALI\dell', // Replace with your database username
  // password: 'your-password', // Replace with your database password
  server: 'Saad-Ali', // Replace with your database server name or IP address
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

// Connect to the database
sql.connect(config)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
