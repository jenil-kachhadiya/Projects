const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/AuthToken');
const {getAllUser,updateProfile,logout} = require('../controllers/user.controller');

router.get("/users", verifyToken, getAllUser);
router.put("/profile", verifyToken, updateProfile);
router.delete("/profile", verifyToken, logout);

module.exports = router;
