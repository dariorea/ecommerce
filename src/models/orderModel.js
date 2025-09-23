import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true },
    products: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Product", 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            size: { 
                type: String, 
                required: true // así obligamos a que siempre elijan un talle
            }

        }
    ]
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;