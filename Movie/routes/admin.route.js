const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Movie = require("../models/movie.model");
const Theatre = require("../models/theatre.model");
const Booking = require("../models/booking.model");

const { updateMovie, deleteMovie } = require("../controllers/movie.controller");
const upload = require("../middlewares/ImageUpload");

router.get("/dashboard", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const movies = await Movie.countDocuments({ isDelete: false });
    const theatres = await Theatre.countDocuments({ isDeleted: false });
    const bookings = await Booking.countDocuments();

    res.render("admin/dashboard", { users, movies, theatres, bookings });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({ isDelete: false });
    res.render("admin/movies", { movies });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/movie/edit/:id", async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id, isDelete: false });

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.render("admin/UpdateMovie", { movie });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/movie/update/:id", upload.single("movieImage"), async (req, res) => {
  await updateMovie(req, res);
});

router.post("/movie/delete/:id", async (req, res) => {
  await deleteMovie(req, res);
});

router.get("/theatres", async (req, res) => {
  try {
    const theatres = await Theatre.find({ isDeleted: false });
    res.render("admin/theatres", { theatres });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name")
      .populate({
        path: "showId",
        populate: { path: "movieId", select: "title" },
      });

    res.render("admin/bookings", { bookings });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;