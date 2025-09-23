import express from "express";
import { createUser, getUsers, getUserId, upDateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router()

router.post("/", createUser)
router.get("/", getUsers)
router.get("/:id", getUserId)
router.put("/:id", upDateUser)
router.delete("/:id", deleteUser)

export default router
