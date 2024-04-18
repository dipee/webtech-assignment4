const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

//get  cart of a user which is not checked out by filtering the isCheckOut field
router.get("/user/:userID", async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.params.userID,
      isCheckOut: false,
    });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get the cart of a user which is not checked out by filtering the isCheckOut field and addd products to the cart
router.post("/user/:userId", async (req, res) => {
  try {
    // get one cart of a user which is not checked out
    const cart = await Cart.findOne({
      userId: req.params.userId,
      isCheckOut: false,
    });

    // if cart is not found, create a new cart
    if (!cart) {
      const newCart = await Cart.create({
        userId: req.params.userId,
        isCheckOut: false,
        products: [
          {
            productId: req.body.productId,
            quantity: req.body.quantity,
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
          },
        ],
      });
      return res.json(newCart);
    }

    // get the list of products in the cart
    const product = cart.products.find((product) => {
      return product.productId == req.body.productId;
    });

    if (product) {
      //if product is already in the cart, increment the quantity
      product.quantity += req.body.quantity;
    }
    //if product is not in the cart, add the product to the cart
    else {
      cart.products.push(req.body);
    }

    //save the cart
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// rdecrease qty from cart
router.delete("/:cartId/product/:productId", async (req, res) => {
  // get the cart by id
  const cart = await Cart.findById(req.params.cartId);
  // get the product by id
  const product = cart.products.find((product) => {
    return product.productId == req.params.productId;
  });
  // reduce the quantity of the product by 1
  product.quantity -= 1;
  // if the quantity is 0, remove the product from the cart
  if (product.quantity == 0) {
    cart.products = cart.products.filter((product) => {
      return product.productId != req.params.productId;
    });
  }
  // save the cart
  await cart.save();
  res.json(cart);
});

// remove item from cart
router.delete("/:cartId/remove_product/:productId", async (req, res) => {
  // get the cart by id
  const cart = await Cart.findById(req.params.cartId);
  // remove product from cart
  cart.products = cart.products.filter((product) => {
    return product.productId != req.params.productId;
  });

  // save the cart
  await cart.save();
  res.json(cart);
});

// delete all carts
router.delete("/", async (req, res) => {
  try {
    await Cart.deleteMany();
    res.json({ message: "All carts deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
