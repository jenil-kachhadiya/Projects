const express = require("express");
const router = express.Router();

const { addShow, getAllShows, getShowById, updateShow, deleteShow} = require("../controllers/show.controller");

const { verifyToken } = require("../middlewares/AuthToken");

router.post("/AddShow", addShow);
router.get("/GetAllShow", getAllShows);
router.get("/GetShow:id", getShowById);
router.put("UpdateShow/:id", updateShow);
router.delete("DeleteShow/:id", deleteShow);

module.exports = router;