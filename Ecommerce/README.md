<E-Commerce Backend API>

A scalable and secure eCommerce backend built using Node.js, Express, and MongoDB.
This project handles user authentication, product management, cart, wishlist, and order functionalities.

# Features
• User Authentication (JWT )
• Product Management (CRUD)
• Cart Management
• Wishlist Functionality
• Order Management
• Image Upload Support (Multer)
• Input Validation (express-validator)
• Secure APIs with Middleware

# Tech Stack
• Backend: Node.js, Express.js
• Database: MongoDB, Mongoose
• Authentication: JWT (JSON Web Token)
• Validation: express-validator
• File Upload: Multer

# Project Structure
Ecommerce/
│
├── config/
│   └── dbConnection.js
│
├── controllers/
│   ├── cart.controller.js
│   ├── category.controller.js
│   ├── product.controller.js
│   ├── subcategory.controller.js
│   ├── user.controller.js
│   └── wishlist.controller.js
│
├── middleware/
│   ├── AuthToken.js
│   ├── UploadImage.js
│   ├── validationUser.js
│   └── VerifyRole.js
│
├── models/
│   ├── cart.model.js
│   ├── category.model.js
│   ├── product.model.js
│   ├── subCategory.model.js
│   ├── user.model.js
│   └── wishlist.model.js
│
├── routes/
│   ├── cart.route.js
│   ├── category.route.js
│   ├── index.route.js
│   ├── product.route.js
│   ├── subcategory.route.js
│   ├── user.route.js
│   └── wishlist.route.js
│
├── public/
├── uploads/
├── .env
├── app.js
├── package.json
└── package-lock.json
     

# Run Project
- Development mode
npm run dev

# API Endpoints
 Auth
- POST /register → Register user
- POST /login → Login user

 Products
- POST /add-product
- GET /get-products
- PUT /update/:id
- DELETE /delete/:id

 category
- POST /add-category
- GET /get-category
- PUT /update/:id
- DELETE /delete/:id

 sabCategory
- POST /add-subcategory
- GET /all-subcategories
- PUT /update/:id
- DELETE /delete/:id

 Cart
- POST /add-cart
- GET /get-cart
- PUT /update/:id
- DELETE /remove/:id

 Wishlist
- POST /add-wishlist
- GET /get-wishlist
- PUT /remove/:id

# Authentication
All protected routes require a JWT token in headers:
Authorization: Bearer <token>