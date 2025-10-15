// // routes/contact.js
// const express = require('express');
// const router = express.Router();

// // Contact Us API route
// router.post('/', (req, res) => {
//     const { name, email, message } = req.body;

//     // Check if all required fields are filled
//     if (!name || !email || !message) {
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Process the data (log it for now, but could save to a database)
//     console.log(`Contact Form Data: \nName: ${name} \nEmail: ${email} \nMessage: ${message}`);

//     // Send a response to the client
//     res.status(200).json({ message: 'Your message has been received. We will get back to you soon.' });
// });

// module.exports = router;


const express = require('express');
const Contact = require('../models/Contact'); // import the model
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: 'Your message has been received. We will get back to you soon.' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

