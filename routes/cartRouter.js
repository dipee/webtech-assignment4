const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Create a new cart
router.post("/", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all carts
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a cart by ID
router.get("/:id", getCart, (req, res) => {
  res.json(res.cart);
});

// Update a product from user's cart
router.patch("/:id", getCart, async (req, res) => {
  if (req.body.userId != null) {
    res.cart.userId = req.body.userId;
  }
  if (req.body.products != null) {
    res.cart.products = req.body.products;
  }
  try {
    const updatedCart = await res.cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware to get cart by ID
async function getCart(req, res, next) {
  let cart;
  try {
    cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.cart = cart;
  next();
}

module.exports = router;
