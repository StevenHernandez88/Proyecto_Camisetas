const express = require('express');
const { getCamisetas, crearCamisetas } = require('../controllers/CamisetasController');

const router = express.Router();

router.get('/camisetas/getCamisetas', getCamisetas);
router.post('/camisetas/crearCamisetas', crearCamisetas);

module.exports = router;
