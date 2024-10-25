const express = require('express');
const { getDetallesPedidos, crearDetallesPedidos } = require('../controllers/DetallesPedidosController');

const router = express.Router();

router.get('/detallesPedidos/getDetallesPedidos', getDetallesPedidos);
router.post('/detallesPedidos/crearDetallesPedidos', crearDetallesPedidos);

module.exports = router;
