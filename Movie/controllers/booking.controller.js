const Booking = require("../models/booking.model");
const Show = require("../models/show.model");

exports.createBooking = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    let unavailableSeats = [];
    seats.forEach((seat) => {
      const seatData = show.seats.find((s) => s.seatNo === seat);

      if (!seatData || seatData.status === "booked") {
        unavailableSeats.push(seat);
      }
    });

    if (unavailableSeats.length > 0) {
      return res.status(400).json({ message: "Some seats already booked", seats: unavailableSeats });
    }

    show.seats.forEach((s) => {
      if (seats.includes(s.seatNo)) {
        s.status = "booked";
      }
    });
    await show.save();
    const totalAmount = seats.length * show.ticketPrice;

    const booking = await Booking.create({
      userId: req.user._id,
      showId,
      seats,
      totalAmount,
      paymentStatus: "completed",
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("userId", "name email")
      .populate({
        path: "showId",
        select: "showTime ticketPrice",
        populate: {
          path: "movieId", select: "title",
        },
      });

    res.status(201).json({
      message: "Booking successful", data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id, isDelete: false})
    .populate({
      path: "showId",
      select: "showTime ticketPrice",
      populate: { path: "movieId", select: "title"}
    }); 
    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isDelete: false })
      .populate("userId")
      .populate({
        path: "showId",
        populate: ["movieId", "theatreId"],
      });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.isDelete) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const show = await Show.findById(booking.showId);

    show.seats.forEach((s) => {
      if (booking.seats.includes(s.seatNo)) { s.status = "available" }
    });
    await show.save();

    booking.isDelete = true;
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};