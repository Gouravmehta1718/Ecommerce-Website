const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

let orders = [];

// Place an Order (No authentication needed for placing an order)
router.post("/place", (req, res) => {
    const { items, totalAmount, customerName, address } = req.body;

    if (!items || !totalAmount || !customerName || !address) {
        return res.status(400).json({ message: "Missing required order fields" });
    }

    const order = {
        orderId: orders.length + 1,
        items,
        totalAmount,
        customerName,
        address,
        status: "Pending",
        sellerId: items[0].sellerId  // Assuming each product has a sellerId
    };

    orders.push(order);
    res.status(201).json({ message: "Order placed successfully", order });
});

// View Order History (For customers)
router.get('/orders/history', authMiddleware, (req, res) => {
    const customerOrders = orders.filter(order => order.customerName === req.session.user.name);
    res.status(200).json(customerOrders);
});

// Cancel Order
router.put('/orders/cancel/:orderId', authMiddleware, (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const order = orders.find(o => o.orderId === orderId && o.customerName === req.session.user.name);
  
    if (!order) {
      return res.status(404).json({ message: 'Order not found or not owned by you' });
    }
  
    if (order.status === 'Shipped' || order.status === 'Delivered') {
      return res.status(400).json({ message: 'Order cannot be canceled' });
    }
  
    order.status = 'Canceled';
    res.status(200).json({ message: 'Order canceled successfully', order });
});

// Get Orders related to Seller's Products
router.get('/orders/seller', authMiddleware, (req, res) => {
    if (req.session.user.role !== 'Seller') {
        return res.status(403).json({ message: 'Access denied. Seller role required.' });
    }

    const sellerOrders = orders.filter(order => 
        order.items.some(item => item.sellerId === req.session.user.id)  // Only show orders related to seller's products
    );

    res.status(200).json(sellerOrders);
});

// View a Specific Order (Admin or Seller)
router.get("/:orderId", authMiddleware, (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    // Allow Admin and Seller to view the order
    if (req.session.user.role === 'Admin' || order.items.some(item => item.sellerId === req.session.user.id)) {
        return res.status(200).json(order);
    } else {
        return res.status(403).json({ message: 'Access denied. Seller or Admin role required.' });
    }
});

// Update Order Status (Admin or Seller)
router.put("/update/:orderId", authMiddleware, (req, res) => {
    const orderId = parseInt(req.params.orderId);

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty or invalid" });
    }

    const { status } = req.body;
    let order = orders.find(o => o.orderId === orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    // Allow Admin or Seller to update the status
    if (req.session.user.role === 'Admin' || order.items.some(item => item.sellerId === req.session.user.id)) {
        order.status = status || order.status;
        res.status(200).json({ message: "Order status updated", order });
    } else {
        return res.status(403).json({ message: "Access denied. Only Admin or Seller can update the order status." });
    }
});

// Delete an Order (Admin Only) - Protect this route with authentication
router.delete("/delete/:orderId", authMiddleware, (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const orderIndex = orders.findIndex(o => o.orderId === orderId);

    if (orderIndex === -1) {
        return res.status(404).json({ message: "Order not found" });
    }

    // Admin check before allowing order deletion
    if (req.session.user.role !== 'Admin') {
        return res.status(403).json({ message: "Access denied. Admin role required to delete orders." });
    }

    orders.splice(orderIndex, 1);
    res.status(200).json({ message: "Order deleted successfully" });
});

module.exports = router;
