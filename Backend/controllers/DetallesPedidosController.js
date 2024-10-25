const DetallesPedidosDAO = require('../daos/DetallesPedidosDAO');
const enviarCorreoPago = require('../utils/nodemailer').enviarCorreoPago;

const detallesPedidosDAO = new DetallesPedidosDAO();

const getDetallesPedidos = async (req, res) => {
    try {
        const detallesPedidos = await detallesPedidosDAO.getAllDetallesPedidos();
        res.status(200).json(detallesPedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearDetallesPedidos = async (req, res) => {
    try {
        console.log('Datos recibidos en el body:', req.body);
        
        const { pedido_id, camisetas, cantidad, precio_unitario, email, pdf } = req.body;

        const pedido = { pedido_id, camisetas, cantidad, precio_unitario};

        await detallesPedidosDAO.createDetallesPedidos(pedido);

        enviarCorreoPago(email, pdf);

        res.status(201).json({ message: 'DetallesPedidos creado exitosamente' });
    } catch (error) {
        console.error('Error en DetallesPedidos:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getDetallesPedidos,
    crearDetallesPedidos
};
