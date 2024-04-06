const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://dipen2052:d9848881586@portfolio.hself86.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database!");
  });

// Define Mongoose Models
const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
// const Comment = require("./models/Comment");
// const Order = require("./models/Order");

// Define Routes
const userRoutes = require("./routes/userRouter");
const productRoutes = require("./routes/productRouter");
const cartRoutes = require("./routes/cartRouter");
// const commentRoutes = require("./routes/commentRoutes");
// const orderRoutes = require("./routes/orderRoutes");

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
// app.use("/comments", commentRoutes);
// app.use("/orders", orderRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
