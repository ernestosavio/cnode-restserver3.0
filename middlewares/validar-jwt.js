const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const User = require('../models/user');


const validarJWT = async(req = request, res = response, next) => {
    
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        req.uid = uid;

        const userAuth = await User.findById(uid);

        if (!userAuth){
            return res.status(401).json({
                msg: 'Token no valido - User no existente'
            })
        }

        // Verificar si el uid.estado == true
        if (!userAuth.estado) {
            return res.status(401).json({
                msg: 'Token no valido - User con estado false'
            })
        }

        req.userAuth = userAuth
        next()

    } catch (error) {
        console.log('ERROR:\n', error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}


module.exports = {
    validarJWT
}
