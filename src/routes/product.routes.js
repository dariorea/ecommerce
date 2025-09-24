import express from "express";
import {authMiddleware, adminMiddleware} from "../middlewares/authMiddleware.js";
import { createProduct,
        getProducts, 
        getProductsId, 
        updateProduct, 
        deleteProduct, 
        searchProducts } from "../controllers/product.controller.js";

const router = express.Router()

router.post("/", authMiddleware, adminMiddleware, createProduct)
router.get("/search", searchProducts);
router.get("/", getProducts)
router.get("/:id", getProductsId)
router.put("/:id", authMiddleware, adminMiddleware, updateProduct)
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct)


export default router