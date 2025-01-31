const express = require('express');
const {getAdministrador, getVentasStats } = require('../controllers/UsuarioControllerAdministrador');

const router = express.Router();

router.get('/usuarios/getAdministrador', getAdministrador);
router.get('/usuarios/getVentasStats', getVentasStats );

module.exports = router;
