const express = require('express');
const { getEstampas, crearEstampa, obtenerImagenes} = require('../controllers/EstampaController');
const multer = require('multer');
const router = express.Router();

// Configuración de multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/estampas/getEstampas', getEstampas);
router.post('/estampas/crearEstampa', upload.single('imagen'), crearEstampa);
router.get('/estampas/obtenerImagenes', obtenerImagenes);

module.exports = router;
