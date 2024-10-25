const CamisetasDAO = require('../daos/CamisetasDAO');

const camisetasDAO = new CamisetasDAO();

const getCamisetas = async (req, res) => {
    try {
        const camisetas = await camisetasDAO.getAllCamisetas();
        res.status(200).json(camisetas);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearCamisetas = async (req, res) => {
    try {
        const {  modelo_id, estampa_id, talla, precio} = req.body;
        
        const camiseta = {  modelo_id, estampa_id, talla, precio};

        const idcamisetas = await camisetasDAO.createCamiseta(camiseta);

        res.status(201).json({idcamisetas });
    } catch (error) {
        console.error('Error en crearcamisetas:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getCamisetas,
    crearCamisetas
};
