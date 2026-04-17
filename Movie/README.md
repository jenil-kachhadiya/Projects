# 🎬 Movie Booking Backend API

A full-featured Movie Ticket Booking Backend built using Node.js, Express, MongoDB, and Mongoose, with authentication, seat booking logic, and Cloudinary image upload.

# Features
- User Authentication (JWT)
- User Profile Management
- Theatre Management
- Movie Management (with image upload)
- Show Scheduling
- Seat Selection & Booking System
- Booking & Payment Status
- Soft Delete Support
- Cloudinary Image Upload
- Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB (Mongoose)
* Authentication: JWT
* File Upload: Multer + Cloudinary
* Environment Variables: dotenv

# Project Structure
Movie/
│── config/
│   └── DBconnection.js
│
│── controllers/
│   ├── user.controller.js
│   ├── movie.controller.js
│   ├── theatre.controller.js
│   ├── show.controller.js
│   └── booking.controller.js
│
│── models/
│   ├── user.model.js
│   ├── movie.model.js
│   ├── theatre.model.js
│   ├── show.model.js
│   └── booking.model.js
│
│── routes/
│   ├── index.route.js
│   ├── user.route.js
│   ├── movie.route.js
│   ├── theatre.route.js
│   ├── show.route.js
│   └── booking.route.js
│
│── middlewares/
│   ├── AuthToken.js
│   └── verifyRole.js
│
│── utils/
│   └── cloudinary.js
│
│── app.js
│── .env
│── package.json

# Installation
git clone https://github.com/jenil-kachhadiya/projects.git
cd movie-booking
npm install

# Environment Variables (.env)
- PORT=1337
- MONGO_URI=your_mongodb_connection
- SECRET_KEY=jwt_secret

- CLOUD_NAME=your_cloudinary_name
- API_KEY=your_cloudinary_key
- API_SECRET=your_cloudinary_secret

# Run Server
npm run dev


* Server will start on:
http://localhost:1337

# Authentication
JWT Token required for protected routes
Send token in header:
Authorization: Bearer YOUR_TOKEN

## API Endpoints

# User
* POST /api/register → Register user
* POST /api/login → Login user
* GET /api/user/users → Get all users
* PUT /api/user/profile → Update profile
* DELETE /api/user/profile → Soft delete account
# Movie
* POST /api/movie → Add movie (with image)
* GET /api/movie → Get all movies
* GET /api/movie/:id → Get movie by ID
* PUT /api/movie/:id → Update movie
* DELETE /api/movie/:id → Delete movie
# Theatre
* POST /api/theatre → Add theatre
* GET /api/theatre → Get all theatres
# Show
* POST /api/show → Create show
* GET /api/show → Get all shows
* GET /api/show/:id → Get show by ID
* PUT /api/show/:id → Update show
* DELETE /api/show/:id → Delete show
# Booking
* POST /api/booking → Book seats
* GET /api/booking/my → Get user bookings
* GET /api/booking → Get all bookings (admin)
* DELETE /api/booking/:id → Cancel booking

# Seat Booking Logic
* Seats stored inside Show Model
Each seat has:
- seatNo
- status (available / booked)
- Booking:
- Checks availability
- Marks selected seats as booked
- Calculates total amount

# Image Upload (Cloudinary)
Images uploaded using Multer
Stored on Cloudinary
Saved URL in database

# Important Concepts Used
MVC Architecture
Middleware (Auth, Role-based access)
JWT Authentication
MongoDB Population
REST API Design


<Jenil-Kachhadiya>