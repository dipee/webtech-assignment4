# Simple E-commerce API

This is a simple REST API for an e-commerce system built using Node.js, Express.js, and MongoDB.

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/dipee/webtech-assignment4
```

2. Navigate to the project directory:

```bash
cd webtech-assignment4
```

3. Install dependencies:

```bash
npm install
```

4. Set up MongoDB:

   - Make sure MongoDB is installed and running on your machine.
   - You can configure the MongoDB connection URL in `.env`.

5. Create a .env file in the root directory of your project. Add your MongoDB connection URL in the format MONGODB_URL=your_connection_url

6. Start the server:

```bash
npm start
```

## API Endpoints

### Users

- POST /users: Create a new user
- GET /users: Get all users
- GET /users/:id: Get a user by ID
- PATCH /users/:id update a user
- DELETE /users/:id delete a user

### Products

- POST /products: Create a new product
- GET /products: Get all products
- GET /products/:id: Get a product by ID
- PATCH /products/:id update a product by ID
- DELETE /products/:id delete product

### Carts

- POST /carts: Create a new cart
- GET /carts: Get all carts
- GET /carts/:id: Get a cart by ID
- GET /carts/user/:id: get all carts of a u
- POST /carts/:id : add product to cartser
- DELETE /carts/product/:id : remove item from cart
- DELETE /carts/:id : delete cart by id

### Comments

- POST /comments: Create a new comment
- GET /comments: Get all comments
- GET /comments/:id: Get a comment by ID
- PATCH /comments/:id update comment
- DELETE /comments/:id delete a comment
- GET /comments/product/:id get comments of a product
- GET /comments/user/:userId/product/:productId : get all coments of a user for a product

### Orders

- POST /orders: Create a new order
- GET /orders: Get all orders
- GET /orders/:id: Get an order by ID
