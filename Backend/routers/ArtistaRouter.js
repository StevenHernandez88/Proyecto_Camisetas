const express = require('express');
const { getArtistas, crearUsuarioArtista, getInformacionArtista } = require('../controllers/UsuarioControllerArtista');

const router = express.Router();

router.get('/usuarios/getArtistas',getArtistas);
router.post('/usuarios/crearUsuarioArtista', crearUsuarioArtista);
router.post('/usuarios/getInformacionArtista', getInformacionArtista);

module.exports = router;
