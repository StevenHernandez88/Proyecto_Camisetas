const db = require('../utils/Conexion');

class CamisetaDAO {
    async getAllCamisetas() {
        try {
            console.log('Obteniendo todas las camisetas');
            const response = await db.query('SELECT * FROM camisetas');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener camisetas:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createCamiseta(camiseta) {
        try {
            console.log('Creando camiseta con los siguientes datos:', camiseta);
            const query = `
                INSERT INTO camisetas ( modelo_id, estampa_id, talla, precio)
                VALUES ($1, $2, $3, $4) RETURNING idcamisetas
            `;
            const values = [
                camiseta.modelo_id,
                camiseta.estampa_id,
                camiseta.talla,
                camiseta.precio
            ];
            const result = await db.query(query, values);
            const idcamisetas = result.rows[0].idcamisetas; 
            //console.log('Pedido creado en la base de datos con ID:', idcamisetas);
            return idcamisetas; 
        } catch (error) {
            console.error('Error al crear camiseta:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }
}

module.exports = CamisetaDAO;
