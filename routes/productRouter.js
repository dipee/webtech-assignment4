const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a product by ID
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// Update a product by ID
router.patch("/:id", getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.shippingCost != null) {
    res.product.shippingCost = req.body.shippingCost;
  }
  if (req.body.image != null) {
    res.product.image = req.body.image;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete a product by ID
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await res.product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.product = product;
  next();
}

module.exports = router;
