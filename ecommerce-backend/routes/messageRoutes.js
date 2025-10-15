





const express = require('express');
const router = express.Router();

// In-memory messages storage (you can store this in a database in a real application)
let messages = [];

// Assuming you have a `users` array in your app.js, import it
const { users } = require('../data'); // Make sure the path is correct

// Middleware to check if the user is an admin or seller
const messageOwnerCheck = (req, res, next) => {
  if (!req.session.user || (req.session.user.role !== 'Admin' && req.session.user.role !== 'Seller')) {
    return res.status(403).json({ message: 'Admin or Seller role required' });
  }
  next();
};

// Send message between Seller and Admin
router.post('/', messageOwnerCheck, (req, res) => {
  const { senderId, receiverId, messageContent } = req.body;

  // Validate inputs
  if (!senderId || !receiverId || !messageContent) {
    return res.status(400).json({ message: 'Sender, receiver, and message content are required' });
  }

  const sender = users.find(u => u.id === senderId);
  const receiver = users.find(u => u.id === receiverId);

  if (!sender || !receiver) {
    return res.status(404).json({ message: 'Sender or Receiver not found' });
  }

  if (senderId === receiverId) {
    return res.status(400).json({ message: 'Sender and receiver cannot be the same' });
  }

  // Store message (for simplicity, storing in memory)
  messages.push({ senderId, receiverId, messageContent, timestamp: new Date() });

  res.status(200).json({ message: 'Message sent successfully' });
});

// Optional: You can add routes to get all messages, etc.
router.get('/', (req, res) => {
  res.status(200).json(messages);
});

module.exports = router;
