const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/AuthToken");
const verifyRole = require("../middleware/VerifyRole");

const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus, cancelOrder
} = require("../controllers/order.controller");


router.post("/place-order", verifyToken, placeOrder);
router.get("/my-orders", verifyToken, getMyOrders);
router.put("/cancel-order/:id", verifyToken, cancelOrder);

// Admin
router.get("/all-orders", verifyToken, verifyRole("admin"), getAllOrders);
router.put("/update-status/:id", verifyToken, verifyRole("admin"), updateOrderStatus);

module.exports = router;