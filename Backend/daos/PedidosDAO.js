const db = require('../utils/Conexion');

class PedidoDAO {
    async getAllPedidos() {
        try {
            console.log('Obteniendo todos los pedidos');
            const response = await db.query('SELECT * FROM pedidos');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener pedidos:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createPedido(pedido) {
        try {
            console.log('Creando pedido con los siguientes datos:', pedido);
            const query = `
                INSERT INTO pedidos (cliente_id, total, estado_id)
                VALUES ($1, $2, $3) RETURNING idpedidos
            `;
            const values = [
                pedido.cliente_id,
                pedido.total,
                pedido.estado_id
            ];

            const result = await db.query(query, values);
            const idpedidos = result.rows[0].idpedidos; 
            return idpedidos; 
        } catch (error) {
            console.error('Error al crear pedido:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }
}

module.exports = PedidoDAO;
