import express from "express";
import { registrarUser, loginUser } from "../controllers/registro.controller.js";

const router = express.Router()

router.post("/register", registrarUser)
router.post("/login", loginUser)

export default router