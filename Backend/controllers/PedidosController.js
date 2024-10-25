const PedidosDAO = require('../daos/PedidosDAO');

const pedidosDAO = new PedidosDAO();

const getPedidos = async (req, res) => {
    try {
        const pedidos = await pedidosDAO.getAllPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const crearPedido = async (req, res) => {
    try {
        const {cliente_id, total, estado_id} = req.body;
        
        const pedido = { cliente_id, total, estado_id};

        const idpedidos = await pedidosDAO.createPedido(pedido); // Esperar el ID del nuevo pedido

        res.status(200).json({ idpedidos }); // Devolver el ID del pedido creado
        console.log('ID del pedido devuelto:', idpedidos); // Imprimir el ID del pedido
    } catch (error) {
        console.error('Error en crearPedido:', error.message, error.stack);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    getPedidos,
    crearPedido
};
