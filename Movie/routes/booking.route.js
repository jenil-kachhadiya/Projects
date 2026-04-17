const express = require("express");
const router = express.Router();

const { createBooking, getMyBookings, getAllBookings, cancelBooking} = require("../controllers/booking.controller");

const { verifyToken } = require("../middlewares/AuthToken");
const verifyRole = require("../middlewares/verifyRole");

router.post("/Booking", verifyToken, createBooking);
router.get("/MyBooking", verifyToken, getMyBookings);
router.get("/AllBooking", verifyToken, verifyRole("admin"), getAllBookings);
router.delete("/CancelBooking/:id", verifyToken, cancelBooking);

module.exports = router;
