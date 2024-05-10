// server.js

const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nazeer3664',
  database: 'projectdb',
  authSwitchHandler: function ({ pluginName, pluginData }, cb) {
    if (data.pluginName === 'caching_sha2_password') {
      const password = 'nazeer3664'; // Replace with your actual password
      const buffer = Buffer.from(password + '\0');
      callback(null, buffer);
  }
}
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Define route to handle login request
// server.js

// Other required imports...

// Define route to handle login request
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const userType = req.query.type; // assuming the type of user is passed as a query parameter

  let tableName;
  let redirectUrl; // Define variable to hold redirect URL

  switch (userType) {
    case 'admin':
      tableName = 'admin';
      redirectUrl = '/admin-home.html'; // Redirect to admin home page
      break;
    case 'student':
      tableName = 'student';
      redirectUrl = '/student-dashboard.html'; // Redirect to student dashboard
      break;
    case 'supervisor':
      tableName = 'supervisor';
      redirectUrl = '/supervisor-dashboard.html'; // Redirect to supervisor dashboard
      break;
    default:
      res.status(400).json({ message: 'Invalid user type' });
      return;
  }

  // Perform database query to check user credentials
  const query = `SELECT * FROM ${tableName} WHERE username = ? AND password = ?`;
  connection.query(query, [username, password], (error, results, fields) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 1) {
      // User authenticated
      res.status(200).json({ message: 'Login successful', redirectUrl: redirectUrl }); // Send redirect URL in response
    } else {
      // User not found or invalid credentials
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});


const PORT = 3000; // Change the port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
