import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("conectado a MONGO DB")
    } catch (error) {
        console.error("error de conexion", error)
    }
}

export default connectDB