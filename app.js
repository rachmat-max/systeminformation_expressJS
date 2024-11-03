const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
// MySQL connection
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root', // your MySQL username
   password: '', // your MySQL password
   database: 'employee_management'
});
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Employee Management</h1>');
});

// Registration
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  db.query('INSERT INTO users (username, password) VALUES (?, ?)',
  [username, hashedPassword], (err) => {
     if (err) throw err;
     res.redirect('/login');
  });
});

// Login
app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
   const { username, password } = req.body;
   db.query('SELECT * FROM users WHERE username = ?', [username], (err,
   results) => {
     if (err) throw err;
     if (results.length > 0 && bcrypt.compareSync(password,
     results[0].password)) {
       req.session.userId = results[0].id;
       res.redirect('/employees');
     } else {
        res.send('Invalid credentials');
     }
   });
});

// Employee Management
app.get('/employees', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) throw err;
    res.render('employees', { employees });
  });
});

app.post('/employees', (req, res) => {
  const { name, position, department } = req.body;
  db.query('INSERT INTO employees (name, position, department) VALUES (?, ?, ?)', [name, position, department], (err) => {
    if (err) throw err;
    res.redirect('/employees');
  });
});

app.get('/employees/edit/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) =>
  {
   if (err) throw err;
   res.render('edit', { employee: results[0] });
  });
});

app.post('/employees/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, department } = req.body;
  db.query('UPDATE employees SET name = ?, position = ?, department = ? WHERE id = ?', [name, position, department, id], (err) => {
    if (err) throw err;
    res.redirect('/employees');
  });
});

app.post('/employees/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM employees WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/employees');
  });
});

// Start Server
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});