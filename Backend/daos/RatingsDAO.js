const db = require('../utils/Conexion');

class RatingsDAO {
    async getAllRatings() {
        try {
            console.log('Obteniendo todos los ratings');
            const response = await db.query('SELECT * FROM ratings');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener ratingss:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createRatings(ratings) {
        try {
            const query = `
                INSERT INTO ratings (usuario_id, modelo_id, rating, comentario) VALUES ($1, $2, $3, $4)
            `;
            const values = [
                ratings.usuario_id,
                ratings.modelo_id,
                ratings.rating,
                ratings.comentario
            ];
            await db.query(query, values);
            console.log('ratings creada en la base de datos');
        } catch (error) {
            console.error('Error al crear ratings:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async getAverageRatingByModelId(modelo_id) {
        try {
            const query = `
                SELECT AVG(rating) as rating
                FROM ratings
                WHERE modelo_id = $1
            `;
            const response = await db.query(query, [modelo_id]);

            // Retorna el promedio de ratings o null si no hay ratings
            return response.rows[0].rating || 0;
        } catch (error) {
            console.error('Error al obtener el promedio de ratings:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async obtenerComentariosPorModelo(idmodelo) {
        try {
            const query = `
                SELECT r.rating, r.comentario, r.fecha_rating, u.nombre
                FROM ratings r
                JOIN usuarios u ON r.cliente_id = u.idusuario
                WHERE r.modelo_id = $1
                ORDER BY r.fecha_rating DESC
            `;
            //console.log('Ejecutando query:', query);
            //console.log('Con idmodelo:', idmodelo);
            
            const values = [idmodelo];
            const result = await db.query(query, values);
            
            //console.log('Resultados de la query:', result.rows);
            
            return result.rows;
        } catch (error) {
            console.error('Error al obtener los comentarios:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }
}

module.exports = RatingsDAO;
