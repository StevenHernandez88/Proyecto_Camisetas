const db = require('../utils/Conexion');

class DetallesPedidosDAO {
    async getAllDetallesPedidos() {
        try {
            console.log('Obteniendo todos los detallespedidos');
            const response = await db.query('SELECT * FROM detallespedidos');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener detallesPedidos:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createDetallesPedidos(detallesPedidos) {
        try {
            console.log('Creando detallesPedidos con los siguientes datos:', detallesPedidos);
            const query = `
                INSERT INTO detallespedidos (pedido_id, camisetas, cantidad, precio_unitario)
                VALUES ($1, $2, $3, $4)
            `;
            const values = [
                detallesPedidos.pedido_id,
                detallesPedidos.camisetas,
                detallesPedidos.cantidad,
                detallesPedidos.precio_unitario
            ];
            await db.query(query, values);
            console.log('detallesPedido creado en la base de datos');
        } catch (error) {
            console.error('Error al crear detallesPedidos:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }
}

module.exports = DetallesPedidosDAO;
