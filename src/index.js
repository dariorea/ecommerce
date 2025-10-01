import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import registroRoutes from "./routes/registro.routes.js";
import paymentsRoutes from "./routes/payments.routes.js"
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config()
connectDB()

const app = express()

// Servir la carpeta "images" de forma pública
app.use(express.static(path.join(process.cwd(), "public")));
app.use(cors());
app.use(express.json())  //para parsear los archivos JSON
app.use(express.urlencoded({ extended: true }));

//RUTAS 
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api", orderRoutes)
app.use("/api/auth", registroRoutes)
app.use("/api/payments", paymentsRoutes)

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log(`escuchando desde el puerto ${PORT}`)
})
