const express = require('express');
const { getCategorias, crearCategoria } = require('../controllers/CategoriaController');

const router = express.Router();

router.get('/categorias/getCategorias', getCategorias);
router.post('/categorias/crearCategoria', crearCategoria);

module.exports = router;