const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol: rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe`);
    }
}

const emailExiste = async(email = '') => {
    const existeEmail = await User.findOne({email: email})
    if (existeEmail) {
        throw new Error(`El email: ${email} ya existe`);
    }
}

const existeUserId = async(id = '') => {
    const existeUser = await User.findById(id);
    if (!existeUser) {
        throw new Error(`El id: ${id} no existe`);
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUserId
}