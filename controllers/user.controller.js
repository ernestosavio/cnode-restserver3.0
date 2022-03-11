const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async(req = request,res = response) => {

    const {limit=5, desde=0} = req.query;
    const query = {estado: true};

    const resp = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])
    .then(values => {
        const total = values[0];
        const users = values[1];
        res.json({
            msg: 'GET api - Controller',
            'Amount of users': total,
            users
    })
    }).catch(error => {
        console.log(error);
        res.json({
            msg: 'Error en los limites',
    })
});
}

const userPost = async (req = request,res = response) => {
    const {nombre, email, password, rol} = req.body;
    const user = new User({nombre, email, password, rol});


    // Hashear la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    // Guardar en DB
    await user.save();

    res.json({
        msg: 'POST api - Controller',
        user: user
    });
}

const userPut = async (req = request,res = response) => {

    const id = req.params.id
    const {_id, password, google, email,  ...resto} = req.body;

    // Validar contra DB
    if(password) {
        // Hashear la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT api - Controller',
        id: id,
        user
    });
}

const userDelete = async(req = request,res = response) => {

    const id = req.params.id;

    //Borrar fisicamente
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {estado: false})

    res.json({
        msg: 'DELETE api - Controller',
        user
    });
}

const userPatch = (req = request,res = response) => {
    res.json({
        msg: 'PATCH api - Controller'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}



