import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";



//registro
export const registrarUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashed, role: "admin"});
        await user.save();

        //generamos el token

    // Generar token
    const token = jwt.sign(
        {   
            id: user._id,
            role: user.role}, process.env.JWT_SECRET,
            { expiresIn: "1d" 
        });

   // ✅ Responder una sola vez
   res.status(201).json({
    mensaje: "Usuario registrado con éxito",
    token,
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});
    } catch (error) {   
        res.status(500).json({ error: error.message });
    }
}

//loguear para un usuario ya registrado

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
    
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(404).json({mensaje: "contraseña incorrecta"})

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET, {expiresIn: "1d"});
        

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
    }
}
