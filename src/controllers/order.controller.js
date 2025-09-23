import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";



//CREAR UNA ORDEN
export const createOrder = async (req, res) => {
    try {
        const idUser = req.user.id
        const {products} = req.body

        //verificar que el usuario exista
        const user = await User.findById(idUser);
        if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

        //verificar que el haya el producto que ordenamos

        for (const item of products) {
            const product = await Product.findById(item.product);
            if(!product) {
                return res.status(404).json({ mensaje: `Producto con ID ${item.product} no encontrado` });
            }
                // Buscar el talle correcto
                const sizeEntry = product.sizes.find(s => s.size === item.size);
                if (!sizeEntry) {
                    return res.status(400).json({ mensaje: `El talle ${item.size} no existe para ${product.name}` });
                }
    
                // Verificar stock suficiente
                if (sizeEntry.stock < item.quantity) {
                    return res.status(400).json({ mensaje: `No hay stock suficiente para ${product.name} - Talle ${item.size}` });
                }
    
                // Restar stock del talle correcto
                sizeEntry.stock -= item.quantity;
    
            await product.save();
        }

        const newOrder = new Order({usuario: idUser, products});
        const savedOrder = await newOrder.save();
        const orderPopulate = await Order.findById(savedOrder._id)
        .populate("usuario", "name email")
        .populate("products.product", "name price")

        res.status(201).json({mensaje:"orden creada", orderPopulate});

    } catch (error) {
        res.status(500).json({mensaje: "fallo al crear la orden", error: error.message});
    }
}

//TRAER TODAS LAS ORDENES

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("usuario", "name email")
        .populate("products.product", "name price")
        if (!orders) return res.status(404).json({mensaje:"no encontramos ordenes"});
        res.status(200).json({mensaje: "estas son las ordenes", orders});
    } catch (error) {
        res.status(500).json({mensaje:"error al buscar las ordenes", error: error.message});
    }
}

//TRAER UNA ORDEN POR ID

export const getOrdersById = async (req, res) => {
    try {
        const id = req.params.id
        const order = await Order.findById(id)
        if(!order) return res.status(404).json({mensaje: "no encontramos la orden"})
        res.status(200).json({mensaje: "encotramos la orden", order})
    } catch (error) {
        res.status(500).json({mensaje: "error al traer la orden", error: error.message});
    }
}

//TRAER TODAS LAS ORDENES DE UN MISMO USUARIO

export const getOrdersUserById = async (req, res) => {
    try {
        const id = req.params.id
        const orders = await Order.find({usuario:id})
        .populate("usuario", "name email")
        .populate("products.product", "name price")

        if(!orders || orders.length === 0) return res.status(404).json({mensaje: "no se encontraron ordenes para este usuario"})
        res.status(200).json({mensaje: "estas son las ordenes del usuario:", orders})    
    } catch (error) {
        res.status(500).json({mensaje:"error al buscar el usuario por id", error: error.mesagge})
    }
}

//TRAER UNA ORDEN POR EL NOMBRE DE UN PRODUCTO

export const getOrderByName = async (req, res) => {
    try {
        const {name} = req.params

        const orders = await Order.find()
        .populate("usuario", "name email")
        .populate("products.product", "name price");

        //filtramos las ordenes que tengan el producto name
        const filteredOrders = orders.filter( order => order.products.some(p => p.product && p.product.name.toLowerCase() === name.toLowerCase()))
        if (filteredOrders.length === 0) return res.status(404).json({ mensaje: `No se encontraron órdenes con el producto: ${name}`});
        
        res.status(200).json({ mensaje: "Órdenes encontradas", orders: filteredOrders });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar órdenes", error: error.message });
    }
}


export const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id
        const orders = await Order.findByIdAndDelete(id)
        res.status(204).json({mensaje: "orden borrada", orders})
    } catch (error) {
        res.status(500)-json({mensaje: "fallo", error})
    }   
}