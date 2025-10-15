const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


// Fake in-memory products (You can replace this with a real database)
let products = [];

// Admin and Seller Role Handling - Add Seller Role for Product Management
const adminOrSellerCheck = (req, res, next) => {
  if (!req.session.user || (req.session.user.role !== 'Admin' && req.session.user.role !== 'Seller')) {
    return res.status(403).json({ message: "Access denied. Admin or Seller role required." });
  }
  next();
};

// Admin Only: Get all products (Admin Only)
router.get('/admin', (req, res) => {
  // Check if the current user is logged in and is an Admin
  if (!req.session.user || req.session.user.role !== 'Admin') {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
  // Return all products if the user is an Admin
  res.json(products);
});

// View products (accessible to all - including Customers and Guests)
router.get('/view/all', (req, res) => {
  res.status(200).json(products);
});

// Admin or Seller can add a new product (Only Admin or Seller can do this)
router.post('/', adminOrSellerCheck, (req, res) => {
  const { name, description, price, stock, sellerId } = req.body;

  // Validate required fields
  if (!name || !description || !price || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
    stock,
    sellerId: req.session.user.role === 'Seller' ? req.session.user.id : sellerId // Only sellers can set sellerId
  };

  // Push new product to products array
  products.push(newProduct);

  res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// Get a single product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// Update product by ID (Admin Only or Seller managing their own products)
router.put('/:id', adminOrSellerCheck, (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Sellers can only update their own products
  if (req.session.user.role === 'Seller' && product.sellerId !== req.session.user.id) {
    return res.status(403).json({ message: "You can only update your own products." });
  }

  const { name, description, price, stock } = req.body;

  // Update the product fields
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;

  res.json({ message: "Product updated successfully", product });
});

// Delete product by ID (Admin Only)
router.delete('/:id', (req, res) => {
  // Check if the current user is logged in and is an Admin
  if (!req.session.user || req.session.user.role !== 'Admin') {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }

  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Remove the product from the array
  products.splice(index, 1);

  res.status(200).json({ message: "Product deleted successfully" });
});

// Admin and Seller: Get all products for their own (For sellers managing their products)
router.get('/my-products', adminOrSellerCheck, (req, res) => {
  const sellerProducts = products.filter(product => product.sellerId === req.session.user.id);
  res.status(200).json(sellerProducts);
});

router.post('/add', authMiddleware, (req, res) => {
  const { name, price, description, category, image } = req.body;

  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
    category,
    image: image || '',
    sellerId: req.session.user.id
  };

  products.push(newProduct);
  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

module.exports = router;
