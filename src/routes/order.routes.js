import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createOrder, getOrders, getOrdersById, getOrdersUserById, getOrderByName, deleteOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/orders", authMiddleware, createOrder)
router.get("/orders", getOrders)
router.get("/orders/:id", getOrdersById)
router.get("/orders/user/:id", getOrdersUserById)
router.get("/orders/product/:name", getOrderByName)
router.delete("/orders/:id", deleteOrder)
export default router;