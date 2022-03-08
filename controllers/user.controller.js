const {request, response} = require('express');

const userGet = (req = request,res = response) => {

    const {q, nombre = 'No name', apikey, page=1, limit=10} = req.query;

    res.json({
        msg: 'GET api - Controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPost = (req = request,res = response) => {
    res.json({
        msg: 'POST api - Controller'
    });
}

const userPut = (req = request,res = response) => {

    const id = req.params.id

    res.json({
        msg: 'PUT api - Controller',
        id: id
    });
}

const userDelete = (req = request,res = response) => {
    res.json({
        msg: 'DELETE api - Controller'
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



