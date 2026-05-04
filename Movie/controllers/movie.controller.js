const Movie = require("../models/movie.model");

exports.addMovie = async (req, res) => {
  try {
    const data = {
      ...req.body,
      movieImage: req.file ? req.file.path : undefined,
    };

    if (req.body.genre) {
      data.genre = req.body.genre.split(",").map((g) => g.trim());
    }

    const movie = await Movie.create(data);

    return res.status(201).json({
      message: "Registered successfully",
      data: movie,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const movies = await Movie.find({ isDelete: false }).sort({
      [sortBy]: order,
    });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie || movie.isDelete) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.body.genre) {
      data.genre = req.body.genre.split(",").map((g) => g.trim());
    }

    if (req.file) {
      data.movieImage = req.file.path;
    }

    const updated = await Movie.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (req.originalUrl.startsWith("/admin")) {
      return res.redirect("/admin/movies");
    }

    res.status(200).json({
      message: "Movie updated successfully",
      data: updated,
    });
  } catch (error) {
    if (req.originalUrl.startsWith("/admin")) {
      return res.status(500).send(error.message);
    }

    res.status(500).json({ error: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true },
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (req.originalUrl.startsWith("/admin")) {
      return res.redirect("/admin/movies");
    }

    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    if (req.originalUrl.startsWith("/admin")) {
      return res.status(500).send(error.message);
    }

    res.status(500).json({ error: error.message });
  }
};
