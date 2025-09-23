import Product from "../models/productModel.js";

//CREAR UN PRODUCTO
export const createProduct = async (req, res) => {
    try {
        const {name, type, price, image, sizes} = req.body
        const newProduct = new Product({name, type, price, image, sizes})
        const saveProduct = await newProduct.save()
        res.status(201).json({
            mensaje: "producto creado exitosamente",
            producto: saveProduct
          });
          
    } catch (error) {
        res.status(500).json({mensaje:"no pudimos crear el producto"})
    }
}

//OBTENER LOS PRODUCTOS
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({mensaje: "Estos son los Productos:", products})
    } catch (error) {
        res.status(500).json({mensaje:"Error al buscar los productos", error})
    }
}

//OBTENER LOS PRODUCTOS POR ID
export const getProductsId = async (req, res) => {
    try {
        const id = req.params.id
        const producto = await Product.findById(id)
        if (!producto) return res.status(404).json({mensaje: "producto no encontrado"})
        res.status(200).json({mensaje:"producto encontrado", producto})

    } catch (error) {
        res.status(500).json({mensaje:"Error al buscar el producto", error})
    }
}
// CONTROLADOR PARA ACTUALIZAR PRODUCTO
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        // Obtener producto actual
        const producto = await Product.findById(id);
        if (!producto) return res.status(404).json({ mensaje: "producto no encontrado" });

        // Actualizar campos simples
        if (updates.name) producto.name = updates.name;
        if (updates.price) producto.price = updates.price;
        if (updates.image) producto.image = updates.image;

        // Actualizar talles
        if (updates.sizes) {
            updates.sizes.forEach(newSize => {
                // Buscar talle existente
                const existing = producto.sizes.find(s => s.size === newSize.size);
                if (existing) {
                    existing.stock = newSize.stock; // actualizar stock
                } else {
                    producto.sizes.push(newSize); // agregar talle nuevo
                }
            });
        }

        const updatedProduct = await producto.save();
        res.status(200).json({ mensaje: "producto actualizado", productUpdate: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar el producto", error });
    }
}


//ELIMINAR UN PRODUCTO
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const productDeleted = await Product.findByIdAndDelete(id)
        if (!productDeleted) return res.status(404).json({mensaje: "No encontramos el producto"})
        res.status(204).json({mensaje: "Producto eliminado", productDeleted})
    } catch (error) {
        res.status(500).json({mensaje:"no se pudo realizar la accion", error})
    }
}


// controllers/productsController.js
export const searchProducts = async (req, res) => {
    try {
      const { q } = req.query;
  
      let products = [];
  
      if (q && q.trim() !== "") {
        // Buscar productos cuyo nombre contenga "q" (case-insensitive)
        products = await Product.find({
          name: { $regex: q, $options: "i" }
        });
      } else {
        // Si no hay "q", devolvemos array vacío
        products = [];
      }
  
      res.json({ products });
    } catch (error) {
      console.error("Error en búsqueda:", error);
      res.status(500).json({ error: "Error en búsqueda" });
    }
  };
