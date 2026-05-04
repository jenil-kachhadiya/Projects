const express = require("express");
const router = express.Router();
const {AddProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/product.controller");
const { verifyToken } = require("../middleware/AuthToken");
const verifyRole = require('../middleware/VerifyRole')
const uploadImage = require("../middleware/uploadImage");

router.post("/add-product", verifyToken, verifyRole('admin'), uploadImage.array("images"), AddProduct);
router.get("/all-products", getAllProducts);
router.put("/update/:id", verifyToken, verifyRole('admin'), uploadImage.array("images"), updateProduct);
router.delete("/delete/:id", verifyToken, verifyRole('admin'), deleteProduct);

module.exports = router;