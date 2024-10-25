const UsuarioDAO = require("./UsuarioDAO");
const db = require("../utils/Conexion");

class ArtistaDAO extends UsuarioDAO {

	async getAllArtista() {
        try {
            console.log('Obteniendo todos los artistas');
            const response = await db.query('SELECT * FROM artista');
            return response.rows;
        } catch (error) {
            console.error('Error al obtener Artista:', error.message, error.stack);
            throw new Error('Error interno del servidor');
        }
    }

	async createArtista(artista) {
		await this.createUsuario(artista);
		try {
			const query = `
                INSERT INTO artista (idartista, biografia)
                VALUES ($1, $2)
            `;
			const values = [artista.idusuario, artista.biografia];
			await db.query(query, values);
		} catch (error) {
			console.error("Error al crear artista:", error);
			throw new Error("Error interno del servidor");
		}
	}

	async getInformacion(idusuario) {
		try {
		  console.log("Obteniendo artista y estampas");
		  const response = await db.query(
			`Select u.idusuario, u.nombre, u.email, u.contraseña, u.fecha_creacion, 
			  ar.biografia, r.funcion, es.nombre AS nombreestampa, es.descripcion AS descripcionestampa, es.url_imagen, 
			  cat.descripcion AS descripcioncategoria
			  from usuarios u
			  join artista ar on u.idusuario = ar.idartista
			  join rol r on u.rol_id = r.idrol
			  left join estampas es on ar.idartista = es.artista_id
			  left join categoria cat on es.categoria_id = cat.idcategoria
			  where u.idusuario = $1`,
			[idusuario]
		  );
	  
		  if (response.rows.length === 0) {
			console.log('Usuario no encontrado');
			return null;
		  }
	  
		  // Agrupar las estampas del artista
		  const artistaInfo = {
			idusuario: response.rows[0].idusuario,
			nombre: response.rows[0].nombre,
			email: response.rows[0].email,
			biografia: response.rows[0].biografia,
			estampas: response.rows.map(row => ({
			  nombreestampa: row.nombreestampa,
			  descripcionestampa: row.descripcionestampa,
			  url_imagen: row.url_imagen,
			  descripcioncategoria: row.descripcioncategoria
			}))
		  };
	  
		  return artistaInfo;
		} catch (error) {
		  console.error("Error al obtener Artista:", error.message, error.stack);
		  throw new Error("Error interno del servidor");
		}
	  }
	  

}

module.exports = ArtistaDAO;
