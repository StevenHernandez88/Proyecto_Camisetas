const ModeloDAO = require('../daos/ModeloDAO');
const RatingsDAO= require('../daos/RatingsDAO');
const uploadImageToGoogleCloud = require('../utils/uploadModelo');

const modeloDAO = new ModeloDAO();

const getModelos = async (req, res) => {
    try {
        const modelos = await modeloDAO.getAllModelos();
        res.status(200).json(modelos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearModelo = async (req, res) => {
    try {
        const { descripcion, material, rating_id, stock} = req.body;
        const file = req.file;
        const activo = true;

        if (!file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo de imagen' });
        }

        // Subir imagen a Google Cloud y obtener la URL pública
        const url_modelo = await uploadImageToGoogleCloud(file);
        
        const modelo = { descripcion, material, rating_id, url_modelo, stock, activo};

        // Guardar modelo en la base de datos
        await modeloDAO.createModelo(modelo);

        res.status(201).json({ message: 'modelo creado exitosamente' });
    } catch (error) {
        console.error('Error en crearModelo:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getModelosConRatings = async (req, res) => {
    try {
        const modelos = await modeloDAO.getAllModelos();
        const ratingsDAO = new RatingsDAO();

        // Iterar sobre los modelos y obtener el promedio de ratings de cada uno
        for (let modelo of modelos) {
            const averageRating = await ratingsDAO.getAverageRatingByModelId(modelo.idmodelo);
            modelo.rating = averageRating;  // Añadir el rating promedio al modelo
        }

        res.status(200).json(modelos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const actualizarStock = async (req, res) => {
    try {
        const { cantidad, idmodelo } = req.body;

        // Actualizamos el stock del modelo
        const nuevoStock = await modeloDAO.actualizarStockModelo(cantidad, idmodelo);

        res.status(200).json({ message: 'Stock actualizado', stock: nuevoStock });
    } catch (error) {
        console.error('Error en actualizarStock:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const obtenerStock = async (req, res) => {
    try {
        const { idmodelo } = req.params;

        // Obtener el stock del modelo
        const stock = await modeloDAO.getStockPorIdmodelo(idmodelo);

        res.status(200).json({ stock });
    } catch (error) {
        console.error('Error al obtener stock', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};







const getAllModelosWithStatus = async (req, res) => {
    try {
        const modelos = await modeloDAO.getAllModelosWithStatus();
        res.status(200).json(modelos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const toggleModelStatus = async (req, res) => {
    try {

        //console.log(req.body);
        const { idmodelo, activo } = req.body;
        
        const modeloActualizado = await modeloDAO.toggleModelStatus(idmodelo, activo);
        res.status(200).json(modeloActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getModelosOrdenados = async (req, res) => {
    try {
        const { criterio } = req.query;
        const modelos = await modeloDAO.getModelosOrdenadosPor(criterio);
        res.status(200).json(modelos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getModelos,
    crearModelo,
    getModelosConRatings,
    actualizarStock,
    obtenerStock,
    getAllModelosWithStatus,
    toggleModelStatus,
    getModelosOrdenados
};
