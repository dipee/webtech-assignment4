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

//get all carts of a user
router.get("/user/:id", async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.id });
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add product to cart
router.post("/:id", getCart, async (req, res) => {
  res.cart.products.push(req.body);
  try {
    const updatedCart = await res.cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// remove item from cart
router.delete("/:id", getCart, async (req, res) => {
  res.cart.products.pull(req.body);
  try {
    const updatedCart = await res.cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete a cart by ID
router.delete("/:id", getCart, async (req, res) => {
  try {
    await res.cart.deleteOne();
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
