const express = require('express')
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const userRoute = require('../routes/user.route')
const theatreRoute = require('../routes/theatre.route')
const movieRoute = require('../routes/movie.route')
const showRoute = require('../routes/show.route')
const bookingRoute = require('../routes/booking.route')
const adminRoute = require('../routes/admin.route')

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use("/user", userRoute);
router.use("/theatre", theatreRoute)
router.use("/movie", movieRoute)
router.use("/show", showRoute)
router.use("/booking", bookingRoute)
router.use("/admin", adminRoute)

module.exports = router;
