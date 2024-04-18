const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config(); // Load environment variables from .env file

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to the database!");

    // Once connected, define Mongoose Models
    const User = require("./models/User");
    const Product = require("./models/Product");
    const Cart = require("./models/Cart");
    const Comment = require("./models/Comment");
    const Order = require("./models/Order");
    const Payment = require("./models/Payment");

    // Function to create admin user
    const createAdminUser = async () => {
      let admin;
      try {
        admin = await User.findOne({ email: "a@a.a" });
        console.log(admin);
        if (!admin) {
          await User.create({
            name: "admin admin admin",
            email: "a@a.a",
            password: "admin",
            isAdmin: true,
          });
          console.log("Admin user created successfully!");
        } else {
          console.log("Admin user already exists.");
        }
      } catch (err) {
        console.error("Error creating admin user:", err);
      }
    };

    // Invoke the function to create admin user
    createAdminUser();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Define Routes
const userRoutes = require("./routes/userRouter");
const productRoutes = require("./routes/productRouter");
const cartRoutes = require("./routes/cartRouter");
const commentRoutes = require("./routes/commentRouter");
const orderRoutes = require("./routes/orderRouter");
const paymentRoutes = require("./routes/paymentRouter");

// Add cors to allow cross-origin requests
app.use(cors());

// Use routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/comments", commentRoutes);
app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
