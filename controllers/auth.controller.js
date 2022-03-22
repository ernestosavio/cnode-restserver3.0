const bcryptjs = require("bcryptjs");
const { response, request } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const User = require('../models/user');


const login = async(req = request, res = response) => {

    const {email, password} = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctas - EMAIL'
            })
        }
        // Verificar si el user esta activo
        if (user.estado == false) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctas - Status: FALSE'
            })
        }

        // Verificar password
        const validPass = bcryptjs.compareSync(password, user.password);
        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctas - PASSWORD'
            })
        }

        // Generar el JWT
        const token = await generarJWT((user.id))

        res.json({
            msg: 'Login ok',
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal'
        })     
    }
}


module.exports = {
    login
}