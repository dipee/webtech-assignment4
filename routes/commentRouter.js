const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Create a new comment
router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a comment by ID
router.get("/:id", getComment, (req, res) => {
  res.json(res.comment);
});

//update a comment by ID
router.patch("/:id", getComment, async (req, res) => {
  if (req.body.content != null) {
    res.comment.content = req.body.content;
  }
  try {
    const updatedComment = await res.comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete a comment by ID
router.delete("/:id", getComment, async (req, res) => {
  try {
    await res.comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all comments by product ID
router.get("/product/:id", async (req, res) => {
  try {
    const comments = await Comment.find({ productId: req.params.id });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all comments by user ID for a product
router.get("/user/:userId/product/:productId", async (req, res) => {
  try {
    const comments = await Comment.find({
      userId: req.params.userId,
      productId: req.params.productId,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get comment by ID
async function getComment(req, res, next) {
  let comment;
  try {
    comment = await Comment.findById(req.params.id);
    if (comment == null) {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.comment = comment;
  next();
}

module.exports = router;
