// async function handleSignin(e) {
//     e.preventDefault();
//     console.log("Signin button clicked!"); // Debugging log

//     const email = document.getElementById('signin-email').value;
//     const password = document.getElementById('signin-password').value;

//     console.log("Email:", email);  // Debugging log
//     console.log("Password:", password);  // Debugging log

//     try {
//         const res = await fetch('http://localhost:3000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         });

//         const data = await res.json();
//         console.log("Response data:", data);  // Debugging log

//         if (res.ok) {
//             // Save user data to localStorage
//             localStorage.setItem('token', data.token); // If you're using JWT
//             localStorage.setItem('user', JSON.stringify(data.user));
//             alert("Login successful!");
//             window.location.href = 'index.html';

//             // Reset Sign In Form after successful login
//             document.getElementById('signin-form').reset();
//             console.log("Signin form reset"); // Debugging log
//         } else {
//             document.getElementById('signin-error').style.display = 'block';
//             document.getElementById('signin-error').innerText = data.message || "Login failed!";
//         }
//     } catch (error) {
//         console.error("Signin Error:", error);
//         alert("Something went wrong!");
//     }
// }

// async function handleSignup(e) {
//     e.preventDefault();
//     console.log("Signup button clicked!"); // Debugging log

//     const username = document.getElementById('signup-username').value;
//     const email = document.getElementById('signup-email').value;
//     const password = document.getElementById('signup-password').value;

//     console.log("Username:", username);  // Debugging log
//     console.log("Email:", email);  // Debugging log
//     console.log("Password:", password);  // Debugging log

//     try {
//         const res = await fetch('http://localhost:3000/api/auth/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, email, password })
//         });

//         const data = await res.json();
//         console.log("Response data:", data);  // Debugging log

//         if (res.ok) {
//             alert("Signup successful! Please login.");
//             window.location.href = 'login.html';

//             // Reset Sign Up Form after successful signup
//             document.getElementById('signup-form').reset();
//             console.log("Signup form reset"); // Debugging log
//         } else {
//             document.getElementById('signup-error').style.display = 'block';
//             document.getElementById('signup-error').innerText = data.message || "Signup failed!";
//         }
//     } catch (error) {
//         console.error("Signup Error:", error);
//         alert("Something went wrong!");
//     }
// }



const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// SIGNUP
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      name: username,
      email,
      password,   // Will be hashed by pre-save middleware
      role: 'Customer'
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    // Store user info in session (make sure session middleware is configured)
    req.session.user = { id: user._id, name: user.name, role: user.role };

    // Admin role check
    if (user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }

    res.json({ message: 'Login successful', user: req.session.user });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
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
