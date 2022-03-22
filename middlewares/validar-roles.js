const {request, response} = require('express');


const esAdmin = (req = request, res = response, next) => {
    
    if (!req.userAuth){
        return res.status(500).json({
            msg: 'Se quiere verificar rol sin validar el token'
        })
    }

    const {rol, nombre} = req.userAuth;

    if (rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es ADM - No puede hacer esto`
        });
    }

    next();
}

const tieneRole = (...roles) => {

    return (req = request, res = response, next) => {

        if(!roles.includes(req.userAuth.rol)) {
            return res.status(401).json({
                msg: `El servicio uno de estos roles: ${roles}`
            })
        }

        next();
    }
}


module.exports = {
    esAdmin,
    tieneRole
}