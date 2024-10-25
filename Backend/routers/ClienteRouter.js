const express = require('express');
const {getClientes, crearUsuarioCliente, getInformacionCliente } = require('../controllers/UsuarioControllerCliente');

const router = express.Router();

router.get('/usuarios/getCliente', getClientes);
router.post('/usuarios/crearUsuarioCliente', crearUsuarioCliente);
router.post('/usuarios/getInformacionCliente', getInformacionCliente);


module.exports = router;
