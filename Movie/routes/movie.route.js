const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.controller");
const upload = require("../middlewares/ImageUpload");

router.post("/AddMovie", upload.single("movieImage"), movieController.addMovie);
router.get("/AllMovie", movieController.getAllMovies);
router.put("/UpdateMovie/:id", upload.single("movieImage"), movieController.updateMovie);
router.delete("/DeleteMovie/:id", movieController.deleteMovie);

module.exports = router;