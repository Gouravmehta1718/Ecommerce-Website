const express = require('express');
const router = express.Router();

// In-memory orders storage (replace with actual database in production)
let orders = [];

// Seller middleware to ensure only sellers can access these routes
const productOwnerCheck = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'Seller') {
    return res.status(403).json({ message: 'Seller role required' });
  }
  next();
};

// View orders related to the seller's products
router.get('/seller/:sellerId', productOwnerCheck, (req, res) => {
  const sellerId = parseInt(req.params.sellerId);

  const sellerOrders = orders.filter(o => o.items.some(item => item.sellerId === sellerId));
  
  if (!sellerOrders.length) {
    return res.status(404).json({ message: 'No orders found for this seller' });
  }

  res.status(200).json(sellerOrders);
});

// Track shipment status
router.get('/track/:orderId', productOwnerCheck, (req, res) => {
  const orderId = parseInt(req.params.orderId);
  const orderDetails = orders.find(o => o.id === orderId);

  if (!orderDetails) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json({
    message: 'Order tracking details',
    status: orderDetails.status, // Track status of the order
    shipment: orderDetails.shipmentDetails || 'No shipment info available'
  });
});

router.get('/:sellerId', (req, res) => {
    const sellerId = req.params.sellerId;

    // Simulating data (you can replace this with a database query)
    const orders = [
        { orderId: 1, sellerId: 1, orderDetails: 'Product 1, Product 2', totalAmount: 200, orderDate: new Date() },
        { orderId: 2, sellerId: 1, orderDetails: 'Product 3, Product 4', totalAmount: 350, orderDate: new Date() }
    ];

    // Filter orders by sellerId
    const sellerOrders = orders.filter(order => order.sellerId == sellerId);

    if (sellerOrders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this seller.' });
    }

    res.status(200).json(sellerOrders);
});






// In sellerorderRoutes.js
// Route to get details of a specific order
router.get('/order/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Simulate fetching a specific order by orderId
    const order = {
        orderId: orderId,
        sellerId: 1,
        orderDetails: 'Product 1, Product 2',
        totalAmount: 200,
        orderDate: new Date(),
    };

    if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
    }

    res.status(200).json(order);
});


// Example POST route to create a seller order
router.post('/', (req, res) => {
    const { sellerId, orderDetails, totalAmount } = req.body;

    if (!sellerId || !orderDetails || !totalAmount) {
        return res.status(400).json({ message: 'Seller ID, order details, and total amount are required.' });
    }

    // Simulate saving the order (e.g., to a database)
    const newOrder = {
        sellerId,
        orderDetails,
        totalAmount,
        orderDate: new Date(),
    };

    // Respond with success
    res.status(201).json({
        message: 'Order placed successfully!',
        order: newOrder,
    });
});



module.exports = router;
