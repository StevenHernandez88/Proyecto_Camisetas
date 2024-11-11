const express = require('express');
const { getUsuario, login, cambiarContrasena, generarCodigoVerificacion, verificarCodigo} = require('../controllers/UsuarioController');

const router = express.Router();

router.get('/usuarios', getUsuario);
router.post('/login', login);
router.post('/cambiarContrasena', cambiarContrasena);
router.post('/generarCodigoVerificacion', generarCodigoVerificacion);
router.post('/verificarCodigo', verificarCodigo);

module.exports = router;
