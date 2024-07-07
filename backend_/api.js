


// Connect to the database



const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'rcbian',
      database: 'RAN'
    });

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.post('/', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received data:', { name, email, password });
  
  // Insert data into the database
  const query = 'INSERT INTO user_ (name, mail, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err.stack);
      res.status(500).json({ message: 'Error inserting data into the database', error: err });
      return;
    }
    console.log('Data inserted successfully:', results);
    res.json({ message: 'Data received and inserted successfully', data: req.body });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
