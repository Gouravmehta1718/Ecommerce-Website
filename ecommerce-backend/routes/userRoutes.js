const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const router = express.Router();

// In-memory storage
let users = [];

// Admin Middleware
const adminCheck = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Admin role required' });
  }
  next();
};

// Register Admin
router.post('/register-admin', async (req, res) => {
  const { name, email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role: 'Admin'
  };

  users.push(newUser);
  res.status(201).json({ message: 'Admin registered successfully', user: newUser });
});

// Register (Signup)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
    role: role || 'User'
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  req.session.user = { id: user.id, name: user.name, role: user.role };
  res.status(200).json({ message: 'Login successful', user });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Get All Users (Admin only)
router.get('/', adminCheck, (req, res) => {
  res.status(200).json({ status: 'success', data: users });
});

// Get User by ID (Admin only)
router.get('/:id', adminCheck, (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ status: 'success', data: user });
});

// Update User (Admin only)
router.put('/:id', adminCheck, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // If a new password is provided, hash it
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  users[index] = { id, ...req.body };
  res.status(200).json({ message: 'User updated successfully', user: users[index] });
});

// Delete User (Admin only)
router.delete('/:id', adminCheck, (req, res) => {
  const id = parseInt(req.params.id);
  const exists = users.some(u => u.id === id);

  if (!exists) {
    return res.status(404).json({ message: 'User not found' });
  }

  users = users.filter(u => u.id !== id);
  res.status(200).json({ message: 'User deleted successfully' });
});

// Access Account Details (for any logged-in user)
router.get('/account', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Access denied. Please log in.' });
  }

  const customer = users.find(u => u.id === req.session.user.id);
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  res.status(200).json({ status: 'success', data: customer });
});

// Handle 404 errors for undefined routes
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = router;
