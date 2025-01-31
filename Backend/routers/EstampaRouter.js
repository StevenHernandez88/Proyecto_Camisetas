const express = require('express');
const { getEstampasActivas, crearEstampa, obtenerImagenes, getAllEstampas, toggleStampStatus} = require('../controllers/EstampaController');
const multer = require('multer');
const router = express.Router();

// Configuración de multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/estampas/getEstampasActivas', getEstampasActivas);
router.post('/estampas/crearEstampa', upload.single('imagen'), crearEstampa);
router.get('/estampas/obtenerImagenes', obtenerImagenes);


router.get('/estampas/getAllEstampas', getAllEstampas);
router.post('/estampas/toggleStampStatus', toggleStampStatus);

module.exports = router;
