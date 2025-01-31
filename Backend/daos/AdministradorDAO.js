const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class AdministradorDAO extends UsuarioDAO {

    async getAllAdministrador() {
        try {
            console.log('Obteniendo todos los Administrador');
            const response = await db.query('SELECT * FROM administrador');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener Administrador:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }


    async getVentasStats() {
        try {
            const query = `
                WITH ventas_por_modelo AS (
                    SELECT 
                        m.idmodelo,
                        m.descripcion as modelo,
                        COUNT(DISTINCT dp.iddetalles_pedidos) as ventas,
                        AVG(r.rating) as rating_promedio,
                        MODE() WITHIN GROUP (ORDER BY dp.precio_unitario) * COUNT(DISTINCT dp.iddetalles_pedidos) as ingresos,
                        MODE() WITHIN GROUP (ORDER BY dp.precio_unitario) * COUNT(DISTINCT dp.iddetalles_pedidos) * 0.3 as utilidad
                    FROM modelo m
                    LEFT JOIN camisetas c ON m.idmodelo = c.modelo_id
                    LEFT JOIN detallesPedidos dp ON c.idcamisetas = ANY(dp.camisetas)
                    LEFT JOIN ratings r ON m.idmodelo = r.modelo_id
                    WHERE dp.precio_unitario IS NOT NULL
                    GROUP BY m.idmodelo, m.descripcion
                )
                SELECT * FROM ventas_por_modelo
                WHERE ventas > 0
                ORDER BY ventas DESC
            `;
            const response = await db.query(query);
            return response.rows;
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            throw new Error('Error interno del servidor');
        }
    }
    
}

module.exports = AdministradorDAO;
