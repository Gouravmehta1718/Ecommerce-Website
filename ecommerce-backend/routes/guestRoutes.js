const express = require('express');
const router = express.Router();

// Fake in-memory data (replace with a database)
let products = [];
let cart = [];

// GET - View Products (accessible by both guest and logged-in users)
router.get('/products', (req, res) => {
  res.status(200).json(products);
});

// POST - Add Product to Cart (accessible by both guest and logged-in users)
router.post('/cart', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Add product to the cart (you can use user session to tie cart to a specific user)
  cart.push({ productId, quantity });
  res.status(201).json({ message: 'Product added to cart', cart });
});

// POST - Checkout (guest must sign up or log in to checkout)
router.post('/checkout', (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.status(401).json({ message: 'Please sign up or log in to proceed with checkout' });
  }

  // Checkout logic here (e.g., calculate total, place order)
  // You can also add more business logic like handling payment here
  res.status(200).json({ message: 'Checkout successful' });
});

module.exports = router;
