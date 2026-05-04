const Theatre = require("../models/theatre.model");

exports.addTheatre = async (req, res) => {
  try {
    const { name, location } = req.body;
    const theatre = await Theatre.create({name,location});

    res.status(201).json({
      message: "Theatre added successfully", data: theatre
    });

  } catch (error) {
    res.status(500).json({ message: "Error adding theatre", error: error.message});
  }
};


exports.getAllTheatres = async (req, res) => {
  try {
    let { search, sortBy, order } = req.query;

    sortBy = sortBy || "createdAt";
    order = order === "asc" ? 1 : -1;

    let query = { isDeleted: false };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    const theatres = await Theatre.find(query)
      .sort({ [sortBy]: order });

    res.status(200).json(theatres);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching theatres", error: error.message
    });
  }
};


exports.updateTheatre = async (req, res) => {
  try {
    const updated = await Theatre.findByIdAndUpdate(
      req.params.id,req.body,{ new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Theatre not found" });
    }

    res.status(200).json({
      message: "Theatre updated successfully", data: updated });

  } catch (error) {
    res.status(500).json({
      message: "Error updating theatre", error: error.message
    });
  }
};


exports.deleteTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true }, { new: true } );
    if (!theatre) {
      return res.status(404).json({ message: "Theatre not found"});
    }
    res.status(200).json({message: "Theatre deleted successfully"});
  } catch (error) {
    res.status(500).json({
      message: "Error deleting theatre", error: error.message
    });
  }
};