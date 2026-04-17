const express = require("express");
const router = express.Router();
const { addTheatre, getAllTheatres, updateTheatre, deleteTheatre } = require("../controllers/theatre.controller");
const {verifyToken} = require("../middlewares/AuthToken")

router.post("/AddTheatre", verifyToken, addTheatre); 
router.get("/AllTheatres", getAllTheatres);
router.put("/UpdateTheatre/:id", verifyToken, updateTheatre);
router.delete("/DeleteTheatre/:id", verifyToken, deleteTheatre);

module.exports = router;