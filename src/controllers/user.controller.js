import User from "../models/userModel.js"

//CREAR USUARIO
export const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        const newUser = new User({name, email, password})
        const saveUser = await newUser.save()
        res.status(201).json({mensaje: "Usuario creado existosamente", saveUser})        
    } catch (error) {
        res.status(500).json({mensaje: "Error al crear el usuario", error})
    }
}
//OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({mensaje: "Estos son los usuarios:", users})
    } catch (error) {
        res.status(500).json({mensaje: "Error al obtener los usuarios"})
    }
}

//OBTENER USUARIO POR ID
export const getUserId = async(req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        res.status(200).json({mensaje: "usuario encontrado", user})
    } catch (error) {
        res.status(500).json({mensaje: "error id no encontrada", error})
    }
}

//ACTUALIZAR USUARIOS POR ID
export const upDateUser = async (req, res) => {
    try {
        const id = req.params.id
        const userUpdate =  await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true})
        if (!userUpdate) return res.status(404).json({ mensaje: "Usuario no encontrado"});
        res.status(200).json({mensaje:"usuario actualizado", userUpdate})
    } catch (error) {
        res.status(500).json({mensaje:"la actualizacion no pudo llervarse acabo", error})
    }
}

//ELIMINAR USUARIO POR ID
export const deleteUser = async (req,res) => {
    try {
        const id = req.params.id
        const userDelete = await User.findByIdAndDelete(id) 
        if (!userDelete) return res.status(404).json({mensaje:"Usuario no encontrado"})
        res.status(204).json({mensaje: "Usuario eliminado correctamente", deleteUser})
    } catch (error) {
        res.status(500).json({mensaje:"noo pudimos eliminar el usuario", error})
    }
}