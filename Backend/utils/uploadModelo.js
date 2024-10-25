const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Configuración de Google Cloud Storage
const storage = new Storage({ keyFilename: path.join(__dirname, '../storage.json') });
const bucketName = 'camisetaspersonalizadas'; // Nombre del bucket
const bucket = storage.bucket(bucketName);

async function uploadModelo(file) {
    if (!file) {
        throw new Error('No se ha proporcionado ningún archivo');
    }

    // Generar un nombre de archivo único para evitar colisiones
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, '_'); 
    const filename = `modelos-camisetas/${timestamp}_${originalName}`;

    const blob = bucket.file(filename);

    const blobStream = blob.createWriteStream({
        resumable: false,
        gzip: true,
        contentType: file.mimetype,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', err => {
            console.error('Error al subir archivo:', err);
            reject(err);
        });

        blobStream.on('finish', async () => {
            try {
                // Generar la URL pública del archivo
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
                console.log('Archivo subido exitosamente:', publicUrl);
                resolve(publicUrl);
            } catch (error) {
                console.error('Error al generar la URL pública del archivo:', error);
                reject(error);
            }
        });

        blobStream.end(file.buffer);
    });
}

module.exports = uploadModelo;
