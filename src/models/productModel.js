import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        enum: ["hombre", "mujer", "kids", "unisex"],
        default: "unisex"
    },
    type: { 
        type: String, 
        enum: ["ropa", "calzado", "accesorio"], // opcional, para poder filtrar
        default: "ropa"
    },
    price: { type: Number, required: true },
    image: { type: String },
    sizes: [
        {
          size: { type: mongoose.Schema.Types.Mixed, required: true }, // permite string o número
          stock: { type: Number, required: false } // cantidad disponible por talle
        }
    ]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
