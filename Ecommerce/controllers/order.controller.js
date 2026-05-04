const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/user.model");

exports.placeOrder = async (req, res) => {
    try {
        let userId = req.user.id;
        let { address, paymentMethod } = req.body;

        let cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.json({ message: "Cart is empty" });
        }

        let orderItems = cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));

        let totalAmount = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        let order = await Order.create({
            userId,
            items: orderItems,
            totalAmount,
            address,
            paymentMethod
        });

        await Cart.findOneAndUpdate(
            { userId },
            { items: [], totalAmount: 0 }
        );

        let user = await User.findById(userId);

        if (user && user.email) {
            await sendEmail(
                user.email,
                "Order Confirmed",
                `Your order has been placed successfully. Total amount: ₹${totalAmount}`
            );
        }

        return res.json({
            message: "Order placed successfully",
            data: order
        });

    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        let userId = req.user.id;

        let orders = await Order.find({ userId })
            .populate("items.productId", "name price images");

        return res.json({
            message: "Orders fetched",
            data: orders
        });

    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        let orders = await Order.find()
            .populate("userId", "name email")
            .populate("items.productId", "name price images");

        return res.json({
            message: "All orders",
            data: orders
        });

    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error.message
        });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        let { id } = req.params;
        let { status } = req.body;

        let order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.json({ message: "Order not found" });
        }

        return res.json({
            message: "Order status updated",
            data: order
        });

    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error.message
        });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        let userId = req.user.id;
        let { id } = req.params;

        let order = await Order.findOneAndUpdate(
            { _id: id, userId },
            { status: "cancelled" },
            { new: true }
        );

        if (!order) {
            return res.json({ message: "Order not found" });
        }

        return res.json({
            message: "Order cancelled",
            data: order
        });

    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error.message
        });
    }
};