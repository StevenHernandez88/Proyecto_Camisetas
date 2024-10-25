const express = require('express');
const { getPedidos, crearPedido } = require('../controllers/PedidosController');

const router = express.Router();

router.get('/pedidos/getPedidos', getPedidos);
router.post('/pedidos/crearPedido', crearPedido);

module.exports = router;
