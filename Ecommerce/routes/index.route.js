const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const validator = require("../middleware/validationUser.js")
const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const UploadImage = require("../middleware/uploadImage");
const subCategoryRoute = require("./subcategory.route");
const productRoute = require("./product.route"); 
const cartRoute = require("./cart.route")
const wishlistRoute = require("./wishlist.route")

router.post("/register",validator, UploadImage.single("image"), registerUser);
router.post("/login", loginUser);

router.use("/user", userRoute);
router.use("/categories", categoryRoute);
router.use("/subcategory", subCategoryRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute)
router.use("/wishlist", wishlistRoute);
module.exports = router;

/*
jenil => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDg5NjViNGYyZmVmNmYxNTIxNDI3YSIsImlhdCI6MTc3NTgwMTk2Nn0.S1O--L-2XQITRQr-0msTC4a7-BKpO2vCDT5y4i2g5dM

Anugrah => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDg5N2FkMWM4OGE4YzFjOTA2M2Y2YiIsImlhdCI6MTc3NTgwMjMxMn0.8WvxZpBU9mhy-xM29RWYBO0ClK7uXZXc5gfXqmW1ciY
*/