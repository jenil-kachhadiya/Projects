const Show = require("../models/show.model");

const generateSeats = () => {
  let seats = [];
  const rows = ["A", "B", "C", "D", "E"];
  const cols = 10;

  rows.forEach(row => {
    for (let i = 1; i <= cols; i++) {
      seats.push({
        seatNo: `${row}${i}`
      });
    }
  });

  return seats;
};

exports.addShow = async (req, res) => {
  try {
    const { movieId, theatreId, showTime, ticketPrice } = req.body;

    const show = await Show.create({ movieId, theatreId, showTime, ticketPrice,seats: generateSeats()});

    res.status(201).json({
      message: "Show created successfully",
      data: show
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllShows = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const shows = await Show.find({ isDelete: false })
      .populate("movieId")
      .populate("theatreId")
      .sort({ [sortBy]: order });

    res.status(200).json(shows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate("movieId")
      .populate("theatreId");

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(show);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateShow = async (req, res) => {
  try {
    const updated = await Show.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json({
      message: "Show updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(
      req.params.id,{ isDeleted: true },{ new: true });

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json({ message: "Show deleted successfully"});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
