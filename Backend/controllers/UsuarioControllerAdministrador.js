const AdministradorDAO = require('../daos/AdministradorDAO');


const administradorDAO = new AdministradorDAO();


const getAdministrador = async (req, res) => {
    try {
        const administrador = await administradorDAO.getAllAdministrador();
        res.status(200).json(administrador);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getVentasStats = async (req, res) => {
    try {
        const stats = await administradorDAO.getVentasStats();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAdministrador,
    getVentasStats
};
