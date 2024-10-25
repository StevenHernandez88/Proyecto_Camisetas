const { Storage } = require('@google-cloud/storage');
const path = require('path');
const db = require('../utils/Conexion');
const config = require('../utils/Config');

// Configuración de Google Cloud Storage
const storage = new Storage({ keyFilename: path.join(__dirname, '../storage.json') });
const bucketName = config.BUCKET;
const bucket = storage.bucket(bucketName);

class ModeloDAO {

    async getAllModelos() {
        try {
            console.log('Obteniendo todas las modelo');
            const response = await db.query('SELECT * FROM modelo');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener modelos:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createModelo(modelo) {
        try {
            const query = `
                INSERT INTO modelo ( descripcion, material, rating_id, url_modelo, stock) VALUES ($1, $2, $3, $4, $5)
            `;
            const values = [
                modelo.descripcion,
                modelo.material,
                modelo.rating_id,
                modelo.url_modelo,
                modelo.stock
            ];
            await db.query(query, values);
            console.log('modelo creado en la base de datos');
        } catch (error) {
            console.error('Error al crear modelo:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async obtenerModelos() {
        try {
            const [files] = await bucket.getFiles({ prefix: 'modelos-camisetas/' });
    
            const urls = files
                .filter(file => file.name !== 'modelos-camisetas/')
                .map(file => `https://storage.googleapis.com/${bucketName}/${file.name}`);
    
            const query = `
                SELECT m.*, COALESCE(AVG(r.rating), 0) AS rating
                FROM modelo m
                LEFT JOIN ratings r ON m.idmodelo = r.modelo_id
                WHERE m.url_modelo = ANY($1::text[])
                GROUP BY m.idmodelo
            `;
    
            const response = await db.query(query, [urls]);
    
            const modelos = response.rows.map(modelo => {
                return {
                    idmodelo: modelo.idmodelo,
                    descripcion: modelo.descripcion,
                    material: modelo.material,
                    url_modelo: modelo.url_modelo,
                    rating: modelo.rating
                };
            });
    
            return modelos;
        } catch (error) {
            console.error('Error al obtener modelos con ratings:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async actualizarStockModelo(cantidad, idmodelo ) {
        try {
            const query = `UPDATE modelo SET stock = stock - $1 WHERE idmodelo = $2 RETURNING stock`;
            const values = [cantidad, idmodelo];
            const result = await db.query(query, values);
    
            // Verificar si el stock fue actualizado
            if (result.rowCount === 0) {
                throw new Error("No se pudo actualizar el stock, puede que el modelo no tenga stock disponible.");
            }
    
            return result.rows[0].stock;
        } catch (error) {
            console.error("Error al actualizar stock", error);
            throw new Error("Error interno del servidor");
        }
    }

    async getStockPorIdmodelo(idmodelo) {
        try {
            const query = `SELECT stock FROM modelo WHERE idmodelo = $1`;
            const result = await db.query(query, [idmodelo]);
    
            if (result.rows.length === 0) {
                throw new Error("Modelo no encontrado");
            }
    
            return result.rows[0].stock;
        } catch (error) {
            console.error("Error al obtener stock", error);
            throw new Error("Error interno del servidor");
        }
    }

}

module.exports = ModeloDAO;