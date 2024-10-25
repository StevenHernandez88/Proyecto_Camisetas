const express = require('express');
const { getUsuario, login } = require('../controllers/UsuarioController');

const router = express.Router();

router.get('/usuarios', getUsuario);
router.post('/login', login);

module.exports = router;
