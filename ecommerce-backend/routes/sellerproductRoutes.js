const express = require('express');
const router = express.Router();

// In-memory products storage (you can use a database in real applications)
let products = [];

// Seller middleware to ensure only sellers can access these routes
const productOwnerCheck = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'Seller') {
    return res.status(403).json({ message: 'Seller role required' });
  }
  next();
};

// Add new product (Seller only)
router.post('/add', productOwnerCheck, (req, res) => {
  const { name, price, description, category, availability } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    description,
    category,
    availability,
    sellerId: req.session.user.id // Link product to seller
  };

  products.push(newProduct);
  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// Update product details (Seller only)
router.put('/update/:productId', productOwnerCheck, (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find(p => p.id === productId && p.sellerId === req.session.user.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found or unauthorized access' });
  }

  product.price = req.body.price || product.price;
  product.availability = req.body.availability || product.availability;
  product.description = req.body.description || product.description;

  res.status(200).json({ message: 'Product updated successfully', product });
});

// Get all products (For now, can be for admin to check all products)
router.get('/', (req, res) => {
  res.status(200).json(products);
});

module.exports = router;
