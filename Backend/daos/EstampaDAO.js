const { Storage } = require('@google-cloud/storage');
const path = require('path');
const db = require('../utils/Conexion');
const config = require('../utils/Config');

// Configuración de Google Cloud Storage
const storage = new Storage({ keyFilename: path.join(__dirname, '../storage.json') });
const bucketName = config.BUCKET;
const bucket = storage.bucket(bucketName);

class EstampaDAO {
    async getAllEstampasActivas() {
        try {
            //console.log('Obteniendo todas las estampas');
            const response = await db.query('Select es.*, ca.descripcion from estampas es, categoria ca where es.categoria_id = ca.idcategoria and es.activo = true');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener estampas:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async createEstampa(estampa) {
        try {
            const query = `
                INSERT INTO estampas (nombre, descripcion, artista_id, url_imagen, categoria_id, activo) VALUES ($1, $2, $3, $4, $5, $6)
            `;
            const values = [
                estampa.nombre,
                estampa.descripcion,
                estampa.artista_id,
                estampa.url_imagen,
                estampa.categoria_id,
                estampa.activo
            ];
            await db.query(query, values);
            console.log('Estampa creada en la base de datos');
        } catch (error) {
            console.error('Error al crear estampa:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async obtenerImagenes() {
        try {
            console.log('Obteniendo imágenes del bucket');
            const [files] = await bucket.getFiles({ prefix: 'estampas/' });

            // Filtra solo archivos válidos (no carpetas)
            const urls = files
                .filter(file => file.name !== 'estampas/') // Excluir el directorio en sí
                .map(file => `https://storage.googleapis.com/${bucketName}/${file.name}`);
            
             // Consulta a la base de datos para obtener los modelos con esas URLs
             const query = `
             SELECT * FROM estampas WHERE url_imagen = ANY($1::text[])
         `;
         const response = await db.query(query, [urls]);
         
         // Mapear las estampas con su respectiva URL
         const estampas = response.rows.map(estampa => {
             return {
                 idestampas: estampa.idestampas,
                 nombre: estampa.nombre,
                 descripcion: estampa.descripcion,
                 artista_id: estampa.artista_id,
                 url_imagen: estampa.url_imagen
             };
         });
 
         return estampas;
        } catch (error) {
            console.error('Error al obtener imágenes del bucket:', error.message);
            throw new Error('Error interno del servidor');
        }
    }









    async getAllEstampas() {
        try {
            const response = await db.query('SELECT * FROM estampas');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener estampas con estado:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

    async toggleStampStatus(idestampas, activo) {
        try {
            const query = 'UPDATE estampas SET activo = $1 WHERE idestampas = $2 RETURNING *';
            const response = await db.query(query, [activo, idestampas]);
            
            if (response.rowCount === 0) {
                throw new Error('Estampa no encontrado');
            }
            
            return response.rows[0];
        } catch (error) {
            console.error('Error al actualizar estado del modelo:', error.message);
            throw error;
        }
    }


}

module.exports = EstampaDAO;
