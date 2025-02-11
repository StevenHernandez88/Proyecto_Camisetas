const EstampaDAO = require('../daos/EstampaDAO');
const uploadImageToGoogleCloud = require('../utils/uploadImage');

const estampaDAO = new EstampaDAO();

const getEstampasActivas = async (req, res) => {
    try {
        const estampas = await estampaDAO.getAllEstampasActivas();
        res.status(200).json(estampas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearEstampa = async (req, res) => {
    try {

        const { nombre, descripcion, artista_id, categoria_id } = req.body;
        const file = req.file;
        const activo = true;

        if (!file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo de imagen' });
        }

        // Subir imagen a Google Cloud y obtener la URL pública
        const url_imagen = await uploadImageToGoogleCloud(file);
        
        const estampa = {nombre, descripcion, artista_id, url_imagen, categoria_id, activo};

        // Guardar estampa en la base de datos
        await estampaDAO.createEstampa(estampa);

        res.status(201).json({ message: 'Estampa creada exitosamente' });
    } catch (error) {
        console.error('Error en crearEstampa:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const obtenerImagenes = async (req, res) => {
    try {
        const imagenes = await estampaDAO.obtenerImagenes();
        res.status(200).json(imagenes);
    } catch (error) {
        console.error('Error al obtener las imágenes:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor al obtener imágenes' });
    }
};




const getAllEstampas = async (req, res) => {
    try {
        const estampas = await estampaDAO.getAllEstampas();
        res.status(200).json(estampas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const toggleStampStatus = async (req, res) => {
    try {
        //console.log(req.body);
        const { idestampas, activo } = req.body;
        
        const estampaActualizada = await estampaDAO.toggleStampStatus(idestampas,activo);
        res.status(200).json(estampaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    getEstampasActivas,
    crearEstampa,
    obtenerImagenes,
    getAllEstampas,
    toggleStampStatus
};
