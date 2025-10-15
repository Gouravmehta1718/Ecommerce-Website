
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db'); // Make sure you have this file to connect MongoDB

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session middleware (make sure SESSION_SECRET is in your .env file)
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Change to true if using HTTPS in production
}));

// Serve static frontend files from "public" folder
app.use(express.static('public'));

// Importing routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messageRoutes');
const sellerproductRoutes = require('./routes/sellerproductRoutes');
const sellerorderRoutes = require('./routes/sellerorderRoutes');
const contactRoute = require('./routes/contact');

// Mount routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/sellerproducts', sellerproductRoutes);
app.use('/api/sellerorders', sellerorderRoutes);
app.use('/api/contact', contactRoute);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend!');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



