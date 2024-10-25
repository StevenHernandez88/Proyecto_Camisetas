const EstampaDAO = require('../daos/EstampaDAO');
const uploadImageToGoogleCloud = require('../utils/uploadImage');

const estampaDAO = new EstampaDAO();

const getEstampas = async (req, res) => {
    try {
        const estampas = await estampaDAO.getAllEstampas();
        res.status(200).json(estampas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearEstampa = async (req, res) => {
    try {

        const { nombre, descripcion, artista_id, categoria_id } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo de imagen' });
        }

        // Subir imagen a Google Cloud y obtener la URL pública
        const url_imagen = await uploadImageToGoogleCloud(file);
        
        const estampa = {nombre, descripcion, artista_id, url_imagen, categoria_id};

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


module.exports = {
    getEstampas,
    crearEstampa,
    obtenerImagenes
};
