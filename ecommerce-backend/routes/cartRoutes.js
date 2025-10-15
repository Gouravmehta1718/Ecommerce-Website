const express = require("express");
const router = express.Router();

let cart = []; 
router.post("/add", (req, res) => {
    const { productId, name, price, quantity } = req.body;
    const item = { productId, name, price, quantity };
    cart.push(item);
    res.json({ message: "Item added to cart", cart });
});

router.get("/", (req, res) => {
    res.json(cart);
});

router.put("/update/:productId", (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    let item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = quantity;
        res.json({ message: "Item quantity updated", cart });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

router.delete("/remove/:productId", (req, res) => {
    const { productId } = req.params;
    cart = cart.filter(item => item.productId !== productId);
    res.json({ message: "Item removed", cart });
});

router.delete("/clear", (req, res) => {
    cart = [];
    res.json({ message: "Cart cleared" });
});

module.exports = router;
