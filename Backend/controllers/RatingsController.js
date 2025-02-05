const RatingsDAO = require('../daos/RatingsDAO');

const ratingsDAO = new RatingsDAO();

const getRatings = async (req, res) => {
    try {
        const ratings = await ratingsDAO.getAllRatings();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearRatings = async (req, res) => {
    try {

        //console.log(req.body);

        const { usuario_id, modelo_id, rating, comentario} = req.body;

        const ratings = {usuario_id, modelo_id, rating, comentario};

        // Guardar ratings en la base de datos
        await ratingsDAO.createRatings(ratings);

        res.status(201).json({ message: 'ratings creada exitosamente' });
    } catch (error) {
        console.error('Error en crearRatings:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getComentariosPorModelo = async (req, res) => {
    try {
        const { idmodelo } = req.body;
        //console.log('Obteniendo comentarios para el modelo:', idmodelo);
        
        const comentarios = await ratingsDAO.obtenerComentariosPorModelo(idmodelo);
        
        //console.log('Comentarios obtenidos:', comentarios);

        // Retornar los comentarios obtenidos
        res.status(200).json(comentarios);
    } catch (error) {
        console.error('Error en getComentariosPorModelo:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getRatings,
    crearRatings,
    getComentariosPorModelo
};
