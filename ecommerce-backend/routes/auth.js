const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user'); // Your user model

// Sample in-memory user data (you can replace this with a real database)
const users = require('../users'); // Assuming users are stored here

// SIGNUP
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Signup data: ", req.body);
  console.log("Password received: ", password);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      name: username,
      email,
      password: hashedPassword,
      role: 'Customer' // default role
    };

    users.push(newUser);
    console.log("All users:", users);
    res.status(201).json({ message: 'Signup successful' });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

  // Store user information in session
  req.session.user = { id: user.id, name: user.name, role: user.role };

  // Admin check
  if (user.role !== 'Admin') {
    return res.status(403).json({ message: 'Access denied. Admin role required.' });
  }

  res.json({ message: 'Login successful', user: { id: user.id, name: user.name, role: user.role } });
});

// LOGOUT
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }

    res.json({ message: 'Logged out successfully' });
  });
});

// GET CURRENT USER
router.get('/current', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'No user logged in' });
  }

  res.json({ user: req.session.user });
});



module.exports = router;
