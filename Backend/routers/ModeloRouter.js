const express = require('express');
const { getModelos, crearModelo, getModelosConRatings, actualizarStock, obtenerStock, getAllModelosWithStatus, toggleModelStatus, getModelosOrdenados, getVentas} = require('../controllers/ModeloController');
const multer = require('multer');
const router = express.Router();

// Configuración de multer para manejar la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/modelo/getModelos', getModelos);
router.post('/modelo/crearModelo', upload.single('modelo'), crearModelo);
router.get('/modelo/getModelosConRatings', getModelosConRatings);
router.post('/modelo/actualizarStock', actualizarStock);
router.get('/modelo/:idmodelo/stock', obtenerStock);

//Nuevo
router.get('/modelo/getAllModelosWithStatus', getAllModelosWithStatus);
router.post('/modelo/toggleModelStatus', toggleModelStatus);

router.get('/modelo/getModelosOrdenados', getModelosOrdenados);
router.get('/modelo/getVentas', getVentas);


module.exports = router;
