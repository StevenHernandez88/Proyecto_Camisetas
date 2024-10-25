const express = require('express');
const {getRatings, crearRatings, getComentariosPorModelo } = require('../controllers/RatingsController');

const router = express.Router();

router.get('/ratings/getRatings', getRatings);
router.post('/ratings/crearRatings', crearRatings);
router.post('/ratings/comentarios', getComentariosPorModelo);

module.exports = router;
