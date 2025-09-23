// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";



export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Acceso denegado" });

    const token = authHeader.split(" ")[1]; // "Bearer token"

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).json({ error: "Token no válido" });
    }
}

export const adminMiddleware = (req, res, next)=> {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Acceso denegado. Solo administradores" });
    }
    next();
}