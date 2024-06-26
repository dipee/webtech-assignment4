const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Create a new order
router.post("/", async (req, res) => {
  //set cart to checked out
  await setCartToCheckedOut(req, res);
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an order by ID
router.get("/:id", getOrder, (req, res) => {
  res.json(res.order);
});

// get all orders of a user
router.get("/user/:id", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get order by ID
async function getOrder(req, res, next) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.order = order;
  next();
}

//set cart to checked out
async function setCartToCheckedOut(req, res) {
  const userId = req.body.userId;

  const cart = await Cart.findOne({
    userId: userId,
    isCheckOut: false,
  });
  //set cart to checked out
  cart.isCheckOut = true;
  cart.save();
}

module.exports = router;
