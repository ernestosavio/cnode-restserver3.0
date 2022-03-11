const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');
const {esRoleValido, emailExiste, existeUserId} = require('../helpers/db-validators');

const {  
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
} = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La password es menor a 6 caracteres').isLength({min: 6}),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom( emailExiste ),
    //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // Esto es igual check('rol').custom( esRoleValido ),
    //check('rol').custom((rol) => {esRoleValido(rol) }),
    check('rol').custom( (rol) => esRoleValido(rol) ),
    validarCampos
], userPost);

router.put('/:id', [
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom(existeUserId),
    check('rol').custom( (rol) => esRoleValido(rol) ),
    validarCampos
],
userPut);

router.delete('/:id', [
    check('id', "No es un ID valido").isMongoId(),
    check('id').custom(existeUserId),
    validarCampos
], userDelete);

router.patch('/', userPatch);


module.exports = router;