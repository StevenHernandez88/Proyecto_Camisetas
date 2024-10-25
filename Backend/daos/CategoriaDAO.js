const db = require('../utils/Conexion');

class CategoriaDAO {

    async getAllCategorias() {
        try {
            console.log('Obteniendo todas los categorias');
            const response = await db.query('SELECT * FROM categoria');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener categorias:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createCategoria(categoria) {
        try {
            console.log('Creando categoria con los siguientes datos:', categoria);
            const query = `
                INSERT INTO categoria (descripcion)
                VALUES ($1) RETURNING idcategorias
            `;
            const values = [
                categoria.descripcion
            ];
            const result = await db.query(query, values);
            const idcategorias = result.rows[0].idcategorias; 
            return idcategorias; 
        } catch (error) {
            console.error('Error al crear categoria:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }
}

module.exports = CategoriaDAO;